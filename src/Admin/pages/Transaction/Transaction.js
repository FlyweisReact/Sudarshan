/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Transaction = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/allTransactionUser`
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = !search
    ? data
    : data?.filter((i) =>
        i?.orderId?.orderId?.toLowerCase().includes(search?.toLowerCase())
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
            All Transaction's ( Total : {total} )
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
              placeholder="Search by Order Id"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : data?.length === 0 || !data ? (
            <Alert>No Transaction Yet !</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>User Name</th>
                    <th>Order Id</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filterData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>{i.user?.fullName}</td>
                      <td>{i.orderId?.orderId}</td>
                      <td>{i.amount}</td>
                      <td>{i.type}</td>
                      <td> {i.Status} </td>
                      <td>
                        <Link to={`/admin/order/${i.orderId?._id}`}>
                          <i className="fa-solid fa-eye" />
                        </Link>
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

export default HOC(Transaction);
