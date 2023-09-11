/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Ticket = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://green-fyto.vercel.app/api/v1/terms/"
      );
      setData(data.terms);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            Terms and Condition
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
            <Alert>Terms Not Found</Alert>
          ) : (
       
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Term</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                  {data?.map((i, index) => (
                    <tr>
                      <td> {i?.terms} </td>
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
