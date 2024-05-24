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
  setCartMessageOff,
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
import { playerApi } from "../../api/player.api";
import { getCurrentUser } from "../../store/authSlice";
const ProductSinglePage = () => {
  const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.user));
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const user = useSelector(getCurrentUser);
  const isUser = user?.authority === "User";
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
  const [playerId, setPlayerId] = useState("");
  const listSizeAndQUantity = product?.description?.split("*")[1];
  const sizeMap = new Map();
  listSizeAndQUantity?.split(";").forEach((sizeItem) => {
    const sizeArr = sizeItem?.split("-");
    if (sizeArr.length === 2) {
      sizeMap.set(sizeArr[0], sizeArr[1]);
    }
  });
  const listSizes = product?.productSizeDtoList || [];
  const getQuantity = (size) => {
    const item = listSizes.find((i) => i.size == size);
    if (item) {
      return item.quantity;
    }
    return 0;
  };

  // custom
  const isCustomise =
    product?.category?.id == 1 ||
    product?.category?.id == 6 ||
    product?.category?.name?.toUpperCase() == "Áo Sân Nhà"?.toUpperCase() ||
    product?.category?.name?.toUpperCase() == "Áo Sân Khách"?.toUpperCase();
  const isHome =
    product?.category?.id == 1 || product?.category?.name?.toUpperCase() == "Áo Sân Nhà"?.toUpperCase();

  const listPlayerid = product?.imagesProductList
    ? product.imagesProductList
        ?.map((i) => i.path)
        ?.map((i) => i?.split("*")[1])
    : [];

  const listImage = product?.imagesProductDtoList || [];
  // list player
  useEffect(() => {
    if (product && isCustomise && listImage.length > 0) {
      if (!playerId) {
      } else {
        const item = listImage.find((i) => i.playerId == playerId);
        if (item) {
          setCurrentImg(item.path);
        }
      }
      // initSize
    } else if (product && !isCustomise && listImage.length > 0) {
      setCurrentImg(listImage[0].path);
    }
    if (!size && product && listSizes.length > 0) {
      console.log(listSizes);
      setSize(listSizes[0]?.size);
    }
  }, [product, playerId]);

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

  //
  const getlistPlayer = async () => {
    try {
      const res = await playerApi.searchPlayer({ query: "" });
      const data = res?.data?.data || [];

      setListPlayer(data);
      if (data.length > 0) {
        setPlayerId(data[0].playerNumber + "");
        setPlayerName(data[0].name);
        if (isHome) {
          setCurrentImg(data[0]?.imageFirstJersey);
        } else {
          setCurrentImg(data[0]?.imageSecondJersey);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (isCustomise) {
      getlistPlayer();
    }
  }, [isCustomise]);
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

  const addToCartHandler = async ({ id }) => {
    try {
      if (isCustomise) {
        dispatch(
          addCartActionCustom({
            productId: id,
            quantity,
            size,
            playerName,
            playerNumber: playerId,
          })
        );
      } else {
        dispatch(
          addCartAction({
            productId: id,
            quantity,
            size,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(playerName);
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
                    style={{ objectFit: "contain",height:"100%" }}
                    src={currentImg}
                    alt=""
                    // className="img-cover"
                  />
                </div>

                {!isCustomise && (
                  <div className="product-img-thumbs flex align-center my-2">
                    {listImage.map((i) => (
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => setCurrentImg(i.path)}
                        className="thumb-item"
                      >
                        <img src={i.path} alt="" className="img-cover" />
                      </div>
                    ))}
                  </div>
                )}
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
                      {product?.category?.name}
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
                    {listSizes?.map((i) => (
                      <div
                        onClick={() => setSize(i.size)}
                        style={{
                          borderColor: size === i.size && "rgb(41, 174, 189)",
                          borderWidth: size === i.size && 2,
                        }}
                        className="size"
                      >
                        {i.size}
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
                    Còn {getQuantity(size)} sản phẩm
                  </div>
                )}
                <div
                  style={{
                    marginBottom: 20,
                  }}
                  className=""
                >
                  {isCustomise && (
                    <div className="wrap-custom">
                      <span className="txt-custom">Tên cầu thủ và số áo</span>
                      <Select
                        value={playerId}
                        onChange={(v) => {
                          setPlayerId(v);
                          const item = listPlayer.find(
                            (i) => i.playerNumber == v
                          );
                          if (item) {
                            setPlayerName(item.name);
                            if (isHome) {
                              setCurrentImg(item.imageFirstJersey);
                            } else {
                              setCurrentImg(item.imageSecondJersey);
                            }
                          }
                        }}
                        style={{ width: 300 }}
                      >
                        {listPlayer.map((i) => (
                          <Select.Option
                            key={i.playerNumber}
                            value={i.playerNumber + ""}
                          >
                            {i.playerNumber + "." + i.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>

                {isUser && (
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
                      <span className="btn-text mx-2">Thêm vào giỏ hàng</span>
                    </button>
                    {/* <button type="button" className="buy-now btn mx-3">
              <span className="btn-text">buy now</span>
            </button> */}
                  </div>
                )}
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
