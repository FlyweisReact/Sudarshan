/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const AdminProductVariant = () => {
  const { id, name } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(0);
  const [variantId, setVarientId] = useState("");

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/ProductVarient/list?productId=${id}`,
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/ProductVarient/delete/${id}`,
        Auth
      );
      const msg = data.message;
      toast.success(msg);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [size, setSize] = useState("");
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState([]);
    const [colorId, setColorId] = useState("");
    const [colors, setColors] = useState([]);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);

      const fd = new FormData();
      fd.append("productId", id);
      fd.append("colorId", colorId);
      Array.from(image).forEach((img) => {
        fd.append("image", img);
      });

      if (size === "false") {
        fd.append("size", size);
        fd.append("stock", stock);
      } else {
        fd.append("size", size);
      }

      try {
        const res = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/ProductColor/add",
          fd,
          Auth
        );
        const msg = res.data.message;
        toast.success(msg);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    const fetchColors = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/Color/list",
          Auth
        );
        setColors(res.data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchColors();
      }
    }, [props]);

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);

      const fd = new FormData();
      fd.append("colorId", colorId);
      Array.from(image).forEach((img) => {
        fd.append("image", img);
      });

      if (size === "false") {
        fd.append("size", size);
        fd.append("stock", stock);
      } else {
        fd.append("size", size);
      }

      try {
        const res = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/ProductColor/edit/${variantId}`,
          fd,
          Auth
        );
        const msg = res.data.message;
        toast.success(msg);
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
            {edit ? `Edit Varient ` : "Create New Variant "}
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
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => setImage(e.target.files)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Choose Color</Form.Label>
              <Form.Select
                required
                onChange={(e) => setColorId(e.target.value)}
              >
                <option></option>
                {colors?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {i.color}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Size Prefrence</Form.Label>
              <Form.Select required onChange={(e) => setSize(e.target.value)}>
                <option></option>
                <option value="true">Yes</option>
                <option value="false">No </option>
              </Form.Select>
            </Form.Group>

            {size === "false" ? (
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
            ) : (
              ""
            )}

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

      <section>
        <p className="headP">Dashboard / {name} Varients </p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All {name} Varients ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Create New
          </button>
        </div>

        <section className="sectionCont">
          {loading === true ? (
            <Alert>
              {" "}
              Fetching {name} Variant <Spinner animation="border" size="lg" />
            </Alert>
          ) : data?.length === 0 || !data ? (
            <Alert>Varient Not Listed Yet !</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNO.</th>
                      <th>Image</th>
                      <th>Color</th>
                      <th>Color code</th>
                      <th>Status</th>
                      <th>Color Units / Stock</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <img
                            src={i.productImages?.[0]?.image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />
                        </td>
                        <td>{i.color?.color}</td>
                        <td>{i.color?.colorCode}</td>

                        <td>{BadgeSelector(i.status)}</td>
                        <td>
                          {i.size === true ? (
                            <Link to={`/admin/indivisual-varient/${i._id}`}>
                              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
                                View
                              </button>
                            </Link>
                          ) : (
                            <Badge bg="success"> {i.stock} In Stock </Badge>
                          )}
                        </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            />
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setVarientId(i._id);
                                setEdit(true);
                                setModalShow(true);
                              }}
                            ></i>
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

export default HOC(AdminProductVariant);
