import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <Routes>
              <Route path="/add" element={<AddProduct />} />
              <Route path="/add/:id" element={<AddProduct />} />{" "}
              {/* Yeni rota */}
              <Route path="/" element={<ProductList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Link
        to="/add"
        className="btn btn-primary"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        Add Product
      </Link>
      <ToastContainer />
    </Router>
  );
};

export default App;
