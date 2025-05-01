import { useState, useEffect, Suspense, useRef, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Center,Environment, useGLTF } from '@react-three/drei'; 
import { fetchProducts } from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
// thissss filee took me 7 hours to make, i was so tired and frustrated but i finally got it to work, spent most of the time fixing cors and other errors
// Base URL of the API where models are hosted
const API_BASE_URL = 'https://3d-api-work.vercel.app';

// Simple cube placeholder when model fails or takes time to load
function FallbackCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

// Simplified model component with better error handling
function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={1.2}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}
function ProductDisplay({ product, productRef }) {
    const {addToCart} = useContext(CartContext)
    const handleAddToCart = () =>{
        addToCart(product);
    }
  return (
    <div ref={productRef} className="mb-32 last:mb-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-lg text-gray-600">${product.price.toFixed(2)}</p>
        <p className="mt-2">{product.description}</p>
        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
      </div>

      <div className="h-96 bg-white rounded-lg overflow-hidden shadow">
        <Canvas
          // turn *all* shadows off
          shadows={false}
          // give it a white background
          style={{ background: '#fff' }}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl = {{toneMappingExposure:1.0}}
        >
          <ambientLight intensity={1.0} />
          <hemisphereLight
            skyColor="#ffffff"
            groundColor="#444444"
            intensity={0.7}
          />
          <directionalLight position={[5, 5, 5]} intensity={1.0} />
          <directionalLight position={[-5, 5, -5]} intensity={0.7} />

          <Suspense fallback={<FallbackCube />}>
          {/* //finally got the environment preset to work ,changed to local file */}
          <Environment files="/hdr/studio_small_03_1k.hdr" background={false}/>
            {product.modelPath ? (
              // auto‐fit the model to camera
                <Bounds fit focus clip margin={1.2}>
                    <Center>
                    <Model modelPath={product.modelPath} />
                    </Center>
                </Bounds>
            ) : (
              <Center><FallbackCube /></Center>
            )}
          </Suspense>

          <OrbitControls
            enablePan={false}
            // restrict how far in/out you can zoom
            minDistance={1}
            maxDistance={20}
            // don't let the camera flop upside‐down
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            // minAzimuthAngle={-Math.PI/4}
            // maxAzimuthAngle={Math.PI/4}
          />
        </Canvas>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ThreeDProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const productRefs = useRef({});

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        
        //this is to process all products to have proper model paths
        const processedProducts = fetchedProducts.map(product => ({
          ...product,
          modelPath: product.modelPath ? (
            product.modelPath.startsWith('http') 
              ? product.modelPath 
              : `${API_BASE_URL}${product.modelPath.startsWith('/') ? product.modelPath : '/' + product.modelPath}`
          ) : null
        }));

        setProducts(processedProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  //scroll to focused product when products load or URL changes, when click on a product in that endpoint,takes you to the home page
  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId && products.length > 0) {
      const productRef = productRefs.current[productId];
      if (productRef) {
        productRef.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }
    }
  }, [searchParams, products]);

  if (loading) {
    return <div className="h-96 flex justify-center items-center">Loading products...</div>;
  }

  if (error || !products.length) {
    return <div className="h-96 flex justify-center items-center text-red-500">{error || "No products available"}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {products.map(product => (
        <ProductDisplay 
          key={product.id} 
          product={product} 
          productRef={el => productRefs.current[product.id] = el}
        />
      ))}
    </div>
  );
}

//you can clear any previous preloads to avoid CORS errors
useGLTF.preload();
useGLTF.clear();

export default ThreeDProduct;