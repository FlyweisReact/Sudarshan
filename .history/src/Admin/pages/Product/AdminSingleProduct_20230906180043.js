/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Baseurl } from "../../../Baseurl";

const AdminSingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);


  const getOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/product/${id}`
      );
      setData(response.data.product)
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
                {data?.images?.map((i, index) => (
                  <img src={i} alt="" className="centerImage" key={index} />
                ))}
              </div>
              {ValueChecker(data?.name, "Product Name")}
              {ValueChecker(data?.description, "Description")}
              {ValueChecker(data?.price, "Price")}
              {ValueChecker(data?.stock, "Stock")}

                  {data?.color?.length > = 0? }
                  
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
