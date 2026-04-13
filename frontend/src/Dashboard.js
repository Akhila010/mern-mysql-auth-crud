import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
  try {
    const res = await axios.get("http://localhost:7000/items", {
      headers: { authorization: localStorage.getItem("token") }
    });

    if (Array.isArray(res.data)) {
      setItems(res.data);
    } else {
      setItems([]);
    }

  } catch (err) {
    console.log(err);
    setItems([]);
  }
};

  const addItem = async () => {
  try {
    await axios.post("http://localhost:7000/items",
      {
        title: title,
        description: "test"
      },
      {
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
    );

    alert("Item added");
    setTitle("");
    fetchItems();

  } catch (err) {
    console.log(err);
    alert("Error adding item");
  }
};

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:7000/items/${id}`, {
      headers: { authorization: token }
    });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <input onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <button onClick={addItem}>Add</button>

      {items.length > 0 ? (
  items.map((i) => (
    <div key={i.id}>
      {i.title}
      <button onClick={() => deleteItem(i.id)}>Delete</button>
    </div>
  ))
) : (
  <p>No items found</p>
)}
    </div>
  );
}