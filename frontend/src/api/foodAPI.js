import axios from 'axios';

const getAllFood = async ({ ...option }) => {
  let res;
  if (option?.category === 'ALL') {
    res = await axios.get('http://localhost:8081/api/v1/products');
  }

  if (
    option?.category === 'BREAD' ||
    option?.category === 'BURGER' ||
    option?.category === 'PIZZA'
  ) {
    res = await axios.get(
      `http://localhost:8081/api/v1/products?category=${option?.category?.toLowerCase()}`
    );
  }

  if (option?.page && option?.limit) {
    if (option?.sort) {
      res = await axios.get(
        `http://localhost:8081/api/v1/products?sort=${option?.sort}&page=${option?.page}&limit=${option?.limit}`
      );
    } else {
      res = await axios.get(
        `http://localhost:8081/api/v1/products?page=${option?.page}&limit=${option?.limit}`
      );
    }
  }

  return res.data.data;
};

const getAllFoodSale = async () => {
  const { data } = await axios.get(
    'http://localhost:8081/api/v1/products?page=1&limit=4&sort=price,asc'
  );

  return data.data;
};

const getFood = async (foodId) => {
  const { data } = await axios.get(`http://localhost:8081/api/v1/products/${foodId}`);

  return data.data;
};

const foodAPI = {
  getAllFood,
  getAllFoodSale,
  getFood,
};

export default foodAPI;
