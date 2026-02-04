import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import type { Product } from '../types/Product';

const placeholderImg =
  'https://via.placeholder.com/250x150.png?text=No+Image';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card className="product-card h-100 shadow-sm d-flex flex-column">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholderImg;
        }}
        className="product-image"
      />

      <Card.Body className="d-flex flex-column flex-grow-1">
        <Card.Title className="text-center">{product.title}</Card.Title>

        <Card.Text className="text-center mb-2 price-text">
          ${product.price.toFixed(2)}
        </Card.Text>

        <Card.Text className="category-text">
          <strong>Category:</strong> {product.category}
        </Card.Text>

        <Card.Text className="description-text flex-grow-1">
          {product.description}
        </Card.Text>

        <div className="text-center mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              color={
                i < Math.round(product.rating.rate) ? '#e9bb87' : '#ccc'
              }
            />
          ))}
        </div>

        <Button
          style={{
            backgroundColor: '#f3a488',
            borderColor: 'rgb(207, 207, 206)',
          }}
          onClick={() => dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
          }))}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
