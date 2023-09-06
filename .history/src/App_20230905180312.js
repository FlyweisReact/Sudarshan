/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Vendor Panel
import Login from "./Vendor/forms/Login";
import Dashboard from "./Vendor/pages/Dashboard/Dashboard";
import Product from "./Vendor/pages/Product/Product";
import CreateProduct from "./Vendor/pages/Product/CreateProduct";
import SingleProduct from "./Vendor/pages/Product/SingleProduct";
import EditProduct from "./Vendor/pages/Product/EditProduct";
import ProductVariant from "./Vendor/pages/Product/ProductVariant";
import IndivisualVarient from "./Vendor/pages/Product/IndivisualVarient";
import Unit from "./Vendor/pages/unit/Unit";
import Category from "./Vendor/pages/category/Category";
import SubCategory from "./Vendor/pages/subcategory/SubCategory";
import Colors from "./Vendor/pages/colors/Colors";
// ---------------------

// Admin Panel
import AdminLogin from "./Admin/forms/AdminLogin";
import Order from "./Vendor/pages/Order/Order";
import ViewOrder from "./Vendor/pages/Order/ViewOrder";
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
import VendorKyc from "./Vendor/pages/KYC/VendorKyc";
import User from "./Admin/pages/User/User";
import Vendor from "./Admin/pages/Vendor/Vendor";
import Coupon from "./Admin/pages/Coupon/Coupon";
import Notification from "./Admin/pages/Notification/Notification";
import VendorKyb from "./Vendor/pages/KYC/VendorKyb";
import Kyb from "./Admin/pages/KYC/Kyb";
import KybView from "./Admin/pages/KYC/KybView";
import ReturnOrder from "./Admin/pages/Order/ReturnOrder";
import Ticket from "./Admin/pages/Ticket/Ticket";
import COD from "./Admin/pages/COD/COD";
import VReturnOrder from "./Vendor/pages/Order/VReturnOrder";
// ----------------
function App() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/SubCategory" element={<SubCategory />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/vendor/unit/list" element={<Unit />} />
        <Route path="/product-variant/:id/:name" element={<ProductVariant />} />
        <Route path="/indivisual-varient/:id" element={<IndivisualVarient />} />
        <Route path="/vendor/colors" element={<Colors />} />
        <Route path="/vendor-order" element={<Order />} />
        <Route path="/vendor/order/:id" element={<ViewOrder />} />
        <Route path="/vendor/return-order" element={<VReturnOrder />} />

        <Route path="/vendor/kyc" element={<VendorKyc />} />
        <Route path="/vendor/kyb" element={<VendorKyb />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/banner" element={<AdminBanner />} />
        <Route path="/admin/sub-category" element={<AdminSubCategory />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/vendor-list" element={<Vendor />} />
        <Route path="/user-list" element={<User />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/product/:id" element={<AdminSingleProduct />} />
        <Route path="/admin/order" element={<AdminOrder />} />
        <Route path="/admin/order/:id" element={<AdminViewOrder />} />
        <Route path="/admin/transaction" element={<Transaction />} />
        <Route path="/admin/kyc-list" element={<Kyc />} />
        <Route path="/admin/kyb" element={<Kyb />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/kyb-view/:id" element={<KybView />} />
        <Route path="/return-order" element={<ReturnOrder />} />
        <Route path="/admin/ticket" element={<Ticket />} />
        <Route path="/admin/COD" element={<COD />} />
      </Routes>
    </>
  );
}

export default App;
