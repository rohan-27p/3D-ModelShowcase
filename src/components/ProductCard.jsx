import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://3d-api-work.vercel.app';

function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Convert relative image path to full URL
    const getFullImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return API_BASE_URL + (imagePath.startsWith('/') ? imagePath : '/' + imagePath);
    };

    // Get the first image from the array or single image path
    const imageUrl = Array.isArray(product.images) 
        ? getFullImageUrl(product.images[0])
        : getFullImageUrl(product.images);

    const handleProductClick = (e) => {
        // Prevent navigation if clicking the Add to Cart button
        if (e.target.tagName.toLowerCase() !== 'button') {
            navigate(`/?product=${product.id}`);
        }
    };

    return (
        <div 
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleProductClick}
        >
            <div className="h-48 bg-gray-100 flex items-center justify-center">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.png'; // You can add a placeholder image in public folder
                        }}
                    />
                ) : (
                    <div className="text-gray-400">No image available</div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-medium text-lg">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600">{product.description}</p>

                <div className="flex justify-between items-center">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click when clicking button
                            addToCart(product);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;