/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Kyc = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
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
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/KycList",
        Auth
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

  function MyVerticallyCenteredModal(props) {
    const [kycStatus, setKycStatus] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const payload = { kycStatus, kycId: id };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/kyc/vendorKycVerification`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            KYC STATUS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errMsg === null || !errMsg ? (
            ""
          ) : (
            <div className="dangerBox">
              <Alert variant="danger"> {errMsg} </Alert>
              <i class="fa-solid fa-x" onClick={() => setErrMsg(null)}></i>
            </div>
          )}

          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Select Status</Form.Label>
              <Form.Select onChange={(e) => setKycStatus(e.target.value)}>
                <option> </option>
                <option value="UPLOADED">UPLOADED</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECT">REJECT</option>
              </Form.Select>
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              {submitLoading === true ? (
                <Spinner size="sm" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All KYC's ( Total : {total} )
          </span>
        </div>

        <section className="sectionCont">
          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : data?.length === 0 || !data ? (
            <Alert>KYC Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Vendor</th>
                      <th>Address Proof</th>
                      <th>DL</th>
                      <th>Passport</th>
                      <th>Social Security Card</th>
                      <th>Voter Identity Card</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td> {i?.vendorId?.fullName} </td>
                        <td>
                          <img
                            src={i?.addressProof}
                            alt="Aadhar Image"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <img
                            src={i?.dL}
                            alt="Pan Image"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <img
                            src={i?.passPort}
                            alt="GST Image"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <img
                            src={i?.socialSecurityCard}
                            alt="GST Image"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <img
                            src={i?.voterIdentityCard}
                            alt="GST Image"
                            style={{ width: "100px" }}
                          />
                        </td>

                        <td> {i?.kycStatus} </td>
                        <td>
                          <button
                            onClick={() => {
                              setId(i._id);
                              setModalShow(true);
                            }}
                            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                          >
                            Edit Status
                          </button>
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

export default HOC(Kyc);
