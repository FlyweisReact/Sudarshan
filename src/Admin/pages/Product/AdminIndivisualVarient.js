/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const AdminIndivisualVarient = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [modalShow, setModalShoe] = useState(false);
  const [edit, setEdit] = useState(false);
  const [colorVarientId, setColorVarientId] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const BaseUrl = "https://ecommerce-backend-ochre-phi.vercel.app/";

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/vendor/ProductVarient/view/${id}`
      );
      setData(response.data.data);
      setName(response.data.data.productId.productName);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
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

  function MyVerticallyCenteredModal(props) {
    const [unitId, setUnitId] = useState("");
    const [stock, setStock] = useState("");
    const [unitList, setUnitList] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const fetchUnit = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/QuantityUnit/list",
          Auth
        );
        setUnitList(res.data.data);
      } catch {}
    };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      const payload = { varientId: id, unitId, stock };
      try {
        const res = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/VarientInColor/add",
          payload,
          Auth
        );
        setSubmitLoading(false);
        props.onHide();
        const msg = res.data.message;
        toast.success(msg);
        getOrder();
      } catch (e) {
        setSubmitLoading(false);
        const msg = e.response.data.message;
        toast.error(msg);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      const payload = { colorVarientId, stock };
      try {
        const res = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/VarientInColor/edit/${id}`,
          payload,
          Auth
        );
        setSubmitLoading(false);
        props.onHide();
        const msg = res.data.message;
        toast.success(msg);
        getOrder();
      } catch (e) {
        setSubmitLoading(false);
        const msg = e.response.data.message;
        toast.error(msg);
      }
    };

    useEffect(() => {
      if (props.show) {
        fetchUnit();
      }
    }, []);

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Color Varient" : " Create New Color Unit"}
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
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setStock(e.target.value)}
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
                <Form.Label>Choose Unit</Form.Label>
                <Form.Select
                  onChange={(e) => setUnitId(e.target.value)}
                  required
                >
                  <option></option>
                  {unitList?.map((i, index) => (
                    <option key={index} value={i._id}>
                      {i.unit}{" "}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setStock(e.target.value)}
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
          )}
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (colorVarientId, unitId) => {
    try {
      const res = await axios.delete(
        `${BaseUrl}api/v1/vendor/VarientInColor/delete/${id}?colorVarientId=${colorVarientId}&unitId=${unitId}`,
        Auth
      );
      const msg = res.data.message;
      toast.success(msg);
      getOrder();
    } catch {}
  };

  const deleteImage = async (imageId) => {
    try {
      const res = await axios.delete(
        `${BaseUrl}api/v1/vendor/VarientInColor/deleteImage/${id}?imageId=${imageId}`,
        Auth
      );
      const msg = res.data.message;
      toast.success(msg);
      getOrder();
    } catch {}
  };

  function MyVerticallyCenteredModal2(props) {
    const [image, setImage] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const fd = new FormData();
    Array.from(image).forEach((img) => {
      fd.append("image", img);
    });

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const res = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/ProductVarient/uploadImage/${id}`,
          fd,
          Auth
        );
        setSubmitLoading(false);
        props.onHide();
        const msg = res.data.message;
        toast.success(msg);
        getOrder();
      } catch (e) {
        setSubmitLoading(false);
        const msg = e.response.data.message;
        toast.error(msg);
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
            Upload Images
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

          <Form onSubmit={putHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                required
                onChange={(e) => setImage(e.target.files)}
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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShoe(false)}
      />
      <MyVerticallyCenteredModal2
        show={imageModal}
        onHide={() => setImageModal(false)}
      />
      <section>
        {loading ? (
          <Spinner size="lg" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <p className="headP">Dashboard / {name}</p>
            <section className="sectionCont">
              <Form>
                <div className="pb-4  w-full flex justify-between items-center">
                  <span></span>
                  <button
                    className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                    type="button"
                    onClick={() => {
                      setImageModal(true);
                    }}
                  >
                    Upload Images
                  </button>
                </div>
                <div className="img-cont">
                  {data?.productImages?.map((i, index) => (
                    <div>
                      <img
                        src={i.image}
                        alt=""
                        className="centerImage"
                        key={index}
                      />
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteImage(i._id)}
                      />
                    </div>
                  ))}
                </div>

                {ValueChecker(data?.color?.color, "Color")}
                {ValueChecker(data?.color?.colorCode, "Color Code")}
                {ValueChecker(data?.status, "Status")}

                <div className="pb-4  mt-5  w-full flex justify-between items-center">
                  <span
                    className="tracking-widest text-slate-900 font-semibold uppercase"
                    style={{ fontSize: "20px" }}
                  >
                    All Color Unit's ( Total : {data?.colorsUnits?.length} )
                  </span>
                  <button
                    className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                    type="button"
                    onClick={() => {
                      setModalShoe(true);
                      setEdit(false);
                    }}
                  >
                    Create New
                  </button>
                </div>

                <div className="overFlowCont">
                  {data?.colorsUnits?.length === 0 || !data?.colorsUnits ? (
                    <Alert>No Unit Registerd Yet |</Alert>
                  ) : (
                    <Table>
                      <thead>
                        <tr>
                          <th>SNO.</th>
                          <th>Unit</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {data?.colorsUnits?.map((i, index) => (
                          <tr key={index}>
                            <td>#{index + 1} </td>
                            <td>{i.unitInwords}</td>
                            <td>{i.stock} </td>
                            <td>
                              {" "}
                              <Badge> {i.stockStatus} </Badge>{" "}
                            </td>
                            <td>
                              <span className="flexCont">
                                <i
                                  className="fa-solid fa-trash"
                                  onClick={() => deleteHandler(i._id, i.unitId)}
                                />
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  onClick={() => {
                                    setColorVarientId(i._id);
                                    setModalShoe(true);
                                    setEdit(true);
                                  }}
                                ></i>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>

                <Link to="/admin/product">
                  <Button variant="dark">Back</Button>
                </Link>
              </Form>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(AdminIndivisualVarient);
