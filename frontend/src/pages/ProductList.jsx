import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");

  const fetch = async (reset=false) => {
    const res = await axios.get("http://localhost:5000/api/products", {
      params: { skip: reset ? 0 : skip, limit, category }
    });
    if (reset) {
      setProducts(res.data.products);
      setSkip(res.data.products.length);
    } else {
      setProducts(p => [...p, ...res.data.products]);
      setSkip(s => s + res.data.products.length);
    }
    setTotal(res.data.total);
  };

  useEffect(() => { fetch(true); }, [category]);

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Products</h2>
        <div>
          <select value={category} onChange={e => { setCategory(e.target.value); setSkip(0); }}>
            <option value="">All Categories</option>
            <option value="shoes">Shoes</option>
            <option value="clothing">Clothing</option>
            <option value="sofa">Furniture</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      <div style={{textAlign:"center", margin:"20px 0"}}>
        {skip < total ? (
          <button onClick={() => fetch(false)}>Load more</button>
        ) : (
          <div>Showing all products</div>
        )}
      </div>
    </div>
  );
}
