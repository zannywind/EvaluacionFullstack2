import React, { useState, useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import CategoriesView from './views/CategoriesView';
import OffersView from './views/OffersView';
import CartView from './views/CartView';
import ChekoutView from './views/ChekoutView';
import SuccessView from './views/SuccessView';
import ErrorView from './views/ErrorView';
import AdminView from './views/AdminView';
import ProfileView from './views/ProfileView';
import { getProducts } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  // Estado de usuario autenticado
  const [user, setUser] = useState(null);

  // Estado persistente del formulario de checkout
  const [checkoutData, setCheckoutData] = useState({
    nombre: '',
    email: '',
    direccion: ''
  });
  const [checkoutError, setCheckoutError] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView products={products} onAddToCart={handleAddToCart} />;
      case 'products':
        return <ProductsView products={products} onAddToCart={handleAddToCart} />;
      case 'categories':
        return <CategoriesView products={products} onAddToCart={handleAddToCart} />;
      case 'offers':
        return <OffersView products={products} onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <CartView
            cart={cart}
            setCart={setCart}
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      case 'checkout':
        return (
          <ChekoutView
            cart={cart}
            setCart={setCart}
            onNavigate={(view) => setCurrentView(view)}
            setLastOrder={setLastOrder}
            checkoutData={checkoutData}
            setCheckoutData={setCheckoutData}
            hasError={checkoutError}
            setHasError={setCheckoutError}
          />
        );
      case 'success':
        return (
          <SuccessView
            order={lastOrder}
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      case 'error':
        return <ErrorView onNavigate={(view) => setCurrentView(view)} />;
      case 'admin':
        return <AdminView products={products} setProducts={setProducts} />;
      case 'profile':
        return (
          <ProfileView
            user={user}
            setUser={setUser}
            onNavigate={(view) => setCurrentView(view)}
            setCheckoutData={setCheckoutData}
          />
        );
      default:
        return <HomeView products={products} onAddToCart={handleAddToCart} />;
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <AppNavbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartItems}
        user={user}
      />
      <div className="container mt-4">{renderView()}</div>
    </div>
  );
}

export default App;