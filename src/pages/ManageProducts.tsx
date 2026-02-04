import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import NavBar from "../components/NavBar";
import type { Product } from "../types/Product";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../firebase/product";

const ManageProducts: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // Mutations (kept exactly as you provided)
  const addMutation = useMutation<string, Error, Omit<Product, "id">>({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateMutation = useMutation<void, Error, Product>({
    mutationFn: ({ id, ...data }) => updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: { rate: 0, count: 0 },
    });
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({ id: editingProduct.id, ...formData });
      } else {
        await addMutation.mutateAsync(formData);
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p className="text-center mt-5">Loading products...</p>;
  if (isError) return <p className="text-center mt-5 text-danger">Error fetching products.</p>;

  return (
    <div className="manage-products-page">
      <NavBar />
  
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "#f87947" }}>Manage Products</h2>
          <Button onClick={openAddModal}>Add Product</Button>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {products?.map((product) => (
            <Col key={product.id}>
              <div
                className="card p-3 shadow-sm h-100"
                style={{ backgroundColor: "rgba(252, 177, 148, 0.3)", borderRadius: "12px" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxHeight:'200px', objectFit:'contain', borderRadius: "8px" }}
                />
                <h5 className="mt-3">{product.title}</h5>
                <p className="mb-1">${product.price.toFixed(2)}</p>
                <p className="text-truncate" style={{ maxHeight: "3rem" }}>
                  {product.description}
                </p>
                <p className="mb-2"><strong>Category:</strong> {product.category}</p>

                <div className="d-flex gap-2">
                  <Button size="sm" onClick={() => openEditModal(product)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteMutation.mutate(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{editingProduct ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageProducts;
