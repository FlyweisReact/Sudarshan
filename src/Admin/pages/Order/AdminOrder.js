/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Modal, Form, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminOrder = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState("");
  const [modalShow, setModalShow] = useState(false);
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
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/Orders",
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
    const [orderStatus, setOrderStatus] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const SubmitHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const response = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/order/changeOrderStatus/${id}`,
          { orderStatus },
          Auth
        );
        toast.success("Status Updated Successfully");
        setSubmitLoading(false);
        fetchData()
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
            Edit Order Status
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

          <Form onSubmit={SubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Select Status</Form.Label>
              <Form.Select onChange={(e) => setOrderStatus(e.target.value)}>
                <option> </option>
                <option value="Processing">Processing</option>
                <option value="QualityCheck">QualityCheck</option>
                <option value="Dispatch">Dispatch</option>
                <option value="Delivered">Delivered</option>
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
            All Orders ( Total : {total} )
          </span>
        </div>

        <section className="sectionCont">
        {loading ?   <Spinner animation="border" role="status" className="loadingSpin" /> :  data?.length === 0 || !data ? (
            <Alert>Order Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>OrderId</th>
                      <th>User</th>
                      <th>Product</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Phone Number</th>
                      <th>Payment Option</th>
                      <th>Order status</th>
                      <th>Payment Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td> {i.orderId} </td>
                        <td> {i.userId?.fullName} </td>
                        <td> {i.productId?.productName} </td>
                        <td> {i.unitInwords} </td>
                        <td> {i.productPrice} </td>
                        <td> {i.quantity} </td>
                        <td> {i.total} </td>
                        <td> {i.phone} </td>
                        <td> {i.paymentOption} </td>
                        <td> {i.orderStatus} </td>
                        <td> {i.paymentStatus} </td>
                        <td>
                          <span className="flexCont">
                            <Link to={`/admin/order/${i._id}`}>
                              <i className="fa-solid fa-eye" />
                            </Link>
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setId(i._id);
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

export default HOC(AdminOrder);
