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

// DEFENSA 02 — COORDINADOR: App comparte datos entre menú, catálogo, carrito y checkout.
// Recorrido: main.jsx -> App -> vista elegida -> componentes como ProductCard.
function App() {
  // ESTADO: useState devuelve el valor actual y una función para actualizarlo.
  // Al actualizar estado, React vuelve a calcular la interfaz. Estos datos no sobreviven a recargar.
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

// EFECTO: al montar App leemos los productos de mockData y los ponemos en estado.
  // [] indica que el efecto no depende de valores cambiantes; no se ejecuta por cada render normal.
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // EVENTO: ProductCard llama a esta función mediante una prop cuando se pulsa Agregar.
  // Usamos el estado anterior: si existe el producto, sumamos cantidad; si no, lo añadimos.
  // map y ... crean nuevos arrays/objetos, sin modificar directamente el estado anterior.
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

  // Al cambiar usuario también preparamos sus datos para el formulario del checkout.
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

  // NAVEGACIÓN Y CONDICIONALES: currentView selecciona qué componente devolver.
  // Cambiar de pantalla aquí no cambia la URL ni implementa el historial de React Router.
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
      // Control de interfaz por rol; no es seguridad de un servidor ni autenticación real.
      case 'admin':
        return user?.isAdmin ? <AdminView products={products} setProducts={changeProducts} user={user} onUserChange={changeUser} /> : <p role="alert">Acceso reservado al administrador.</p>;
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

  // DATO CALCULADO: reduce suma cantidades; no necesitamos otro estado para este total.
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