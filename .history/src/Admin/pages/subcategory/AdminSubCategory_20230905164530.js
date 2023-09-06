/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AdminSubCategory = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const FinalFromDate =
    fromDate === null || fromDate?.length < 5
      ? null
      : `${fromDate}T00:00:00.000Z`;
  const FinalToDate =
    toDate === null || fromDate.length < 5 ? null : `${toDate}T23:59:59.000Z`;

  let pag = [];
  for (let i = 0; i < pages; i++) {
    pag.push(i);
  }

  function Prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function Next() {
    if (page === pag?.length) {
    } else {
      setPage(page + 1);
    }
  }

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
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/SubCategory/paginate/SubCategoriesSearch?page=${page}&limit=${limit}&search=${search}&toDate=${FinalToDate}&fromDate=${FinalFromDate}`
      );
      setData(data.data.docs);
      setTotal(data.data.total);
      setPages(data.data.pages);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [page, limit, search, FinalFromDate, FinalToDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (modalShow === false) {
      setEditData(null);
    }
  }, [modalShow]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/SubCategory/deleteSubcategory/${id}`,
        Auth
      );
      toast.success("Deleted Successfully");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState(editData?.name);
    const [categoryId, setCategoryId] = useState(editData?.categoryId?._id);
    const [image, setImage] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [categoryArr, setCategoryArr] = useState([]);
    const fd = new FormData();
    fd.append("name", name);
    fd.append("categoryId", categoryId);
    fd.append("image", image);

    const fetchCat = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/Category/allCategory"
        );
        setCategoryArr(res.data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show === true) {
        fetchCat();
      }
    }, []);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/SubCategory/addSubcategory",
          fd,
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
      try {
        const { data } = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/SubCategory/updateSubcategory/${id}`,
          fd,
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
            {edit ? `Edit ${name}` : " Add Sub-Category"}
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
                required={edit ? false : true}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Choose Category </Form.Label>
              <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
                <option>
                  {" "}
                  {editData?.categoryId?.name
                    ? `   Previous Selected ${editData?.categoryId?.name}`
                    : ""}
                </option>
                {categoryArr?.map((i, index) => (
                  <option value={i._id} key={index}>
                    {" "}
                    {i.name}{" "}
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
      <div
        className="pb-4   w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Sub-Category's ( Total : {total} )
        </span>
        <button
          onClick={() => {
            setEdit(false);
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
        >
          Add Sub-Category
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
            placeholder="Start typing to search for Sub-Category"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="searchByDate">
          <div>
            <label>Starting Date : </label>
            <input type="date" onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div>
            <label>Ending Date : </label>
            <input
              type="date"
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
            />
          </div>
        </div>

        <div className="searchByDate">
          <div>
            <label>Showing : </label>
            <select onChange={(e) => setLimit(e.target.value)}>
              <option>
                {" "}
                Showing {data?.length} out of {total}{" "}
              </option>
              <option value={total}> All </option>
              <option value={10}> 10 </option>
              <option value={20}> 20 </option>
              <option value={50}> 50 </option>
              <option value={100}> 100 </option>
            </select>
          </div>
        </div>

        {loading ? (
          <Spinner animation="border" role="status" className="loadingSpin" />
        ) : data?.length === 0 || !data ? (
          <Alert>Categories Not Found</Alert>
        ) : (
          <>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Parent Category</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img
                          src={i.image}
                          alt=""
                          style={{ maxWidth: "80px" }}
                        />
                      </td>
                      <td>{i.name}</td>
                      <td>{i.categoryId?.name} </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          />
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setEditData(i);
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

            <div className="pagination">
              <button onClick={() => Prev()} className="prevBtn">
                <i className="fa-solid fa-backward"></i>
              </button>

              {page === 1 ? (
                ""
              ) : (
                <button onClick={() => setPage(1)} className="prevBtn">
                  1
                </button>
              )}

              <button className="activePage">{page}</button>
              {page === pag?.length ? (
                ""
              ) : (
                <button onClick={() => setPage(pag?.length)}>
                  {pag?.length}
                </button>
              )}
              {page === pag?.length ? (
                ""
              ) : (
                <button onClick={() => Next()} className="nextBtn">
                  {" "}
                  <i className="fa-sharp fa-solid fa-forward"></i>
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(AdminSubCategory);
