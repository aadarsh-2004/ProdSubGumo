import Navbar from "./components/Navbar";
import ScrollToTop from "../src/utils/scrollTop";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutDestination from "./components/AboutDestination";
import { Footer } from "./components/Footer";
import AboutUs from "./components/AboutUs";
import IForm from "./components/IForm";
import Destinations from "./components/Destinations";

function App() {
  return (
    <>
      <div>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/destination/:id"
              element={<AboutDestination />}
            ></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/IForm" element={<IForm />}></Route>
            <Route path="/destinations" element={<Destinations />}></Route>
          </Routes>

          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
