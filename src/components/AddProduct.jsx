import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom"; // useParams ve useNavigate ekleyin

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    code: "",
    brand: "",
    price: 0,
    priceInSale: 0,
    description: "",
  });
  const { id } = useParams(); // useParams kullanımı
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to fetch product details");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update existing product
      axios
        .put(`http://localhost:5000/products/${id}`, product)
        .then(() => {
          toast.success("Product updated successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to update product");
        });
    } else {
      // Add new product
      axios
        .post("http://localhost:5000/products", product)
        .then(() => {
          toast.success("Product added successfully");
          setProduct({
            name: "",
            code: "",
            brand: "",
            price: 0,
            priceInSale: 0,
            description: "",
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to add product");
        });
    }
  };

  return (
    <div className="Add-Product">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={product.code}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sale Price</Form.Label>
          <Form.Control
            type="number"
            name="priceInSale"
            value={product.priceInSale}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-5">
          {id ? "Update Product" : "+ Add Product"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/")}
          className="mx-2 my-5"
        >
          All Products
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
