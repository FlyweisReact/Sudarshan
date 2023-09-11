/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./Admin/forms/AdminLogin";
import AdminDashboard from "./Admin/pages/Dashboard/AdminDashboard";
import AdminBanner from "./Admin/pages/Banner/AdminBanner";
import AdminSubCategory from "./Admin/pages/subcategory/AdminSubCategory";
import AdminCategory from "./Admin/pages/category/AdminCategory";
import AdminProduct from "./Admin/pages/Product/AdminProduct";
import AdminSingleProduct from "./Admin/pages/Product/AdminSingleProduct";
import AdminOrder from "./Admin/pages/Order/AdminOrder";
import AdminViewOrder from "./Admin/pages/Order/AdminViewOrder";
import Transaction from "./Admin/pages/Transaction/Transaction";
import Kyc from "./Admin/pages/KYC/Kyc";
import User from "./Admin/pages/User/User";
import Vendor from "./Admin/pages/Vendor/Vendor";
import Coupon from "./Admin/pages/Coupon/Coupon";
import Notification from "./Admin/pages/Notification/Notification";
import Kyb from "./Admin/pages/KYC/Kyb";
import KybView from "./Admin/pages/KYC/KybView";
import ReturnOrder from "./Admin/pages/Order/ReturnOrder";
import Ticket from "./Admin/pages/Ticket/Ticket";
import COD from "./Admin/pages/COD/COD";
import AdminCreateProduct from "./Admin/pages/Product/AdminCreateProduct";

function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/banner" element={<AdminBanner />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/user-list" element={<User />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/create-product" element={<AdminCreateProduct />} />
        <Route path="/admin/sub-category" element={<AdminSubCategory />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/vendor-list" element={<Vendor />} />
        <Route path="/admin/product/:id" element={<AdminSingleProduct />} />
        <Route path="/admin/order" element={<AdminOrder />} />
        <Route path="/admin/order/:id" element={<AdminViewOrder />} />
        <Route path="/admin/transaction" element={<Transaction />} />
        <Route path="/admin/kyc-list" element={<Kyc />} />
        <Route path="/admin/kyb" element={<Kyb />} />
      

        <Route path="/kyb-view/:id" element={<KybView />} />
        <Route path="/return-order" element={<ReturnOrder />} />
        <Route path="/admin/ticket" element={<Ticket />} />
        <Route path="/admin/COD" element={<COD />} />
      </Routes>
    </>
  );
}

export default App;
