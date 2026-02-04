// src/pages/MyOrders.tsx
import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Modal } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { getUserOrders, type Order } from "../firebase/order";

const MyOrders: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.uid);
        // sort newest first
        setOrders(data.sort((a, b) => b.createdAt - a.createdAt));
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      {/* NavBar always renders */}
      <NavBar />

      <Container className="mt-5">
        {!user ? (
          <p className="text-center mt-5">Please log in to see your orders.</p>
        ) : loading ? (
          <p className="text-center mt-5">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p>You have no previous orders.</p>
        ) : (
          <Row className="g-3 mt-3">
            {orders.map((order) => {
              const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);
              const date = new Date(order.createdAt).toLocaleString();

              return (
                <Col md={6} key={order.id}>
                  <Card className="p-3 shadow-sm">
                    <h5>Order ID: {order.id}</h5>
                    <p>Date: {date}</p>
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                    <Button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                    >
                      View Details
                    </Button>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        {/* Modal for order details */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <h5>Order ID: {selectedOrder.id}</h5>
                <p>Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <Row>
                  {selectedOrder.items.map((item) => (
                    <Col md={6} key={item.id} className="mb-3">
                      <Card className="p-2 h-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: "100%", height: "150px", objectFit: "contain" }}
                        />
                        <h6 className="mt-2">{item.title}</h6>
                        <p>
                          ${item.price.toFixed(2)} × {item.quantity} = $
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <h5 className="mt-3">Total Price: ${selectedOrder.totalPrice.toFixed(2)}</h5>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default MyOrders;
