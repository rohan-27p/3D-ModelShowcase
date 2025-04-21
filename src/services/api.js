
// // API methods
export const fetchProducts = async () => {
    try {
        const response = await fetch('https://3d-api-work.vercel.app/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchFeaturedProduct = async () => {
    try {
        const response = await fetch('https://3d-api-work.vercel.app/api/products/featured');
        if (!response.ok) {
            throw new Error('Failed to fetch featured product');
        }
        const products = await response.json();
        return products.find(product => product.featured) || products[0];
    } catch (error) {
        console.error('Error fetching featured product:', error);
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`https://3d-api-work.vercel.app/api/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const products = await response.json();
        const product = products.find(p => p.id === parseInt(id));
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};