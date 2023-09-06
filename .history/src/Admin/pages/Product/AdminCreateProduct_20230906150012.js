/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";

const AdminCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [featuresName, setFeaturesName] = useState("");
  const [colorName, setColorName] = useState("");

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const featureSelector = (colors) => {
    setFeatures((prev) => [...prev, colors]);
    setFeaturesName("");
  };

  const clearFeatures = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };


  const colorSelector = (colors) => {
    setColor((prev) => [...prev, colors]);
    setColorName("");
  };

  const clearColor = (index) => {
    setColor((prev) => prev.filter((_, i) => i !== index));
  };

  const fd = new FormData();
  Array.from(image).forEach((img) => {
    fd.append("image", img);
  });
  fd.append("name", name);
  fd.append("description", description);
  Array.from(features).forEach((i) => {
    fd.append("features", i);
  });
  Array.from(color).forEach((i) => {
    fd.append("color", i);
  });
  fd.append("price", price);
  fd.append("category", category);
  fd.append("subCategory", subCategory);
  fd.append("stock", stock);

  const createProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${Baseurl}api/v1/admin/product/new`,
        fd,
        Auth
      );
      toast.success(res.data.message);
      setLoading(false);
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <section>
      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Create New Product
          </span>
        </div>

        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              required
              onChange={(e) => setImage(e.target.files)}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Choose Category</Form.Label>
            <Form.Select
              onChange={(e) => {
                setCategoryId(e.target.value);
                getSubCategory(e.target.value);
              }}
              required
            >
              <option>-- Select Category --</option>
              {categoryArr?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min={0}
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Color</Form.Label>
          <div className="multiple-array">
            <Form.Control
              type="text"
              required
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
            <i className="fa-solid fa-plus" onClick={colorSelector} />
          </div>

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {loading ? <Spinner animation="border" /> : "Submit"}
            </Button>

            <Link to="/admin/product">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(AdminCreateProduct);
