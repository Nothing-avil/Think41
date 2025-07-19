import React, { useState, useMemo } from 'react';

// Mock Data (could place in a separate file)
const PRODUCTS = [
  { id: 1, name: "iPhone 15", category: "Electronics", brand: "Apple", price: 1200 },
  { id: 2, name: "Galaxy S24", category: "Electronics", brand: "Samsung", price: 999 },
  { id: 3, name: "Running Shoes", category: "Sportswear", brand: "Nike", price: 150 },
  { id: 4, name: "Yoga Mat", category: "Sportswear", brand: "Reebok", price: 60 },
  { id: 5, name: "MacBook Pro", category: "Computers", brand: "Apple", price: 2500 },
  { id: 6, name: "ThinkPad X1", category: "Computers", brand: "Lenovo", price: 1800 },
];

// Filters Component
function Filters({ categories, brands, filters, setFilters, minPrice, maxPrice, handleReset }) {
  return (
    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <label>
        Category:<br/>
        <select
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        >
          <option value=''>All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label>
        Brand:<br/>
        <select
          value={filters.brand}
          onChange={e => setFilters(f => ({ ...f, brand: e.target.value }))}
        >
          <option value=''>All</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>
      <label>
        Min Price:<br/>
        <input
          type="number"
          style={{width: 70}}
          min={minPrice}
          max={filters.maxPrice}
          value={filters.minPrice}
          onChange={e =>
            setFilters(f => ({
              ...f,
              minPrice: Math.min(Number(e.target.value), f.maxPrice)
            }))
          }
        />
      </label>
      <label>
        Max Price:<br/>
        <input
          type="number"
          style={{width: 70}}
          min={filters.minPrice}
          max={maxPrice}
          value={filters.maxPrice}
          onChange={e =>
            setFilters(f => ({
              ...f,
              maxPrice: Math.max(Number(e.target.value), f.minPrice)
            }))
          }
        />
      </label>
      <button style={{
        padding: "8px 18px", background: "#eee", borderRadius: "5px", border: "1px solid #bbb", marginLeft: 16
      }}
        onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
}

// Product cards
function ProductCard({ product }) {
  return (
    <div style={{
      border: "1px solid #ddd", borderRadius: 8, padding: 16, width: 220
    }}>
      <h4>{product.name}</h4>
      <p>
        <strong>Category: </strong> {product.category} <br/>
        <strong>Brand: </strong> {product.brand} <br/>
        <strong>Price: </strong> ${product.price}
      </p>
    </div>
  );
}

// Product List
function ProductList({ products }) {
  if (products.length === 0) return <p>No products found.</p>;
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "1rem"
    }}>
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}

// Main App
export default function App() {
  const categories = useMemo(
    () => [...new Set(PRODUCTS.map(p => p.category))], []);
  const brands = useMemo(
    () => [...new Set(PRODUCTS.map(p => p.brand))], []
  );
  const minPriceOverall = useMemo(
    () => Math.min(...PRODUCTS.map(p => p.price)), []
  );
  const maxPriceOverall = useMemo(
    () => Math.max(...PRODUCTS.map(p => p.price)), []
  );
  // Filters stored in state
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: minPriceOverall,
    maxPrice: maxPriceOverall,
  });

  // Reset filters handler
  function handleReset() {
    setFilters({
      category: "",
      brand: "",
      minPrice: minPriceOverall,
      maxPrice: maxPriceOverall,
    });
  }

  // Filter products in real time as filters change
  const filteredProducts = useMemo(
    () => PRODUCTS.filter(product => {
      const categoryMatch =
        !filters.category || product.category === filters.category;
      const brandMatch =
        !filters.brand || product.brand === filters.brand;
      const priceMatch =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      return categoryMatch && brandMatch && priceMatch;
    }),
    [filters]
  );

  return (
    <div style={{ maxWidth: 900, margin: "2.5rem auto", fontFamily: "sans-serif" }}>
      <h2>Product Catalog</h2>
      <Filters
        categories={categories}
        brands={brands}
        filters={filters}
        setFilters={setFilters}
        minPrice={minPriceOverall}
        maxPrice={maxPriceOverall}
        handleReset={handleReset}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
}
