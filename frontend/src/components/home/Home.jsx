import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/books")
        .then((result) => setItems(result.data));
    } catch (err) {
      console.log(err);
    }
  });
  const handleDelete = (id) => {
    try {
      axios.delete("http://localhost:3001/books/" + id).then(navigate("/"));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="main">
      <h1>Books Collections</h1>
      <div className="wrapper">
        <Link to={"/create"}>
          <button className="btn">Add Book</button>
        </Link>
        <div className="section">
          <table className="table">
            <thead>
              <tr>
                <td>Title</td>
                <td>Author</td>
                <td>Publish Year</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {items.map(({ _id, title, author, year }) => {
                return (
                  <tr key={_id}>
                    <td>{title}</td>
                    <td>{author}</td>
                    <td>{year}</td>
                    <td>
                      <div className="btn-t">
                        <Link to={`/update/${_id}`}>
                          <button className="btn-1">Edit</button>
                        </Link>

                        <button className="btn-1" onClick={() => handleDelete(_id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
