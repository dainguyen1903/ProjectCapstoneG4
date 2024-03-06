import React, { useEffect } from "react";
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
import { sliderImageHomePage } from "../../utils/images";
import BlogItem from "../Blog/BlogItem";
import { Col, Row } from "antd";
import NextMatch from "../../components/Match/NextMatch";
import LastResult from "../../components/Match/LastResult";

const HomePage2 = () => {
    const listPost = [
        {
            img: "https://tse4.mm.bing.net/th?id=OIP.FkuIWzG7F-k-zmTDnITlDwHaEK&pid=Api&P=0&h=220",
            title: "Chelsea lên ngôi vô địch C1",
            date: "20 January, 2020",
            description: "",
        },
        {
            img: "https://tse4.mm.bing.net/th?id=OIP.CHyE-MloW5tIoL4VJczkSwHaEK&pid=Api&P=0&h=220",
            title: "MU thua 0-7",
            date: "20 January, 2020",
            description: "",
        },
        {
            img: "https://tse3.mm.bing.net/th?id=OIP.-bX8OA7F5kbWZsMd6KEioAAAAA&pid=Api&P=0&h=220",
            title: "Xoay compa",
            date: "20 January, 2020",
            description: "",
        },
        {
            img: "https://tse3.mm.bing.net/th?id=OIP.asdNdDiloSzHnaDCdbms1wHaEK&pid=Api&P=0&h=220",
            title: "Messi phản lưới 2 quả, Barca thua 2-8",
            date: "20 January, 2020",
            description: "",
        },
        {
            img: "https://tse4.mm.bing.net/th?id=OIP.WZdtYd5vsBSsQclkmU9ShAHaEK&pid=Api&P=0&h=220",
            title: "Người hùng chile",
            date: "20 January, 2020",
            description: "",
        },
        {
            img: "https://tse1.mm.bing.net/th?id=OIP.3JH4nmx0m9J_RkXtTa4FBgHaFO&pid=Api&P=0&h=220",
            title: "Cúp trong lòng người hâm mộ ",
            date: "20 January, 2020",
            description: "",
        },
    ];
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);

    useEffect(() => {
        dispatch(fetchAsyncProducts(50));
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

    let catProductsOne = products.filter(
        (product) => product.category === categories[0]
    );
    let catProductsTwo = products.filter(
        (product) => product.category === categories[1]
    );
    let catProductsThree = products.filter(
        (product) => product.category === categories[2]
    );
    let catProductsFour = products.filter(
        (product) => product.category === categories[3]
    );

    // renderListPost
    const renderListPost = listPost.map((item) => (
        <Col span={8}>
            <BlogItem {...item} />
        </Col>
    ));
    return (
        <main>
            <div className="slider-wrapper">
                <HeaderSlider images={sliderImageHomePage} />
            </div>
            <div className="main-content bg-whitesmoke">
                <div className="container">
                    <div className="categories py-5">
                        <div className="categories-item">
                          <Row gutter={[16,16]}>
                            <Col span={16}>
                            <div className="title-md">
                                <h3>Bài viết nổi bật</h3>
                            </div>
                            <Row gutter={[16, 16]}>{renderListPost}</Row></Col>
                            <Col span={8}>
                                <NextMatch
                                nameClub1={"Chelsea"}
                                nameClub2={"MU"}
                                time={"20:00"}
                                date={"Wed 06 Mar"}
                                tournamentName={"Champions League"}
                                logo1={"https://tse3.mm.bing.net/th?id=OIP._9gcaEgcRupx5QoAP5uJVgHaHa&pid=Api&P=0&h=220"}
                                logo2={"https://tse2.mm.bing.net/th?id=OIP.fuBQOCBSAG_ClI1eI9eNfwHaGK&pid=Api&P=0&h=220"}
                                 />
                                   <LastResult
                                nameClub1={"Chelsea"}
                                nameClub2={"Real Madrid"}
                                time={"20:00"}
                                date={"Wed 02 Mar"}
                                tournamentName={"Champions League"}
                               num1={10}
                               num2={0}
                                 />
                            </Col>
                          </Row>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomePage2;
