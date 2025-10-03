// --- 1. INTERFACES (Aseguramos el 'export' para que el componente las vea) ---

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    colors: string[];
    sizes: string[];
    category: string;
    isApparel: boolean; // TRUE para ropa, FALSE para accesorios
    image: string; // URL de imagen simulada
    stock: number; // Nuevo campo para el inventario
}

export interface SelectedOptions {
    [productId: number]: {
        size: string;
        color: string;
    };
}

// --- 2. DATOS SIMULADOS (Catálogo Extendido con Stock) ---

export const PRODUCT_DATA: Product[] = [
    // ROPA (Tops y Pantalones)
    {
        id: 1,
        name: 'Camiseta Básica Oversize',
        price: 29.99,
        description: 'Algodón orgánico, estilo moderno y cómodo.',
        colors: ['Negro', 'Blanco', 'Gris'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Ropa',
        isApparel: true,
        stock: 50,
        image: 'assets/productos/camiseta-blanca.webp'
    },
    {
        id: 2,
        name: 'Jeans de Corte Recto',
        price: 69.50,
        description: 'Denim rígido, tiro alto, ajuste perfecto.',
        colors: ['Azul Claro', 'Azul Oscuro'],
        sizes: ['28', '30', '32', '34', '36'],
        category: 'Ropa',
        isApparel: true,
        stock: 10, 
        image: 'assets/productos/jean-recto.webp' // Azul Pálido
    },
    {
        id: 3,
        name: 'Vestido Midi Floral',
        price: 85.00,
        description: 'Tejido fluido con estampado primaveral.',
        colors: ['Blanco', 'Rojo', 'Verde'],
        sizes: ['XS', 'S', 'M', 'L'],
        category: 'Ropa',
        isApparel: true,
        stock: 12,
        image: 'assets/productos/vestido-floral.webp' // Naranja Suave
    },
    {
        id: 4,
        name: 'Saco de Lana Oversize',
        price: 120.00,
        description: 'Muy cálido y suave, ideal para invierno.',
        colors: ['Negro', 'Gris', 'Marrón'],
        sizes: ['S/M', 'L/XL'],
        category: 'Ropa',
        isApparel: true,
        stock: 5,
        image: 'assets/productos/saco-lana.webp' // Gris Claro
    },

    // ACCESORIOS
    {
        id: 5,
        name: 'Bolso Cruzado Vintage',
        price: 45.00,
        description: 'Piel sintética, correa ajustable.',
        colors: ['Marrón', 'Negro', 'Rojo'],
        sizes: [], // Tallas vacías para accesorios
        category: 'Accesorios',
        isApparel: false,
        stock: 25,
        image: 'assets/productos/bolso-vintage.webp' // Borgoña
    },
    {
        id: 6,
        name: 'Bufanda de Cashmere',
        price: 35.00,
        description: 'Tejido premium, extra suave y largo.',
        colors: ['Rojo', 'Gris', 'Verde'],
        sizes: [],
        category: 'Accesorios',
        isApparel: false,
        stock: 10, // Agotado
        image: 'assets/productos/bufanda.webp' // Azul verdoso
    },
    {
        id: 7,
        name: 'Sombrero de Fieltro',
        price: 55.00,
        description: 'Estilo Fedora, ala ancha y elegante.',
        colors: ['Gris', 'Marrón'],
        sizes: [],
        category: 'Accesorios',
        isApparel: false,
        stock: 0, // Agotado
        image: 'assets/productos/sombrero.webp' // Beige
    },

    // DISFRACES
    {
        id: 8,
        name: 'Disfraz de Astronauta',
        price: 150.00,
        description: 'Traje espacial con parches y casco simulado.',
        colors: ['Blanco'],
        sizes: ['S', 'M', 'L'],
        category: 'Disfraces',
        isApparel: true,
        stock: 3,
        image: 'assets/productos/disfraz-astronauta.webp' // Azul Brillante
    },
    {
        id: 9,
        name: 'Vestido de Hada',
        price: 75.00,
        description: 'Tull, alas incluidas y varita mágica.',
        colors: ['Rosado', 'Verde'],
        sizes: ['Única'],
        category: 'Disfraces',
        isApparel: true,
        stock: 15,
        image: 'assets/productos/vestido-hada.webp' // Melocotón
    },
    {
        id: 10,
        name: 'Capa de Vampiro',
        price: 40.00,
        description: 'Terciopelo negro con cuello rojo rígido.',
        colors: ['Negro', 'Rojo'],
        sizes: ['Única'],
        category: 'Disfraces',
        isApparel: true,
        stock: 0,
        image: 'assets/productos/capa-vampiro.webp' // Negro/Rojo
    },

    // HOGAR (Almohadones)
    {
        id: 11,
        name: 'Almohadón Geométrico',
        price: 22.00,
        description: 'Funda de algodón con patrones modernos.',
        colors: ['Gris', 'Amarillo'],
        sizes: [],
        category: 'Hogar',
        isApparel: false,
        stock: 40,
        image: 'assets/productos/almohadon-geometrico.webp' // Gris Medio
    },
    {
        id: 12,
        name: 'Manta de Piel Sintética',
        price: 65.00,
        description: 'Ideal para el sofá, ultra suave.',
        colors: ['Blanco', 'Marrón'],
        sizes: [],
        category: 'Hogar',
        isApparel: false,
        stock: 18,
        image: 'assets/productos/manta.webp' // Blanco roto
    },
    {
        id: 13,
        name: 'Almohadón de Lino',
        price: 30.00,
        description: 'Estilo rústico, lino natural, cuadrado.',
        colors: ['Beige', 'Gris'],
        sizes: [],
        category: 'Hogar',
        isApparel: false,
        stock: 9,
        image: 'assets/productos/almohadon-lino.webp' // Beige Claro
    },
    {
        id: 14,
        name: 'Vela Aromática Grande',
        price: 28.00,
        description: 'Aroma a sándalo y vainilla.',
        colors: ['Blanco'],
        sizes: [],
        category: 'Hogar',
        isApparel: false,
        stock: 10, 
        image: 'assets/productos/vela-aromatica.webp' // Ciruela
    },
    {
        id: 15,
        name: 'Taza de Cerámica Artesanal',
        price: 15.00,
        description: 'Acabado mate, ideal para café o té.',
        colors: ['Azul Oscuro', 'Gris'],
        sizes: [],
        category: 'Hogar',
        isApparel: false,
        stock: 35,
        image: 'assets/productos/taza-ceramica.webp' // Azul Acero
    },
    // CALZADO
{
    id: 16,
    name: 'Zapatillas Urbanas',
    price: 95.00,
    description: 'Diseño moderno, cómodas para uso diario.',
    colors: ['Blanco', 'Negro'],
    sizes: ['38', '39', '40', '41', '42'],
    category: 'Calzado',
    isApparel: true,
    stock: 20,
    image: 'assets/productos/zapatillas-urbanas.webp'
},
{
    id: 17,
    name: 'Botas de Cuero',
    price: 120.00,
    description: 'Clásicas, resistentes y elegantes.',
    colors: ['Marrón', 'Negro'],
    sizes: ['37', '38', '39', '40'],
    category: 'Calzado',
    isApparel: true,
    stock: 12,
    image: 'assets/productos/botas-cuero.webp'
},

// PROMOS
{
    id: 18,
    name: 'Pack 2x1 Camisetas',
    price: 40.00,
    description: 'Oferta especial en camisetas básicas.',
    colors: ['Blanco', 'Negro'],
    sizes: ['S', 'M', 'L'],
    category: 'Promos',
    isApparel: true,
    stock: 30,
    image: 'assets/productos/pack-camisetas.webp'
},
{
    id: 19,
    name: 'Descuento Bufanda + Guantes',
    price: 50.00,
    description: 'Conjunto ideal para invierno a precio promocional.',
    colors: ['Gris', 'Negro'],
    sizes: [],
    category: 'Promos',
    isApparel: false,
    stock: 10,
    image: 'assets/productos/bufanda-guantes.webp'
}

];