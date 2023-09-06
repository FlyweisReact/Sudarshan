/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const COD = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
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
        `https://green-fyto.vercel.app/api/v1/privacy`
      );
      setData(data.privacy);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [cod, setCod] = useState(0);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [vendorId, setVendorId] = useState("");

    const fetchVendor = async () => {
      try {
        const response = await axios.get(`api/v1/admin/getAllVendor`);
        setVendors(response.data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show === true) {
        fetchVendor();
      }
    }, [props]);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      const payload = { vendorId, cod };
      try {
        const { data } = await axios.post(
          `api/v1/admin/addCodTovendor`,
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

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      const payload = { vendorId: id, cod };
      try {
        const { data } = await axios.put(
          `api/v1/admin/updateCodTovendor/${id}`,
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
            {" "}
            {edit ? `Edit COD ` : " Add COD"}
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
          {edit ? (
            <Form onSubmit={putHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  value={cod}
                  onChange={(e) => setCod(e.target.value)}
                />
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
          ) : (
            <Form onSubmit={postHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  value={cod}
                  onChange={(e) => setCod(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Vendor</Form.Label>
                <Form.Select onChange={(e) => setVendorId(e.target.value)}>
                  <option> Select Vendor </option>
                  {vendors?.map((i, index) => (
                    <option key={index} value={i._id}>
                      {" "}
                      {i.fullName}{" "}
                    </option>
                  ))}
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
          )}
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
            Privacy Policy
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Policy Policy
          </button>
        </div>

        <section className="sectionCont">
          {loading ? (
            <Spinner
              animation="border"
              role="status"
              style={{ display: "block", margin: "auto" }}
            ></Spinner>
          ) : total === 0 ? (
            <Alert>No Privacy Created Yet !</Alert>
          ) : !data ? (
            <Alert> Privacy's Not Found </Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Privacy</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td> {data?.privacy} </td>
                    <td>
                      <span className="flexCont">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(COD);
