/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const User = () => {
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
      const { data } = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/getAllUser"
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const change_status = async (id) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/blockUnblockUser/${id}`, {},
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
        i?.fullName?.toLowerCase().includes(search?.toLowerCase())
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
            All User's ( Total : {total} )
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
              placeholder="Start typing to search for User"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : total === 0 ? (
            <Alert>No Banner Created Yet !</Alert>
          ) : !data ? (
            <Alert> Banner's Not Found </Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Full Name</th>
                      <th>Phone Number</th>
                      <th>Email Address</th>
                      <th>Wallet</th>
                      <th>Referral Code</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filterData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.fullName}</td>
                        <td>{i.phone} </td>
                        <td>{i.email} </td>
                        <td>{i.wallet} </td>
                        <td>{i.refferalCode} </td>
                        <td> {i.status} </td>
                        <td>
                          <button
                            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                            onClick={() => change_status(i._id)}
                          >
                            Change Status
                          </button>
                        </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(User);
