import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import ProductList from "../../components/ProductList/ProductList";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";
import { sliderImageHomePage } from "../../utils/images";
import BlogItem from "../Blog/BlogItem";
import { Col, Row } from "antd";
import NextMatch from "../../components/Match/NextMatch";
import LastResult from "../../components/Match/LastResult";
import { useNavigate } from "react-router-dom";
import NextMatchPoster from "../../components/Match/NextMatchPoster";
import { newsApi } from "../../api/news.api";
import banner1 from "./../../assets/images/baner1.jfif";
import home1 from "./../../assets/images/home1.png";
import sale3 from "./../../assets/images/sale3.jfif";
import { matchApi } from "../../api/match.api";
import { STATUS_MATCH } from "../../constants/common";
import moment from "moment";
import { dateFormat } from "../../utils/helpers";

const HomePage2 = () => {
  const navigate = useNavigate();
  const [nextmatch, setNextMatch] = useState(null);
  const [lastmatch, setLastMatch] = useState(null);

  const [listPost, setListPost] = useState([]);

  //   {
  //     img: "https://tse4.mm.bing.net/th?id=OIP.FkuIWzG7F-k-zmTDnITlDwHaEK&pid=Api&P=0&h=220",
  //     title: "Chelsea lên ngôi vô địch C1",
  //     date: "20 January, 2020",
  //     description: "",
  //   },
  //   {
  //     img: "https://tse4.mm.bing.net/th?id=OIP.CHyE-MloW5tIoL4VJczkSwHaEK&pid=Api&P=0&h=220",
  //     title: "MU thua 0-7",
  //     date: "20 January, 2020",
  //     description: "",
  //   },
  //   {
  //     img: "https://tse3.mm.bing.net/th?id=OIP.-bX8OA7F5kbWZsMd6KEioAAAAA&pid=Api&P=0&h=220",
  //     title: "Xoay compa",
  //     date: "20 January, 2020",
  //     description: "",
  //   },
  //   {
  //     img: "https://tse3.mm.bing.net/th?id=OIP.asdNdDiloSzHnaDCdbms1wHaEK&pid=Api&P=0&h=220",
  //     title: "Messi phản lưới 2 quả, Barca thua 2-8",
  //     date: "20 January, 2020",
  //     description: "",
  //   },
  //   {
  //     img: "https://tse4.mm.bing.net/th?id=OIP.WZdtYd5vsBSsQclkmU9ShAHaEK&pid=Api&P=0&h=220",
  //     title: "Người hùng chile",
  //     date: "20 January, 2020",
  //     description: "",
  //   },
  //   {
  //     img: "https://tse1.mm.bing.net/th?id=OIP.3JH4nmx0m9J_RkXtTa4FBgHaFO&pid=Api&P=0&h=220",
  //     title: "Cúp trong lòng người hâm mộ ",
  //     date: "20 January, 2020",
  //     description: "",
  //   },
  // ];
  const listPostter = [banner1, home1, banner1];
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  // GET LIST 4
  const getList4 = async () => {
    try {
      const res = await newsApi.getList4();
      if (res.data.status === 200) {
        setListPost(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList4();
    dispatch(fetchAsyncProducts(50));
  }, []);
  useEffect(() => {
    dispatch(
      fetchAsyncProducts({
        categoryName: "",
        maxPrice: "",
        minPrice: "",
        sortType: "",
        keyword: "",
      })
    );
  }, []);
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

  // renderListPost
  const renderListPost = listPost?.map((item) => (
    <Col span={12}>
      <BlogItem {...item} />
    </Col>
  ));
  const getListMatch = async () => {
    try {
      const res = await matchApi.getListmatch();
      if (res?.data?.status === 200) {
        const listMatch = res?.data?.data;
        console.log(listMatch);
        // setListMatch(res.data.data || []);
        const listByDate = listMatch.filter(
          (i) => i.statusMatch === STATUS_MATCH.PENDING
        );
        const listLast = listMatch.filter(
          (i) => i.statusMatch === STATUS_MATCH.END
        );
        if (listByDate.length > 0) {
          setNextMatch(listByDate[0]);
        }
        if (listLast.length > 0) {
          setLastMatch(listLast[0]);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListMatch();
  }, []);
  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider images={sliderImageHomePage} />
      </div>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <div className="title-md">
                    <h3>Bài viết nổi bật</h3>
                  </div>
                  <Row gutter={[16, 16]}>{renderListPost}</Row>
                </Col>
                <Col span={8}>
                  {nextmatch && (
                    <NextMatch
                      nameClub1={nextmatch.awayTeam}
                      nameClub2={nextmatch.homeTeam}
                      time={moment(nextmatch.dateTime).format("hh:mm")}
                      date={dateFormat(nextmatch.dateTime)}
                      tournamentName={nextmatch.name}
                      logo1={nextmatch.imageAwayTeam}
                      logo2={nextmatch.imageHomeTeam}
                    />
                  )}
                  {lastmatch && (
                    <LastResult
                      nameClub1={lastmatch.awayTeam}
                      nameClub2={lastmatch.homeTeam}
                      time={moment(lastmatch.dateTime).format("hh:mm")}
                      date={dateFormat(lastmatch.dateTime)}
                      tournamentName={lastmatch.name}
                      num1={lastmatch.awayScore}
                      num2={lastmatch.homeScore}
                    />
                  )}
                </Col>
              </Row>
              <div className="morepost">
                <button
                  onClick={() => navigate("/blog")}
                  className="buttonMore"
                >
                  Xem thêm bài viết
                  <ArrowRightOutlined style={{ marginLeft: 10 }} />
                </button>
              </div>
              <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                {listPostter?.map((src) => (
                  <Col span={8}>
                    <img
                      src={src}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 255,
                      }}
                    />
                  </Col>
                ))}
              </Row>
              <Row>
                {nextmatch && <NextMatchPoster
                   nameClub1={nextmatch.awayTeam}
                   nameClub2={nextmatch.homeTeam}
                   time={moment(nextmatch.dateTime).format("hh:mm")}
                   date={dateFormat(nextmatch.dateTime)}
                   tournamentName={nextmatch.name}
                   logo1={nextmatch.imageAwayTeam}
                   logo2={nextmatch.imageHomeTeam}
                   location={nextmatch.location}
                />}
              </Row>
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                    className="title-md"
                  >
                    <h3>Sản phẩm bán chạy</h3>
                  </div>
                </Col>
                <Col span={24}>
                  <ProductList products={products?.slice(0, 15)} />
                </Col>
              </Row>
              <div className="morepost">
                <button
                  onClick={() => navigate("/shop")}
                  className="buttonMore"
                >
                  Xem thêm sản phẩm
                  <ArrowRightOutlined style={{ marginLeft: 10 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage2;
