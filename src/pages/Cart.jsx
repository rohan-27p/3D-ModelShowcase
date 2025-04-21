import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Cart() {
    const { cart, total, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                <p className="text-lg mb-4">Your cart is empty.</p>
                <Link
                    to="/products"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                {/* Cart Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 font-medium">
                    <div className="col-span-5">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Subtotal</div>
                    <div className="col-span-1"></div>
                </div>

                {/* Cart Items */}
                {cart.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b items-center">
                        <div className="col-span-5 flex items-center">
                            <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-4">
                                {item.images && item.images.length > 0 ? (
                                    <img src={item.images[0]} alt={item.title} className="h-full w-full object-contain" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                        </div>

                        <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>

                        <div className="col-span-2 flex justify-center">
                            <div className="flex items-center border rounded">
                                <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="px-3 py-1 border-r hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-3 py-1">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-3 py-1 border-l hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2 text-center font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <div className="col-span-1 text-center">
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Summary */}
            <div className="md:flex md:justify-between">
                <div className="mb-4 md:mb-0">
                    <button
                        onClick={clearCart}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm max-w-md ml-auto">
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span className="font-medium">FREE</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Tax included</p>
                    </div>
                    <Link
                        to="/checkout"
                        className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;