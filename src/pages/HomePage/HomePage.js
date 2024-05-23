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
import { getQueryParams, objectToQueryParams, queryParamsToObject } from "../../utils/helpers";
import { useLocation } from "react-router";
import ProductFilter from "../../components/ProductList/FilterProduct";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const {search,categoryName,maxPrice,minPrice,sortType} = getQueryParams();
 const location = useLocation()
 const navigate = useNavigate()
 const [filter,setFillter] = useState({
  categoryName:categoryName ||"",
  maxPrice:maxPrice || "",
  minPrice:minPrice || "",
  sortType:sortType || ""
 })
  const categories = useSelector(getAllCategories);
  const getListProductByFilter = (filter) => {
    const obj = queryParamsToObject(location.search)
    const queryString = objectToQueryParams({...obj,...filter})
    navigate(location.pathname +"?"  +  queryString,{
      replace:true
    })
    dispatch(fetchAsyncProducts({...filter,keyword:search ||""}));
  }
  const getListProductByFilter1 = (filter) => {
    const queryString = objectToQueryParams({...filter})

    dispatch(fetchAsyncProducts({...filter,keyword:search ||""}));

  }
  useEffect(() => {
    getListProductByFilter1(filter)
  }, [location.search]);
  const products = useSelector(getAllProducts)?.filter(i => i.status);
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
