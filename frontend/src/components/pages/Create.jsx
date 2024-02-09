import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!title.trim()) {
      errors.title = "Title is required";
    }
    if (!author.trim()) {
      errors.author = "Author is required";
    }
    if (!year.trim()) {
      errors.year = "Year is required";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", { title, author, year });
      axios
        .post("http://localhost:3001/create", { title, author, year })
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
            name="title"
            type="text"
            className="input"
            placeholder="Enter title"
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
            name="author"
            id=""
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
            name="year"
            id=""
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

export default Create;
