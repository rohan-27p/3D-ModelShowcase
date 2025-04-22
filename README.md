# 3D Model Marketplace

A full-featured e-commerce platform for browsing, purchasing, and managing 3D models with a clean, intuitive interface.

![Project Screenshot](https://via.placeholder.com/800x400?text=3D+Model+Marketplace+Screenshot)

## ✨ Features

- **Interactive 3D Model Showcase** - Browse models with realistic previews using React Three Fiber
- **Complete E-commerce Flow** - Add to cart, manage quantities, and checkout
- **Full CRUD Functionality** - Create, read, update, and delete operations for models
- **Serverless Architecture** - API deployed via Vercel for scalability
- **Responsive Design** - Optimized experience across devices
- **Secure Checkout** - With comprehensive input validation
- **CORS Enabled** - API configured to handle cross-origin requests properly

## 🚀 Tech Stack

- **Frontend**: React
- **3D Rendering**: React Three Fiber (R3F)
- **Backend**: Serverless functions via Vercel
- **State Management**: React State Management

## 📋 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/3d-model-marketplace.git

# Navigate to the project directory
cd 3d-model-marketplace

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📱 Usage

1. Browse the showcase of available 3D models
2. Click on a model to view details and preview in 3D
3. Add models to your cart
4. Adjust quantities or remove items as needed
5. Proceed to checkout with your selected items
6. Complete the purchase with shipping and payment details

## 🖼️ Screenshots

![Homepage](https://via.placeholder.com/400x200?text=Homepage)
![Product Detail](https://via.placeholder.com/400x200?text=Product+Detail)


## 🛠️ API Implementation

The project uses serverless API functions deployed on Vercel to fetch 3D model data including names, descriptions, prices, and images.

### CORS Configuration

The API is configured to handle Cross-Origin Resource Sharing (CORS) requests:
- All origins are allowed (`Access-Control-Allow-Origin: *`)
- Supported methods: GET, OPTIONS
- Proper handling of preflight requests
- Custom headers allowed: X-Requested-With, Content-Type, Accept

```javascript
// API endpoint implementation example
module.exports = (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

    // Handle OPTIONS method for CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Process the request
    // ...
};
```

## 📄 License

MIT License 2025

## 👤 Author

[Rohan](https://github.com/rohan-27p)

## 🙏 Acknowledgements

- React Three Fiber - For powering the 3D model rendering
- Vercel - For serverless API hosting
