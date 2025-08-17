import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={
                <div className="min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-neutral-800 mb-4">Page Not Found</h1>
                    <p className="text-neutral-600 mb-8">The page you're looking for doesn't exist.</p>
                    <a href="/" className="btn-primary">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
