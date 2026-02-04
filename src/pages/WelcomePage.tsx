import React from 'react';
import NavBar from '../components/NavBar';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import coralImg from '../images/coral.jpg';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getAllProducts } from '../firebase/product';
import type { Product } from '../types/Product';


const WelcomePage: React.FC = () => {
  const { data: products, isLoading, isError } = useQuery<Product[]>({
  queryKey: ['products'],
  queryFn: getAllProducts,
});

const dispatch = useDispatch();

const handleAddToCart = (product: Product) => {
  dispatch(
    addToCart({
      id: String(product.id),
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  );
};

  const placeholderImg = 'https://via.placeholder.com/250x150.png?text=No+Image';

  return (
    <div className="welcome-page">
      <NavBar />

      {/* Hero Section */}
      <header
        className="hero-section"
        style={{
          backgroundImage: `url(${coralImg})`,
        }}
      >
        <h1>Welcome to Brivana!</h1>
        <p className="lead">Your one-stop destination for soft luxurious fashion.</p>
        <Link to="/shop">
          <Button style={{ backgroundColor: '#f3a488', borderColor: 'rgb(207, 207, 206)' }} className="mt-3">Shop By Category</Button>
        </Link>
      </header>

      {/* Products Section */}
      <section className="products-section">
        <Container>
          <h2 className="text-center mb-4">Product List</h2>

          {isLoading && <p className="text-center text-white">Loading products...</p>}
          {isError && <p className="text-center text-danger">Error fetching products.</p>}

          <Row>
            {products?.map((product) => (
              <Col key={product.id} md={6} className="mb-4">
                <Card className="product-card h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImg;
                    }}
                    className="product-image"
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center">{product.title}</Card.Title>
                    <Card.Text className="text-center mb-2 price-text">
                      ${product.price.toFixed(2)}
                    </Card.Text>
                    <Card.Text className="category-text">
                      <strong>Category:</strong> {product.category}
                    </Card.Text>
                    <Card.Text className="description-text">{product.description}</Card.Text>

                    {/* Rating */}
                    <div className="text-center mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          color={i < Math.round(product.rating.rate) ? '#e9bb87' : '#ccc'}
                        />
                      ))}
                    </div>

                    <Button
                      style={{ backgroundColor: '#f3a488', borderColor: 'rgb(207, 207, 206)' }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Brivana. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
