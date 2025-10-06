
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  isApparel: boolean;
  image: string;
  stock: number;
}


export const PRODUCT_DATA: Product[] = [
  {
    id: 1,
    name: 'Camiseta Básica Oversize',
    price: 29.99,
    description: 'Algodón orgánico, estilo moderno y cómodo.',
    category: 'Ropa',
    isApparel: true,
    stock: 50,
    image: 'assets/productos/camiseta-blanca.webp',
  },
  {
    id: 2,
    name: 'Jeans de Corte Recto',
    price: 69.5,
    description: 'Denim rígido, tiro alto, ajuste perfecto.',
    category: 'Ropa',
    isApparel: true,
    stock: 10,
    image: 'assets/productos/jean-recto.webp',
  },
  {
    id: 3,
    name: 'Vestido Midi Floral',
    price: 85.0,
    description: 'Tejido fluido con estampado primaveral.',
    category: 'Ropa',
    isApparel: true,
    stock: 12,
    image: 'assets/productos/vestido-floral.webp',
  },
  {
    id: 4,
    name: 'Saco de Lana Oversize',
    price: 120.0,
    description: 'Muy cálido y suave, ideal para invierno.',
    category: 'Ropa',
    isApparel: true,
    stock: 5,
    image: 'assets/productos/saco-lana.webp',
  },

  {
    id: 5,
    name: 'Collar con Dije Vintage',
    price: 45.0,
    description: 'Plata 925, diseño exclusivo.',
    category: 'Joyeria',
    isApparel: false,
    stock: 25,
    image: 'assets/productos/collar-vintage.webp',
  },
  {
    id: 6,
    name: 'Bufanda de Cashmere',
    price: 35.0,
    description: 'Tejido premium, extra suave y largo.',
    category: 'Temporada',
    isApparel: false,
    stock: 10,
    image: 'assets/productos/bufanda.webp',
  },
  {
    id: 7,
    name: 'Anillo de Plata',
    price: 55.0,
    description: 'Anillo de plata 925 con diseño minimalista.',
    category: 'Joyeria',
    isApparel: false,
    stock: 0,
    image: 'assets/productos/anillo-plata.webp',
  },

  {
    id: 8,
    name: 'Sweater rosa-dior',
    price: 150.0,
    description: 'Sweater de lana suave en color rosa dior estilo oversize.',
    category: 'Temporada',
    isApparel: true,
    stock: 3,
    image: 'assets/productos/sweater-rosa.webp',
  },
  {
    id: 9,
    name: 'Vestido tejido al cuerpo',
    price: 75.0,
    description: 'Vestido corto tejido al cuerpo en color melocotón.',
    category: 'Temporada',
    isApparel: true,
    stock: 15,
    image: 'assets/productos/vestido-tejido.webp',
  },
  {
    id: 10,
    name: 'Reloj dorado',
    price: 40.0,
    description: 'Hermoso reloj de coleccion bañado en oro.',
    category: 'Joyeria',
    isApparel: true,
    stock: 0,
    image: 'assets/productos/reloj.webp',
  },

  {
    id: 11,
    name: 'Almohadón Geométrico',
    price: 22.0,
    description: 'Funda de algodón con patrones modernos.',
    category: 'Hogar',
    isApparel: false,
    stock: 40,
    image: 'assets/productos/almohadon-geometrico.webp',
  },
  {
    id: 12,
    name: 'Manta de Piel Sintética',
    price: 65.0,
    description: 'Ideal para el sofá, ultra suave.',
    category: 'Hogar',
    isApparel: false,
    stock: 18,
    image: 'assets/productos/manta.webp',
  },
  {
    id: 13,
    name: 'Almohadón de Lino',
    price: 30.0,
    description: 'Estilo rústico, lino natural, cuadrado.',

    category: 'Hogar',
    isApparel: false,
    stock: 9,
    image: 'assets/productos/almohadon-lino.webp',
  },
  {
    id: 14,
    name: 'Vela Aromática Grande',
    price: 28.0,
    description: 'Aroma a sándalo y vainilla.',

    category: 'Hogar',
    isApparel: false,
    stock: 10,
    image: 'assets/productos/vela-aromatica.webp',
  },
  {
    id: 15,
    name: 'Taza de Cerámica Artesanal',
    price: 15.0,
    description: 'Acabado mate, ideal para café o té.',

    category: 'Hogar',
    isApparel: false,
    stock: 35,
    image: 'assets/productos/taza-ceramica.webp',
  },
  {
    id: 16,
    name: 'Zapatillas Urbanas',
    price: 95.0,
    description: 'Diseño moderno, cómodas para uso diario.',
    category: 'Calzado',
    isApparel: true,
    stock: 20,
    image: 'assets/productos/zapatillas-urbanas.webp',
  },
  {
    id: 17,
    name: 'Botas de Cuero',
    price: 120.0,
    description: 'Clásicas, resistentes y elegantes.',

    category: 'Calzado',
    isApparel: true,
    stock: 12,
    image: 'assets/productos/botas-cuero.webp',
  },

  {
    id: 18,
    name: 'Pack 2x1 Camisetas',
    price: 40.0,
    description: 'Oferta especial en camisetas básicas.',

    category: 'Temporada',
    isApparel: true,
    stock: 30,
    image: 'assets/productos/pack-camisetas.webp',
  },
  {
    id: 19,
    name: 'Descuento Bufanda + Guantes',
    price: 50.0,
    description: 'Conjunto ideal para invierno a precio promocional.',

    category: 'Temporada',
    isApparel: false,
    stock: 10,
    image: 'assets/productos/bufanda-guantes.webp',
  },
];
