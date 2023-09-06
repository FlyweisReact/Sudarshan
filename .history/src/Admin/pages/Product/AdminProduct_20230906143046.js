/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Table, Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";

const AdminProduct = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/products`);
      setData(data.products);
      setTotal(data.products.length);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/admin/product/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const filterData = !search
  ? data
  : data?.filter((i) =>
      i?.name?.toLowerCase().includes(search?.toLowerCase())
    );


  return (
    <>
      <section>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Products ( Total : {total} )
          </span>
        </div>

        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Product"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading === true ? (
            <Alert>
              {" "}
              Fetching Products Wait <Spinner animation="border" size="lg" />
            </Alert>
          ) : data?.length === 0 || !data ? (
            <Alert>Product Not Found</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Created At</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filterData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img
                          src={i.images?.[0]}
                          alt=""
                          style={{ maxWidth: "80px" }}
                        />
                      </td>
                      <td>{i.name}</td>
                      <td>{i.category?.name}</td>
                      <td>₹{i.price}</td>
                      <td>{i.stock}</td>
                      <td>{i.createdAt?.slice(0, 10)}</td>
                      <td>
                        <span className="flexCont">
                          <Link to={`/admin/product/${i._id}`}>
                            <i className="fa-solid fa-eye" />
                          </Link>
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(AdminProduct);
