import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';

import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/UI/ProductCard';
import ReactPaginate from 'react-paginate';

import '../styles/all-foods.css';
import '../styles/pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllFood } from '../store/foodSlice';

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { page, limit } = queryString.parse(location.search);
  const { allFood, isLoading } = useSelector((state) => state.foodList);

  useEffect(() => {
    navigate('/food?page=1&limit=3');
  }, [navigate]);

  useEffect(() => {
    dispatch(getAllFood({ sort: sortValue, page: Number(page), limit: Number(limit) }));
  }, [dispatch, sortValue, page, limit]);

  const searchedFood = allFood
    ? allFood.productList?.filter((item) => {
        if (searchTerm.valueOf === '') {
          return item;
        }
        if (item.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return item;
        } else {
          return null;
        }
      })
    : [];

  const handleSortClick = (e) => {
    if (e.target.value && e.target.value !== sortValue) {
      setSortValue(e.target.value);
    }
  };

  const changePage = ({ selected }) => {
    navigate(`/food?page=${selected + 1}&limit=${Number(limit)}`);
  };

  return (
    <Helmet title="All-Foods">
      <div className="content">
        <CommonSection title="All Foods" />
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6" xs="12">
                <div className="search__widget d-flex align-items-center">
                  <input
                    type="text"
                    placeholder="I'm looking for...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                <div className="sorting__widget text-end">
                  <select className="w-50" onClick={(e) => handleSortClick(e)}>
                    <option value="">Default</option>
                    <option value="productName,asc">Alphabetically, A-Z</option>
                    <option value="productName,desc">Alphabetically, Z-A</option>
                    <option value="price,asc">Low Price</option>
                    <option value="price,desc">High Price</option>
                  </select>
                </div>
              </Col>

              {isLoading ? (
                <span className="text-center fw-bold fs-4">Loading...!</span>
              ) : (
                searchedFood?.map((item) => (
                  <Col lg="3" md="4" sm="6" xs="12" key={item._id} className="mb-4">
                    <ProductCard item={item} />
                  </Col>
                ))
              )}

              <div>
                <ReactPaginate
                  pageCount={Math.ceil(allFood?.totalPage)}
                  onPageChange={changePage}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName=" paginationBttns "
                />
              </div>
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
};

export default AllFoods;
