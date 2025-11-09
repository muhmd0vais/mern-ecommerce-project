import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${encodeURIComponent(id)}`)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);

  if (product === null) return <div>Loading or product not found...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <div style={{display:"flex", gap:20}}>
        <div style={{width:400}}>
          <img src={product.images && product.images.length ? product.images[0] : product.image || "https://via.placeholder.com/400"} alt={product.name} style={{width:"100%"}} />
        </div>
        <div>
          <h3>Price: ₹{product.price.toLocaleString()}</h3>
          <p>{product.description}</p>
          <button onClick={() => dispatch({ type: "ADD", payload: { id: product.id, name: product.name, price: product.price, image: product.images?.[0] || product.image }})}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
