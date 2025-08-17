import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* More routes will be added in later phases */}
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
