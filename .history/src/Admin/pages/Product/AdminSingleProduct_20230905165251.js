/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const AdminSingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const BaseUrl = "https://ecommerce-backend-ochre-phi.vercel.app/";

  const getOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/vendor/Product/view/${id}`
      );
      setData(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <section className="sectionCont">
          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : (
            <Form>
              <div className="img-cont">
                {data?.productImage?.map((i, index) => (
                  <img src={i} alt="" className="centerImage" key={index} />
                ))}
              </div>
              {ValueChecker(data?.productName, "Product Name")}
              {ValueChecker(data?.description, "Description")}
              {ValueChecker(data?.categoryId?.name, "Category")}
              {ValueChecker(data?.subcategoryId?.name, "Sub-Category")}
              {ValueChecker(data?.originalPrice, "MRP")}
              {ValueChecker(data?.discountPrice, "Selling Price")}
              {ValueChecker(data?.discount, "Discount")}
              {ValueChecker(data?.returnPolicy, "Return Policy")}
              {ValueChecker(data?.stock, "Stock")}
              {ValueChecker(data?.stockStatus, "Stock Status")}
              {ValueChecker(data?.viewOnwebsite, "Active on Website")}
              {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

              <Link to="/admin/product">
                <Button variant="dark">Back</Button>
              </Link>
            </Form>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(AdminSingleProduct);
