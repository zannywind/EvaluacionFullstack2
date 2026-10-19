import { useEffect, useState } from "react";
import AppNavbar from "./components/AppNavbar";

import HomeView from "./views/HomeView";
import ProductsView from "./views/ProductsView";
import CategoriesView from "./views/CategoriesView";
import OffersView from "./views/OffersView";
import CartView from "./views/CartView";
import ChekoutView from "./views/ChekoutView";
import SuccessView from "./views/SuccessView";
import ErrorView from "./views/ErrorView";
import AdminView from "./views/AdminView";
import ProfileView from "./views/ProfileView";

import {getProducts, addProduct, deleteProduct} from './data/mockData';
import { data } from "react-router-dom";

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState([null]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? {...item, quantity: item.quantity +1}:item
        );
      }
      return [...prev, {...product, quantity: 1}];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCart([]);

  const handleAddProduct = (newProd) => {
    const updated = addProduct(newProd);
    setProducts(updated);
  };

  const handleDeleteProduct = (id) => {
    const updated = deleteProduct(id);
    setProducts(updated);
  };

  const handleProcessPayment = (success, data) => {
    setOrderData(data);
    if (success) {
      setCart([]);
      setCurrentView('success');
    } else {
      setCurrentView('error');
    }
  };

  const totalCart = cart.reduce ((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <AppNavbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}/>

      <main className="container pb-5">
        {currentView === 'home' && (
          <HomeView products={products} onAddToCart={handleAddProduct} />
        )}
        {currentView === 'products' && (
          <ProductsView products={products} onAddToCart={handleAddProduct} />
        )}
        {currentView === 'categories' && (
          <CategoriesView products={products} onAddToCart={handleAddProduct} />
        )}
        {currentView === 'offers' && (
          <OffersView products={products} onAddToCart={handleAddProduct} />
        )}
        {currentView === 'cart' && (
          <CartView
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            setCurrentView={setCurrentView}
            total={totalCart}
          />
        )}
        {currentView === 'checkout' && (
          <ChekoutView total={totalCart} onProcessPayment={handleProcessPayment} />
        )}
        {currentView === 'success' && (
          <SuccessView
            orderData={orderData}
            total={totalCart}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'error' && <ErrorView setCurrentView={setCurrentView} />}
        {currentView === 'admin' && (
          <AdminView
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        {currentView === 'profile' && <ProfileView/>}
      </main>
    </div>
  );
}