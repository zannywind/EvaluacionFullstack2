const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Zelda: Tears of the Kingdom",
    price: 59990,
    category: "Categoría 1",
    offer: true,
    image: "https://via.placeholder.com/400x300?text=Zelda"
  },
  {
    id: 2,
    name: "PlayStation 5 Console",
    price: 549990,
    category: "Categoría 2",
    offer: false,
    image: "https://via.placeholder.com/400x300?text=PS5"
  },
  {
    id: 3,
    name: "Xbox Series X",
    price: 499990,
    category: "Categoría 2",
    offer: true,
    image: "https://via.placeholder.com/400x300?text=Xbox+Series+X"
  },
  {
    id: 4,
    name: "Super Mario Odyssey",
    price: 49990,
    category: "Categoría 1",
    offer: false,
    image: "https://via.placeholder.com/400x300?text=Mario+Odyssey"
  },
  {
    id: 5,
    name: "Audífonos Gamer Wireless",
    price: 29990,
    category: "Categoría 3",
    offer: true,
    image: "https://via.placeholder.com/400x300?text=Audifonos"
  }
];

export const getProducts = () => {
    const stored = localStorage.getItem("products");
    if (!stored) {
        localStorage.setItem("products", JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
};

export const addProduct = (newProduct) => {
    const current = getProducts();
    const created = { ...newProduct, id: Date.now()};
    const updated = [...current, created];
    localStorage.setItem("products", JSON.stringify(updated));
    return updated;
};

export const deleteProduct = (id) => {
    const current = getProducts();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    return updated;
};