import { computed, effect, Injectable, Injector, signal } from '@angular/core';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartDocument {
  items: CartItem[];
  expiryTime: number; 
}

declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems = signal<CartItem[]>([]);
  public expiryTime = signal<number>(0);

  public cartTotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  public cartCount = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  private db!: any;
  private userId: string | null = null;
  private app_id: string = '';
  private initialized = false;

  private storageKey = 'miClosetCart';

  constructor(private injector: Injector) {
    this.app_id = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    this.cartItems.set(this.loadFromLocal());
    this.expiryTime.set(this.loadExpiryFromLocal());

    effect(() => {
      if (this.initialized) {
        this.saveCartToFirestore();
      }
      this.saveToLocal();
    }, { injector: this.injector });
  }

  private loadFromLocal(): CartItem[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  private loadExpiryFromLocal(): number {
    const saved = localStorage.getItem(this.storageKey + '_expiry');
    return saved ? parseInt(saved, 10) : 0;
  }

  private saveToLocal() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems()));
    localStorage.setItem(this.storageKey + '_expiry', this.expiryTime().toString());
  }

  public setAuthInfo(dbInstance: any, uid: string): void {
    if (this.initialized) return;
    this.db = dbInstance;
    this.userId = uid;
    this.initialized = true;
    this.startCartListener();
  }

  private startCartListener(): void {
    if (!this.userId) return;

    const docRef = doc(this.db, `artifacts/${this.app_id}/users/${this.userId}/cart/current`);

    onSnapshot(docRef, (docSnap: any) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as CartDocument;
        this.cartItems.set(data.items || []);
        this.expiryTime.set(data.expiryTime || 0);
        this.checkAndClearExpiredCart();
      } else {
        const initialData: CartDocument = { items: [], expiryTime: 0 };
        setDoc(docRef, initialData).catch(err =>
          console.error("Error al crear doc de carrito:", err)
        );
      }
    }, (error: any) => {
      console.error("Error escuchando el carrito:", error);
    });
  }

  private async saveCartToFirestore(): Promise<void> {
    if (!this.initialized || !this.userId) return;
    const cartData: CartDocument = {
      items: this.cartItems(),
      expiryTime: this.expiryTime(),
    };
    try {
      const docRef = doc(this.db, `artifacts/${this.app_id}/users/${this.userId}/cart/current`);
      await setDoc(docRef, cartData);
    } catch (error) {
      console.error("Error guardando el carrito en Firestore:", error);
    }
  }

  // 🔹 Genera un ID único simple por producto (sin color ni talle)
  private generateUniqueItemId(item: { productId: number }): string {
    return `item-${item.productId}`;
  }

  public checkAndClearExpiredCart(): void { 
    if (this.expiryTime() !== 0 && this.expiryTime() < Date.now()) {
      this.cartItems.set([]);
      this.expiryTime.set(0);
      this.saveCartToFirestore();
      console.log("Reserva expirada y carrito limpiado.");
    }
  }

  // 🔹 Añadir al carrito
  addToCart(newItem: Omit<CartItem, 'id' | 'quantity'> & { productId: number }): void {
    const itemId = this.generateUniqueItemId(newItem);

    this.cartItems.update(currentItems => {
      const existingItem = currentItems.find(item => item.id === itemId);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const itemToAdd: CartItem = {
          ...newItem as CartItem,
          id: itemId,
          quantity: 1
        };

        if (this.expiryTime() === 0 || this.expiryTime() < Date.now()) {
          const sevenDays = 7 * 24 * 60 * 60 * 1000;
          this.expiryTime.set(Date.now() + sevenDays);
        }
        
        return [...currentItems, itemToAdd];
      }
    });
  }

  // 🔹 Eliminar un producto del carrito
  removeFromCart(itemId: string): void {
    this.cartItems.update(currentItems => {
      const existingItem = currentItems.find(item => item.id === itemId);
      if (!existingItem) return currentItems;

      if (existingItem.quantity > 1) {
        return currentItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        const updatedItems = currentItems.filter(item => item.id !== itemId);
        if (updatedItems.length === 0) {
          this.clearExpiry();
        }
        return updatedItems;
      }
    });
  }

  // 🔹 Limpiar el carrito completo
  clearCart(): void {
    this.cartItems.set([]);
    this.clearExpiry();
  }

  private clearExpiry(): void {
    this.expiryTime.set(0);
  }
}
