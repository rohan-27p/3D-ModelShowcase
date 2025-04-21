import ThreeDProduct from '../components/ThreeDProduct';

function Home() {
    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to 3D Product Showcase</h1>
            <ThreeDProduct />
        </div>
    );
}

export default Home;