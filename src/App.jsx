import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './index.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                    </main>
                    <footer className="bg-gray-800 text-white py-6 mt-auto">
                        <div className="container mx-auto px-4 text-center">
                            <p>© 2025 3D Product Showcase. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;