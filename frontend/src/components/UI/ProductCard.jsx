import React from 'react';
import '../../styles/product-card.css';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const { id, productName, imgUrl, price } = props.item;
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/food/${id}`);
  };

  return (
    <div className="product__item">
      <div className="product__sale">Hot</div>
      <div className="product__img">
        <Link to={`/food/${id}`}>
          <img src={imgUrl} alt="product-img" className="w-50" />
        </Link>
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/food/${id}`}>{productName}</Link>
        </h5>
        <div className="d-flex align-items-center justify-content-between">
          <span className="product__price">${price.toFixed()}</span>
          <button className="addToCart__btn" onClick={() => handleViewDetails()}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
