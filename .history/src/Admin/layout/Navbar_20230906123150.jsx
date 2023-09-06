/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { RiMenu4Line } from "react-icons/ri";

const Navbar = ({ hamb, setHamb }) => {
  const Name = localStorage.getItem('name')

  return (
    <>
      <div
        className={
          hamb
            ? "flex  w-full justify-between  my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-slate-200 space-x-4"
            : "flex  w-full justify-between my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-slate-200 space-x-4"
        }
        style={{ backgroundColor: "#0c0c0c" }}
      >
        <RiMenu4Line
          onClick={() => setHamb(!hamb)}
          className="text-2xl font-bold text-gray-900 hover:scale-90 cursor-pointer"
          style={{ color: "#fff" }}
        />

        <section className="flex sm:ml-auto justify-end sm:w-full items-center space-x-2  pr-2">
          <figcaption className="tracking-wider pl-1 font-semibold">
            <div
              className="lg:text-base text-sm text-gray-900  uppercase"
              style={{ color: "#fff" }}
            >
              Welcome {use}
            </div>
          </figcaption>
        </section>
      </div>
    </>
  );
};

export default Navbar;
