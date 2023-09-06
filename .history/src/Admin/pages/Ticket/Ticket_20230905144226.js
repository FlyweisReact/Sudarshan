/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Ticket = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
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
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/ticket/listTicket",
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closehandler = async (id) => {
    try {
      const response = await axios.put(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/closeTicket/${id}`,
        {},
        Auth
      );
      const msg = response.data.message;
      fetchData();
      toast.success(msg);
    } catch {}
  };

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
            All Ticket's ( Total : {total} )
          </span>
        </div>
        <section className="sectionCont">
          {loading ? (
            <Spinner
              animation="border"
              role="status"
              style={{ display: "block", margin: "auto" }}
            />
          ) : data?.length === 0 || !data ? (
            <Alert>Ticket Not Found</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>User</th>
                    <th>Ticket Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Close</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>{i.userId?.fullName}</td>
                      <td> {i.tiketId} </td>
                      <td> {i.title} </td>
                      <td> {i.description} </td>
                      <td> {i.close === false ? "No" : "Yes"} </td>
                      <td>
                        <button
                          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                          onClick={() => closehandler(i._id)}
                        >
                          Close
                        </button>
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

export default HOC(Ticket);
