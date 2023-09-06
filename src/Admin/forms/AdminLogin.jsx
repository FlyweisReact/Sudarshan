/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { Baseurl } from "../../Baseurl";

const AdminLogin = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${Baseurl}api/v1/login`, {
        email,
        password,
      });
      const token = response.data.token;
      const user = response.data.user.name
      localStorage.setItem("name" , user)
      localStorage.setItem("token", token);
      setLoading(false);
      navigate("/admin/dashboard");
      toast.success("Welcome Admin");
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-col justify-center items-center "
        style={{ backgroundColor: "#0c0c0c" }}
      >
        <form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 ">
          <p style={{ fontSize: "2rem" }}> Admin Panel</p>
          <section className="py-2">
            {error ? (
              <div className="dangerBox">
                <Alert variant="danger">Check Your Credentials</Alert>
                <i class="fa-solid fa-x" onClick={() => setError(false)}></i>
              </div>
            ) : (
              ""
            )}

            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
              <input
                type="email"
                placeholder="Registered Email Address"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiOutlineMail className="text-xl " />
            </div>
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md mt-3">
              <input
                type={inputpass ? "text" : "password"}
                placeholder="Registered Password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full  "
              />

              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            <button
              type="submit"
              className="EcommerceAdminLogin"
              onClick={submitHandler}
            >
              {loading ? (
                <Spinner size="lg" animation="border" role="status" />
              ) : (
                "LOG IN"
              )}
            </button>
            <br />
          </section>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
