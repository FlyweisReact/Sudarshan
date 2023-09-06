/** @format */

import React, {  useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Notification = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [ loading , setLoading ] = useState(false)

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/notification/allNotification",
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [_id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [productId, setProductId] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/getAllUser"
        );
        setUsers(res.data.data);
      } catch {}
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/Product/list?page=1&limit=10&search=&toDate=null&fromDate=null&categoryId=&subcategoryId="
        );
        setProducts(res.data.data.docs);
      } catch {}
    };

    const sendTo = "USER";
    const total = "ALL";

    const payload = { sendTo, total, _id, title, productId, date };

    useEffect(() => {
      if (props.show === true) {
        fetchUser();
        fetchProducts();
      }
    }, []);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/notification/sendNotification",
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
            Create Notification
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
            <Form.Select
              className="mb-3"
              onChange={(e) => setId(e.target.value)}
            >
              <option>Select User</option>
              {users?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.fullName}{" "}
                </option>
              ))}
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              className="mb-3"
              onChange={(e) => setProductId(e.target.value)}
            >
              <option>Select Product</option>
              {products?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.productName}{" "}
                </option>
              ))}
            </Form.Select>

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

  const filterData = !search
    ? data
    : data?.filter((i) =>
        i?.title?.toLowerCase().includes(search?.toLowerCase())
      );

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
            All Notification's ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Notification
          </button>
        </div>

        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Notification"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

            {
              loading ? <Spinner animation="border" role="status" className="loadingSpin" /> : 
           data?.length === 0 || !data ? (
            <Alert>Notification Not Found</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>User</th>
                    <th> Product </th>
                    <th> Title </th>
                    <th> Date </th>
                  </tr>
                </thead>

                <tbody>
                  {filterData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>{i.userId?.fullName}</td>
                      <td>{i.productId?.productName}</td>
                      <td> {i.title} </td>
                      <td> {i.date} </td>
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

export default HOC(Notification);
