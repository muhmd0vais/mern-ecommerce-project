import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAdd(){
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [description,setDescription]=useState("");
  const [image,setImage]=useState("");
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        title, price: Number(price), description, image
      });
      alert("Product added");
      nav("/");
    } catch (err) {
      alert("Add failed. Make sure you're logged in as admin.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add product</h2>
      <form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:520}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button className="btn" type="submit">Create</button>
      </form>
    </div>
  );
}
