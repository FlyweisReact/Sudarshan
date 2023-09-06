/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/admin/dashboard ",
      name: "Dashboard",
    },
    {
      icon: <i className="fa-solid fa-image text-xl mr-3 rounded-full " />,
      link: "/admin/banner ",
      name: "Banner",
    },
    {
      icon: <i className="fa-solid fa-folder text-xl mr-3 rounded-full " />,
      link: "/admin/sub-category ",
      name: "Sub-Category",
    },
    {
      icon: <i className="fa-solid fa-clipboard text-xl mr-3 rounded-full " />,
      link: "/admin/category ",
      name: "Category",
    },
    {
      icon: <i className="fa-solid fa-users  text-xl mr-3 rounded-full " />,
      link: "/vendor-list",
      name: "Vendor List",
    },
    {
      icon: <i className="fa-solid fa-user text-xl mr-3 rounded-full " />,
      link: "/user-list",
      name: "User List",
    },

    {
      icon: (
        <i className="fa-solid fa-cart-shopping text-xl mr-3 rounded-full " />
      ),
      link: "/admin/product ",
      name: "Product",
    },

    {
      icon: (
        <i className="fa-solid fa-bag-shopping text-xl mr-3 rounded-full " />
      ),
      link: "/admin/order",
      name: "Order",
    },
    {
      icon: (
        <i className="fa-solid fa-bag-shopping text-xl mr-3 rounded-full " />
      ),
      link: "/return-order",
      name: "Return Order",
    },
    {
      icon: <i className="fa-solid fa-money-bill text-xl mr-3 rounded-full " />,
      link: "/admin/transaction",
      name: "Transaction",
    },
    {
      icon: <i className="fa-solid fa-file text-xl mr-3 rounded-full " />,
      link: "/admin/kyc-list",
      name: "Kyc List",
    },
    {
      icon: <i className="fa-solid fa-file text-xl mr-3 rounded-full " />,
      link: "/admin/kyb",
      name: "Kyb List",
    },

    {
      icon: <i className="fa-solid fa-code text-xl mr-3 rounded-full " />,
      link: "/coupon",
      name: "Coupon",
    },
    {
      icon: <i className=" fa-solid fa-bell text-xl mr-3 rounded-full " />,
      link: "/notification",
      name: "Notification",
    },
    {
      icon: <i className=" fa-solid fa-ticket text-xl mr-3 rounded-full " />,
      link: "/admin/ticket",
      name: "Ticket",
    },
    {
      icon: <i className=" fa-solid fa-money-bill text-xl mr-3 rounded-full " />,
      link: "/admin/COD",
      name: "COD",
    },
  ];

  const logOut = () => {
    localStorage.clear();
    navigate("/admin-login");
    toast.success("Logged Out");
  };



  return (
    <>
      <aside
        className="p-4 h-auto"
        style={{ backgroundColor: "#0c0c0c", minHeight: "100vh" }}
      >
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>{" "}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[#fff]"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {" "}
            ADMIN PANEL
          </span>
        </figure>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link
                to={nav.link}
                key={nav.name}
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
                <span
                  className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
                  style={{ color: "#FFF" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
            style={{ color: "#FFF", textTransform: "uppercase" }}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
