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
import ProductDetailView from './views/ProductDetailView';
import AboutView from './views/AboutView';
import BlogView from './views/BlogView';
import ContactView from './views/ContactView';
import { getProducts } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Estado de usuario autenticado
  const [user, setUser] = useState(null);

  // Estos datos se conservan entre vistas, pero se reinician al recargar.
  const [checkoutData, setCheckoutData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    entrega: 'domicilio'
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

  const showProduct = (product) => {
    setSelectedProductId(product.id);
    setCurrentView('detail');
  };

  const changeUser = (nextUser) => {
    setUser(nextUser);
    setCheckoutError(false);
    setCheckoutData({ nombre: nextUser?.nombre || '', email: nextUser?.email || '',
      direccion: nextUser?.direccion || '', entrega: 'domicilio' });
  };

  const changeProducts = (updated) => {
    setProducts(updated);
    // Mantener cantidades, actualizando precios o retirando productos eliminados.
    setCart((previous) => previous.flatMap((item) => {
      const current = updated.find((product) => product.id === item.id);
      return current ? [{ ...current, quantity: item.quantity }] : [];
    }));
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView products={products} onAddToCart={handleAddToCart} onViewProduct={showProduct} />;
      case 'products':
        return <ProductsView products={products} onAddToCart={handleAddToCart} onViewProduct={showProduct} />;
      case 'categories':
        return <CategoriesView products={products} onAddToCart={handleAddToCart} onViewProduct={showProduct} />;
      case 'offers':
        return <OffersView products={products} onAddToCart={handleAddToCart} onViewProduct={showProduct} />;
      case 'detail':
        return <ProductDetailView product={products.find((p) => p.id === selectedProductId)} onAddToCart={handleAddToCart} onNavigate={setCurrentView} />;
      case 'about': return <AboutView />;
      case 'blog': return <BlogView postId={selectedPostId} onSelectPost={setSelectedPostId} />;
      case 'contact': return <ContactView />;
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
        return user?.isAdmin ? <AdminView products={products} setProducts={changeProducts} user={user} onUserChange={setUser} /> : <p role="alert">Acceso reservado al administrador.</p>;
      case 'profile':
        return (
          <ProfileView
            user={user}
            setUser={changeUser}
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      default:
        return <HomeView products={products} onAddToCart={handleAddToCart} onViewProduct={showProduct} />;
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