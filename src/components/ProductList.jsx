import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // useNavigate ekleyin
import edit from "../assets/images/edit.svg";
import dlete from "../assets/images/delete.svg";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // useNavigate kullanımı

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:3000/products/${id}`)
        .then(() => {
          setProducts(products.filter((product) => product.id !== id));
          toast.success("Product deleted successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete product");
        });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="ProductList">
      <h2>Products List ({products.length})</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search products"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.price ? product.price : "N/A"}</td>
              <td>{product.priceInSale ? product.priceInSale : "N/A"}</td>
              <td>
                <Button
                  className="mr-2 edit"
                  onClick={() => navigate(`/add/${product.id}`)} // navigate kullanımı
                >
                  <img src={edit} alt="" />
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  className="edit"
                >
                  <img src={dlete} alt="" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
