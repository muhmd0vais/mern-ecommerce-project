import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const [wish, setWish] = useState(JSON.parse(localStorage.getItem("wishlist") || "[]"));

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wish));
  }, [wish]);

  const remove = (id) => setWish(w => w.filter(i => i.id !== id));

  if (!wish.length) return <div>No wishlist items</div>;

  return (
    <div>
      <h2>Wishlist</h2>
      <div className="product-grid">
        {wish.map(p => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name}/>
            <h4>{p.name}</h4>
            <button onClick={() => remove(p.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
