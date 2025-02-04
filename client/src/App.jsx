import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import SignUp from "./page/SignUp";
import { ToastContainer } from "react-toastify";
import SignIn from "./page/SignIn";
import Dashboard from "./page/Dashboard";
import About from "./page/About";
import ContactUs from "./page/ContactUs";
import CreateIncome from "./components/CreateIncome";
import PrivateRoute from "./components/PrivateRoute";
import Income from "./components/Income";
import AllIncomes from "./components/AllIncomes";
import AddPlan from "./components/AddPlan";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-income" element={<CreateIncome />} />
            <Route path="/income/:incomeId" element={<Income />} />
            <Route path="/my-incomes/:userId" element={<AllIncomes />} />
            <Route path="/add-plan/:incomeId" element={<AddPlan />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
