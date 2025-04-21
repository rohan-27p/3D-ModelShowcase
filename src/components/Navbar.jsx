import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Navbar() {
    const { cart } = useContext(CartContext);

    // Calculate total items in cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-gray-800 text-white py-4 px-6 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">3D Shop</Link>

                <div className="flex gap-6">
                    <Link to="/" className="hover:text-gray-300 transition-colors">
                        Home
                    </Link>
                    <Link to="/products" className="hover:text-gray-300 transition-colors">
                        Products
                    </Link>
                    <Link to="/cart" className="hover:text-gray-300 transition-colors relative">
                        Cart
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
                        )}
                    </Link>
                    <Link to="/checkout" className="hover:text-gray-300 transition-colors">
                        Checkout
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;