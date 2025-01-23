import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import SignUp from "./page/SignUp";
import { ToastContainer } from "react-toastify";
import SignIn from "./page/SignIn";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer theme="dark" />
      </Provider>
    </>
  );
}

export default App;
