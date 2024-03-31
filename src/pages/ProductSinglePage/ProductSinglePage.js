"use client";
import React, { useEffect, useState } from "react";
import { CustomChat, FacebookProvider } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CartMessage from "../../components/CartMessage/CartMessage";
import CommentCpn from "../../components/Comment/Comment";
import Loader from "../../components/Loader/Loader";
import {
  addCartAction,
  addCartActionCustom,
  getCartMessageStatus,
  setCartMessageOff
} from "../../store/cartSlice";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../../store/productSlice";
import { formatPrice } from "../../utils/helpers";
import { STATUS } from "../../utils/status";
import "./ProductSinglePage.scss";

import { Select } from "antd";
import { userApi } from "../../api/user.api";
import { LOCAL_STORAGE_KEY } from "../../constants/common";
const ProductSinglePage = () => {
  const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.user));
  const navigate = useNavigate();
  const [comments, setComments] = useState([
   
  ]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const [currentImg, setCurrentImg] = useState("");
  const [size, setSize] = useState("");
  const listSize = product && product.size ? product.size.split(";") : [];
  const [playerNumber, setPlayerNumber] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [listPlayer, setListPlayer] = useState([]);
  const [playerId,setPlayerId] = useState("");
  const listSizeAndQUantity = product?.description?.split("*")[1] 
  const sizeMap = new Map();
  listSizeAndQUantity?.split(";").forEach(sizeItem => {
    const sizeArr = sizeItem?.split("-");
    if(sizeArr.length === 2){
      sizeMap.set(sizeArr[0],sizeArr[1])
    }
  })
  const listPlayerid = product?.imagesProductList
    ? product.imagesProductList?.map((i) => i.path)?.map(i => i?.split("*")[1])
    : [];
     // list player
const getListPlayerA = async () => {
  const res = await userApi.searchPlayer({ query: "" });
  const status = res.data.status;
  if (status === 200 || status === 204) {
    setListPlayer(res.data.data || []);
    if(res.data.data.length >=1){
      const item = res.data.data.find(i =>listPlayerid.includes(i.id +"") )
      if(item)
      setPlayerId(item.id + "")
    }
  }
};
useEffect(() => {
  if(product,playerId){
    const listImage = product?.imagesProductList
    ? product.imagesProductList.map((i) => i.path)
    : [];
  listImage.forEach(item => {
      const arrImg = item.split("*");
      if(arrImg[1] == playerId){
        setCurrentImg(arrImg[0])
      }
    })
  }

},[product,playerId])
useEffect(() => {
  if(product){
    getListPlayerA();
  }
}, [product]);
  // getting single product
  useEffect(() => {
    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus]);
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
  }, [id]);

  useEffect(() => {
    if (product) {
      const sizes = product?.size;
      if (sizes) {
        setSize(sizes.split(";")[0]);
      }
    }
  }, [product]);
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

  const addToCartHandler = async ({id}) => {
    try {
     if(product?.isCustomise){
      dispatch(
        addCartActionCustom({
          productId: id,
          quantity,
          size,
          playerName,
          playerNumber
        })
      );
     }
     else{
      dispatch(
        addCartAction({
          productId: id,
          quantity,
          size
        })
      );
     }
    } catch (error) {
      console.log(error);
    }
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
                    style={{ objectFit: "contain"}}
                    src={
                      currentImg 
                    }
                    alt=""
                    // className="img-cover"
                  />
                </div>

                {/* <div className="product-img-thumbs flex align-center my-2">
                  {listImage.map((i) => (
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setCurrentImg(i)}
                      className="thumb-item"
                    >
                      <img src={i} alt="" className="img-cover" />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>

            <div className="product-single-r">
              <div className="product-details font-manrope">
                <div className="title fs-20 fw-5">{product?.productName}</div>
                <div>
                  <p className="para fw-3 fs-15">
                    {product?.description?.split("*")[0]}
                  </p>
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
                    {product?.discount > 0 && (
                      <div className="old-price text-gray">
                        {formatPrice(product?.price)}
                      </div>
                    )}
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
                  <div style={{ width: 100 }}>Quantity:</div>
                  <div className="qty-change flex align-center mx-2">
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

                <div className="listSize qty flex align-center">
                  <div style={{ width: 100 }} className="qty-text">
                    Size:
                  </div>
                  <div className="listSize">
                    {Array.from(sizeMap.keys()).map((i) => (
                      <div
                        onClick={() => setSize(i)}
                        style={{
                          borderColor: size === i && "rgb(41, 174, 189)",
                          borderWidth: size === i && 2,
                        }}
                        className="size"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                </div>
                {size && (
                  <div
                    style={{
                      marginLeft: 110,
                      marginTop: -10,
                      marginBottom: 10,
                    }}
                  >
                    Còn {sizeMap.get(size)} sản phẩm
                  </div>
                )}
                <div
                  style={{
                    marginBottom: 20,
                  }}
                  className=""
                >
                  <div className="wrap-custom">
                    <span className="txt-custom">Tên cầu thủ và số áo</span>
                    <Select
                    value={playerId}
                      onChange={(v) => {
                        setPlayerId(v)
                      }}
                      style={{ width: 300 }}
                    >
                      {listPlayer.filter(i => listPlayerid.includes(i.id + "")).map((i) => (
                        <Select.Option
                        value={i.id + ""}
                          
                        >
                          {i.numberPlayer + "." + i.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="btns">
                  <button
                    onClick={() => {
                      if (currentUser) {
                        addToCartHandler(product);
                      } else {
                        navigate("/login");
                      }
                    }}
                    type="button"
                    className="add-to-cart-btn btn"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="btn-text mx-2">add to cart</span>
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
