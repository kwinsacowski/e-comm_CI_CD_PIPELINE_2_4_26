import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import ProductCard from './ProductCard';
import { getProductsByCategory } from '../firebase/product';
import type { Product } from '../types/Product';
import coralImg from '../images/coral.jpg';

interface Props {
  category: string;
  title: string;
  description: string;
}

const CategoryPage: React.FC<Props> = ({ category, title, description }) => {
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: () => getProductsByCategory(category),
  });

  return (
    <div className="category-page">
      <NavBar />
      <header className="hero-section" style={{ backgroundImage: `url(${coralImg})` }}>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        <Link to="/shop">
          <Button style={{ backgroundColor: '#f3a488', borderColor: 'rgb(207, 207, 206)' }}>Back to Shop</Button>
        </Link>
      </header>

      <Container>
        {isLoading && <p>Loading products...</p>}
        {isError && <p>Error fetching products.</p>}

        <Row>
          {products?.map(product => (
            <Col key={product.id} md={6} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CategoryPage;
