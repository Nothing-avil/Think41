import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // Adjust based on your backend

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 mt-8">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p>Brand: {product.brand}</p>
          <p>Price: ₹{product.retail_price}</p>
          <p>Category: {product.category}</p>
        </Link>
      ))}
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 mt-8">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Department:</strong> {product.department}
      </p>
      <p>
        <strong>Price:</strong> ₹{product.retail_price}
      </p>
      <p>
        <strong>Cost:</strong> ₹{product.cost}
      </p>
      <p>
        <strong>SKU:</strong> {product.sku}
      </p>
      <p>
        <strong>Distribution Center ID:</strong>{" "}
        {product.distribution_center_id}
      </p>
      <Link to="/" className="mt-4 inline-block text-blue-500">
        ← Back to list
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="text-center py-4 bg-blue-600 text-white text-2xl font-bold">
        🛍️ E-Commerce Products
      </div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
