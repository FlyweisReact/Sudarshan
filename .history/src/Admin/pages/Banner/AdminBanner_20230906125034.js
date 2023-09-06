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
import { Baseurl } from "../../../Baseurl";

const AdminBanner = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState({});
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
      const response = await axios.get(`${Baseurl}api/v1/banner/all`);
      const data = response.data.data;
      setData(data);
      setTotal(data.length);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const deleteHandler = async (payload) => {
    try {
      const response = await axios.delete(
        `${Baseurl}api/v1/banner/delete/${payload}`,
        Auth
      );
      const msg = response.data.message
      toast.success(msg)
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [ image , setImage ] = useState(null)
    const [ name , setName ] = useState(null)
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const payload = { image , name}

 

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/banner/add`,
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
          Create Banner
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
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
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
        i?.name?.toLowerCase().includes(search?.toLowerCase())
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
            All Banner's ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Banner
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
              placeholder="Start typing to search for Banner"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : total === 0 ? (
            <Alert>No Banner Created Yet !</Alert>
          ) : !data ? (
            <Alert> Banner's Not Found </Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filterData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img src={i.image} alt="" style={{ width: "80px" }} />
                      </td>
                      <td>{i.name} </td>
               
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          />
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setEdit(true);
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
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(AdminBanner);
