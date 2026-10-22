// src/data/mockData.js

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Zelda: Tears of the Kingdom",
    price: 59990,
    category: "Videojuegos",
    offer: true,
    image: "/products/zelda.jpg"
  },
  {
    id: 2,
    name: "PlayStation 5 Console",
    price: 549990,
    category: "Consolas",
    offer: false,
    image: "/products/ps5.jpg"
  },
  {
    id: 3,
    name: "Xbox Series X",
    price: 499990,
    category: "Consolas",
    offer: true,
    image: "/products/xbox.jpg"
  },
  {
    id: 4,
    name: "Super Mario Odyssey",
    price: 49990,
    category: "Videojuegos",
    offer: false,
    image: "/products/mario.jpg"
  },
  {
    id: 5,
    name: "Audífonos Gamer Wireless",
    price: 29990,
    category: "Accesorios",
    offer: true,
    image: "/products/headset.jpg"
  }
];

// Actualiza nombres genéricos de versiones anteriores sin borrar productos editados.
export const categoryName = (name) => ({ 'Categoría 1': 'Videojuegos', 'Categoría 2': 'Consolas', 'Categoría 3': 'Accesorios' }[name] || name);

export const getProducts = () => {
    try {
        const stored = JSON.parse(localStorage.getItem('products'));
        if (Array.isArray(stored) && stored.every((p) => p && p.id != null &&
            typeof p.name === 'string' && Number.isFinite(p.price) && p.price > 0)) {
            const updated = stored.map((product) => {
                const original = INITIAL_PRODUCTS.find((p) => p.name === product.name);
                const needsImage = !product.image || product.image === '/product-placeholder.svg' || product.image.includes('via.placeholder.com');
                return { ...product, category: categoryName(product.category),
                    ...(original && needsImage ? { image: original.image } : {}) };
            });
            return JSON.stringify(updated) === JSON.stringify(stored) ? stored : saveProducts(updated);
        }
    } catch {
        // Un dato corrupto no debe impedir abrir la tienda.
    }
    return saveProducts(INITIAL_PRODUCTS);
};

const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
    return products;
};

const validateProduct = (product) => {
    if (!product.name?.trim() || !Number.isFinite(Number(product.price)) || Number(product.price) <= 0) {
        throw new Error('Ingresa un nombre y un precio mayor que cero.');
    }
    const stock = Number(product.stock ?? 10);
    if (!Number.isInteger(stock) || stock < 0) throw new Error('Las existencias deben ser un entero mayor o igual que cero.');
    return { ...product, stock, name: product.name.trim(), price: Number(product.price) };
};

export const addProduct = (newProduct) => {
    const current = getProducts();
    const created = { ...validateProduct(newProduct), id: crypto.randomUUID() };
    return saveProducts([...current, created]);
};

export const updateProduct = (id, changes) => {
    const current = getProducts();
    const product = current.find((p) => p.id === id);
    if (!product) throw new Error('El producto ya no existe.');
    const updated = validateProduct({ ...product, ...changes, id });
    return saveProducts(current.map((p) => p.id === id ? updated : p));
};

export const deleteProduct = (id) => {
    const current = getProducts();
    return saveProducts(current.filter((p) => p.id !== id));
};
