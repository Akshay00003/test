import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./create.css";

const Update = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    try {
      axios.get("http://localhost:3001/books/" + id).then((result) => {
        setTitle(result.data.title);
        setAuthor(result.data.author);
        setYear(result.data.year);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!title.trim()) {
      errors.title = "Title is required";
    }
    if (!author.trim()) {
      errors.author = "Author is required";
    }
    if (year === "") {
      errors.year = "Year is required";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", { title, author, year });
      axios
        .put("http://localhost:3001/books/" + id, { title, author, year })
        .then(navigate("/"));
      setTitle("");
      setAuthor("");
      setYear("");
    }
  };
  return (
    <div className="main">
      <div className="wrapper-1">
        <form action="" className="form" onSubmit={handleSubmit}>
          <label htmlFor="" className="label">
            Title
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
          <label htmlFor="" className="label">
            Author
          </label>
          <input
            type="text"
            className="input"
            placeholder="Author"
            name=""
            id=""
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <p className="error">{errors.author}</p>}
          <label htmlFor="" className="label">
            Publish Year
          </label>
          <input
            type="text"
            className="input"
            placeholder="publish year"
            name=""
            id=""
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          {errors.year && <p className="error">{errors.year}</p>}
          <button className="sub" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
