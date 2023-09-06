/** @format */

import HOC from "../../layout/HOC";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/dashboard"
      );
      setCount(response.data.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "All Product",
      number: count?.product,
      icon: (
        <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>
      ),
      bg: "#3c335d",
      link: "/admin/product",
    },
    {
      progress: "bg-green-400",
      title: "All Category",
      number: count?.category,
      icon: <i className="fa-solid fa-clipboard text-2xl text-[#023b5b]"></i>,
      bg: "#023b5b",
      link: "/admin/category",
    },
    {
      progress: "bg-green-400",
      title: "All Sub-Category",
      number: count?.subcategory,
      icon: <i className="fa-solid fa-folder text-2xl text-[#72909e]"></i>,
      bg: "#72909e",
      link: "/admin/sub-category",
    },
    {
      progress: "bg-green-400",
      title: "All User",
      number: count?.user,
      icon: <i className="fa-solid fa-user text-2xl text-[#2f6967]"></i>,
      bg: "#2f6967",
      link: "/user-list",
    },
    {
      progress: "bg-green-400",
      title: "All Vendor",
      number: count?.vendor,
      icon: <i className="fa-solid fa-circle-user text-2xl text-[#04649b]"></i>,
      bg: "#04649b",
      link: "/vendor-list",
    },
  ];
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status" className="loadingSpin" />
      ) : (
        <section className="HomeGrid">
          {card.map((card, index) => {
            return (
              <div
                className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
                key={index}
                style={{
                  backgroundColor: `${card.bg}`,
                  textTransform: "uppercase",
                }}
                onClick={() => navigate(`${card.link}`)}
              >
                <div className="grid  justify-between grid-cols-4">
                  <div className="flex flex-col col-span-3 space-y-1">
                    <span
                      className="tracking-widest text-gray-900"
                      style={{ color: "#fff" }}
                    >
                      {card.title}
                    </span>
                    <span
                      className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                      style={{ color: "#fff" }}
                    >
                      {card.number}
                    </span>
                  </div>
                  <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                    {card.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default HOC(AdminDashboard);
