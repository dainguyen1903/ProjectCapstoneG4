import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import ProductList from "../../components/ProductList/ProductList";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";
import { sliderImgs } from "../../utils/images";
import { getQueryParams } from "../../utils/helpers";
import { useLocation } from "react-router";
import ProductFilter from "../../components/ProductList/FilterProduct";

const HomePage = () => {
  const dispatch = useDispatch();
  const {search} = getQueryParams();
 const location = useLocation()
 const [filter,setFillter] = useState({
  categoryName:"",
  categoryName:"",
  maxPrice:"",
  minPrice:"",
  sortType:""
 })
  const categories = useSelector(getAllCategories);
  const getListProductByFilter = (filter) => {
    dispatch(fetchAsyncProducts({...filter,keyword:search ||""}));
  }
  useEffect(() => {
    getListProductByFilter()
  }, [location.search]);
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  // randomizing the products in the list
  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider images={sliderImgs} />
      </div>
      <div className="main-content container bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>Tất cả sản phẩm</h3>
              </div>
              <ProductFilter filter={filter} setFillter={setFillter} onFilter={getListProductByFilter}  />
              {productStatus === STATUS.LOADING && products.length==0 ? (
                <Loader />
              ) : (
                <ProductList products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
