import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Checkout() {
    const { cart, total, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
    });

    //error state to manage incorrect validations
    const [errors, setErrors] = useState({});

    //Success state
    const [orderPlaced, setOrderPlaced] = useState(false);

    //Handle input changes, took me lot of time to figure this out
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        //clear error when field is changed
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Required fields
        const requiredFields = [
            'firstName', 'lastName', 'email', 'address',
            'city', 'postalCode', 'country', 'cardName',
            'cardNumber', 'cardExpiry', 'cardCVV'
        ];

        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = 'This field is required';
            }
        });
        //for correct entries we should use regex
        // mail validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        //card number validation (just a simple check for 16 digits)
        if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = 'Card number must be 16 digits';
        }

        //expiry date validation (in MM/YY format)
        if (formData.cardExpiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
            newErrors.cardExpiry = 'Use MM/YY format';
        }

        // CVV validation (3 or 4 digits)
        if (formData.cardCVV && !/^\d{3,4}$/.test(formData.cardCVV)) {
            newErrors.cardCVV = 'CVV must be 3-4 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate order placement
            setTimeout(() => {
                setOrderPlaced(true);
                clearCart();

                // Redirect after a delay
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }, 1500);
        }
    };

    // If cart is empty and no order placed, redirect to products
    if (cart.length === 0 && !orderPlaced) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                <p className="text-lg mb-4">Your cart is empty. Add some products before checkout.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    // Show success message if order placed
    if (orderPlaced) {
        return (
            <div className="container mx-auto p-4 max-w-md text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
                    <p className="mb-4">Thank you for your purchase. You will be redirected to the home page shortly.</p>
                    <div className="inline-block w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <div className="lg:flex lg:gap-8">
                {/* Checkout Form */}
                <div className="lg:flex-grow">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label htmlFor="firstName" className="block mb-1">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block mb-1">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block mb-1">Street Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label htmlFor="city" className="block mb-1">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>

                            <div>
                                <label htmlFor="postalCode" className="block mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                            </div>

                            <div>
                                <label htmlFor="country" className="block mb-1">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-4 mt-8">Payment Information</h2>

                        <div className="mb-4">
                            <label htmlFor="cardName" className="block mb-1">Name on Card</label>
                            <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cardNumber" className="block mb-1">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="1234 5678 9012 3456"
                                className={`w-full px-3 py-2 border rounded ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label htmlFor="cardExpiry" className="block mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    id="cardExpiry"
                                    name="cardExpiry"
                                    value={formData.cardExpiry}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    className={`w-full px-3 py-2 border rounded ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                            </div>

                            <div>
                                <label htmlFor="cardCVV" className="block mb-1">CVV</label>
                                <input
                                    type="text"
                                    id="cardCVV"
                                    name="cardCVV"
                                    value={formData.cardCVV}
                                    onChange={handleChange}
                                    placeholder="123"
                                    className={`w-full px-3 py-2 border rounded ${errors.cardCVV ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.cardCVV && <p className="text-red-500 text-sm mt-1">{errors.cardCVV}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="lg:w-96">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-20">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="border-b pb-4 mb-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between mb-2">
                                    <div className="flex items-center">
                                        <span className="font-medium">{item.quantity}x</span>
                                        <span className="ml-2">{item.title}</span>
                                    </div>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mb-2 flex justify-between">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="mb-2 flex justify-between">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>

                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Tax included</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;