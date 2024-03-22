"use client";
import React, { useEffect, useState } from "react";
import "./ProductSinglePage.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../../store/productSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/helpers";
import moment from "moment";
import {
  addToCart,
  getCartMessageStatus,
  setCartMessageOff,
  setCartMessageOn,
} from "../../store/cartSlice";
import CartMessage from "../../components/CartMessage/CartMessage";
import { FacebookProvider, CustomChat } from "react-facebook";
import CommentCpn from "../../components/Comment/Comment";
const ProductSinglePage = () => {
  const [comments, setComments] = useState([{
    author: {
      name:"User 1",
      id: 1212121,
    },
    avatar: "",
    content: "comment1",
    datetime: moment().fromNow(),
    id:Math.random()*199999
  },
  {
    author: {
      name:"User 2",
      id: 1212122,
    },
    avatar: "",
    content: "comment2",
    datetime: moment().fromNow(),
    id:Math.random()*199999
  },
  {
    author: {
      name:"User 3",
      id: 1212123,
    },
    avatar: "",
    content: "comment3",
    datetime: moment().fromNow(),
    id:Math.random()*199999
  },
  
]);
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const listImage = product.imagesProductList || [];
  // getting single product
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));

    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus]);

  let discountedPrice = Math.ceil(
    product?.price - product?.price * (product?.discount / 100)
  );
  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product) => {
    let discountedPrice =
      product?.price - product?.price * (product?.discount / 100);
    let totalPrice = quantity * discountedPrice;

    dispatch(
      addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice,price:discountedPrice,title:product.productName })
    );
    dispatch(setCartMessageOn(true));
  };

  return (
    <main className="py-5 bg-whitesmoke">
      <FacebookProvider appId="959380638706569" chatSupport>
        <CustomChat pageId="100573959787776" minimized={false} />
      </FacebookProvider>
      <div className="product-single">
        <div className="container">
          <div className="product-single-content bg-white grid">
            <div className="product-single-l">
              <div className="product-img">
                <div className="product-img-zoom">
                  <img
                    src={
                      listImage.length  > 0 ? listImage[0]:""
                    }
                    alt=""
                    className="img-cover"
                  />
                </div>

                <div className="product-img-thumbs flex align-center my-2">
                  {listImage.map((i) => (
                    <div className="thumb-item">
                      <img src={i} alt="" className="img-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-single-r">
              <div className="product-details font-manrope">
                <div className="title fs-20 fw-5">{product?.productName}</div>
                <div>
                  <p className="para fw-3 fs-15">{product?.description}</p>
                </div>
                <div className="info flex align-center flex-wrap fs-14">
                  <div className="brand">
                    <span className="text-orange fw-5">Category:</span>
                    <span className="mx-1 text-capitalize">
                      {product?.categoryId?.name}
                    </span>
                  </div>
                </div>

                <div className="price">
                  <div className="flex align-center">
                   {product?.discount > 0 &&  <div className="old-price text-gray">
                      {formatPrice(product?.price)}
                    </div>}
                  </div>

                  <div className="flex align-center my-1">
                    <div className="new-price fw-5 font-poppins fs-24 text-orange">
                      {formatPrice(discountedPrice)}
                    </div>
                    {product?.discount > 0 && (
                      <div className="discount bg-orange fs-13 text-white fw-6 font-poppins">
                        {product?.discount}% OFF
                      </div>
                    )}
                  </div>
                </div>

                <div className="qty flex align-center my-4">
                  <div className="qty-text">Quantity:</div>
                  <div className="qty-change flex align-center mx-3">
                    <button
                      type="button"
                      className="qty-decrease flex align-center justify-center"
                      onClick={() => decreaseQty()}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="qty-value flex align-center justify-center">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      className="qty-increase flex align-center justify-center"
                      onClick={() => increaseQty()}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  {product?.quantity === 0 ? (
                    <div className="qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5">
                      out of stock
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="btns">
                  <button type="button" className="add-to-cart-btn btn">
                    <i className="fas fa-shopping-cart"></i>
                    <span
                      className="btn-text mx-2"
                      onClick={() => {
                        addToCartHandler(product);
                      }}
                    >
                      add to cart
                    </span>
                  </button>
                  <button type="button" className="buy-now btn mx-3">
                    <span className="btn-text">buy now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: 10, background: "white" }}>
            <CommentCpn comments={comments} setComments={setComments} />
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
    </main>
  );
};

export default ProductSinglePage;
