/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Alert,
  Modal,
  Button,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const AdminColors = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = "https://ecommerce-backend-ochre-phi.vercel.app";

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${Baseurl}/api/v1/vendor/Color/list`,
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
    const [color, setColor] = useState("");
    const [colorCode, setColorCode] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const payload = { colorCode, color };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          `${Baseurl}/api/v1/vendor/Color/add`,
          payload ,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        setSubmitLoading(false);
        const msg = e.response.data.message;
        setErrMsg(msg);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/Color/edit/${id}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        setSubmitLoading(false);
        const msg = e.response.data.message;
        setErrMsg(msg);
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
            {edit ? `Edit Color` : "Create New"}
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

          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Color Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color Code</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setColorCode(e.target.value)}
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
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (ide) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}/api/v1/vendor/Color/delete/${ide}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  function BadgeSelector(status) {
    if (status === "ACTIVE") {
      return <Badge bg="success">Active</Badge>;
    } else {
      <Badge bg="info">Non Active</Badge>;
    }
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <p className="headP">Dashboard / Colors</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Colors ( Total : {total} )
        </span>
        <div className="d-flex gap-1">
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            onClick={() => setModalShow(true)}
          >
            Create New
          </button>
        </div>
      </div>

      <section className="sectionCont">
        {loading ? (
          <Alert>
            Loagin please wait{" "}
            <Spinner size="lg" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Alert>
        ) : data?.length === 0 || !data ? (
          <Alert>No Unit Create Yet | </Alert>
        ) : (
          <>
            <div className="overFlowCont">
              {data?.docs?.length === 0 || !data ? (
                <Alert>No Product Found</Alert>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Color</th>
                      <th> Colorcode</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td>{i.color}</td>
                        <td>{i.colorCode}</td>
                        <td> {BadgeSelector(i.status)} </td>
                        <td> {i.createdAt?.slice(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setId(i._id);
                                setEdit(true);
                                setModalShow(true);
                              }}
                            />

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
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(AdminColors);
