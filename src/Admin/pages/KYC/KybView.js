/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

const KybView = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/getIdvendorKyb/${id}`,
        Auth
      );
      setData(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchData();
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
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            KYB
          </span>
        </div>

        <section className="sectionCont">
          <div className="img-cont">
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
            <img
              src={data?.certIncorIncumbency}
              alt=""
              className="centerImage"
            />
            <img src={data?.certIncorRegi} alt="" className="centerImage" />
            <img src={data?.evidence} alt="" className="centerImage" />
            <img
              src={data?.excerptStateCompanyRegi}
              alt=""
              className="centerImage"
            />
            <img src={data?.memorandum} alt="" className="centerImage" />
            <img
              src={data?.uboCertIncorIncumbency}
              alt=""
              className="centerImage"
            />
            <img
              src={data?.uboExcerptStateCompanyRegi}
              alt=""
              className="centerImage"
            />
            <img src={data?.uboMemorandum} alt="" className="centerImage" />
            <img
              src={data?.uboShareholderRegi}
              alt=""
              className="centerImage"
            />
            <img
              src={data?.uboStatOfInformation}
              alt=""
              className="centerImage"
            />
            <img src={data?.uboTrustAgreement} alt="" className="centerImage" />
          </div>

          <Form>
            {ValueChecker(data?.kybStatus, "KYB Status")}
            {ValueChecker(data?.numberEIN, "Number EIN")}
            {ValueChecker(data?.status, "Status")}
            {data?.usEIN ? (
              <Form.Group className="mb-3">
                <Form.Label>usEIN</Form.Label>
                <Form.Control
                  placeholder={data?.useEIN === true ? "Yes" : "False"}
                  disabled
                />
              </Form.Group>
            ) : (
              ""
            )}
            {data?.UBOs ? (
              <Form.Group className="mb-3">
                <Form.Label>UBOs</Form.Label>
                <Form.Control
                  placeholder={data?.UBOs === true ? "Yes" : "False"}
                  disabled
                />
              </Form.Group>
            ) : (
              ""
            )}
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(KybView);
