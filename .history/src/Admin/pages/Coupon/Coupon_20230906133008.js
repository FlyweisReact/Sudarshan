/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl } from "../../../Baseurl";

const Coupon = () => {
  const [modalShow, setModalShow] = useState(false);
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
      const { data } = await axios.get(`${Baseurl}api/v1/coupon/all`);
      setData(data.coupons);
      setTotal(data.coupons.length);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/Coupan/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [couponCode, setCouponCode] = useState(null);
    const [activationDate, setActivationDate] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [minOrder, setMinOrder] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    
    const today = new Date()

    console.log(today.getFullYear())
    console.log(today.getMonth() + 1)
    console.log(today.getDate())

    const TodayDate = {`${today.getFullYear()} + '-` + }

    const payload = {
      couponCode,
      activationDate,
      expirationDate,
      discount,
      minOrder,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/coupon`,
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
            Create Coupon
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
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Min Order</Form.Label>
              <Form.Control
                type="number"
                min={0}
                required
                onChange={(e) => setMinOrder(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setActivationDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                required
                min={activationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
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

  const filterData = !search
    ? data
    : data?.filter((i) =>
        i?.couponCode?.toLowerCase().includes(search?.toLowerCase())
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
            All Coupon's ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Coupon
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
              placeholder="Start typing to search for Coupon"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : data?.length === 0 || !data ? (
            <Alert>Coupon Not Found</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Coupon Code</th>
                    <th> Discount </th>
                    <th> Min Order </th>
                    <th> Expiration Date</th>
                    <th> Activation Date</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filterData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>{i.couponCode}</td>
                      <td>{i.discount}%</td>
                      <td>
                        {" "}
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        {i.minOrder}
                      </td>
                      <td>{i.expirationDate?.slice(0, 10)}</td>
                      <td>{i.activationDate?.slice(0, 10)}</td>
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
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Coupon);
