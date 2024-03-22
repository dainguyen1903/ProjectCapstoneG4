import React, { useState } from "react";
import "./../CartPage/CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../../utils/images";
import { Link, Navigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
  getCartTotal,
} from "../../store/cartSlice";

const CheckOutPage = () => {
  const paymentMethods = [
    {
      id: 1,
      name: "Thanhh toán khi nhận hàng",
    },
    {
      id: 2,
      name: "Ví momo",
    },
  ];
  const dispatch = useDispatch();
  const orders = useSelector(getAllCarts).filter((i) => i.isOrder);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  const [method,setMethod] = useState(1)
  const total = orders.reduce((cartTotal, cartItem) => {
    return (cartTotal += cartItem.totalPrice);
  }, 0);
  if (orders.length === 0) {
    return <Navigate to={"/cart"} />;
  }

  return (
    <div className="cart bg-whitesmoke">
      <div className="container">
        <div className="cart-ctable">
          <div
            style={{
              padding: 30,
            }}
            className="cart-chead bg-white"
          >
            <div className="fw-6">Địa chỉ nhận hàng</div>
            <div>
              Kim Anh (+84) 348638763 7 Ngách 38 - Ngõ 20 Hồ Tùng Mạu, Phường
              Mai Dịch, Quận Cầu Giấy, Hà Nội
            </div>
          </div>
          <div className="cart-chead bg-white">
            <div className="cart-ctr-or fw-6 font-manrope fs-15">
              <div className="cart-cth">
                <span className="cart-ctxt">S.N.</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Product</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Unit Price</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Quantity</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Total Price</span>
              </div>
            </div>
          </div>

          <div className="cart-cbody bg-white">
            {orders.map((cart, idx) => {
              return (
                <div className="cart-ctr-or py-4" key={cart?.id}>
                  <div className="cart-ctd-or">
                    <span className="cart-ctxt">{idx + 1}</span>
                  </div>
                  <div className="cart-ctd-or">
                    <span className="cart-ctxt">{cart?.productName}</span>
                  </div>
                  <div className="cart-ctd-or">
                    <span className="cart-ctxt">
                      {formatPrice(cart?.discountedPrice)}
                    </span>
                  </div>
                  <div className="cart-ctd-or">
                    <div className="qty-change flex align-center">
                      <button
                        type="button"
                        className="qty-decrease flex align-center justify-center"
                        onClick={() =>
                          dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>

                      <div className="qty-value flex align-center justify-center">
                        {cart?.quantity}
                      </div>

                      <button
                        type="button"
                        className="qty-increase flex align-center justify-center"
                        onClick={() =>
                          dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-ctd-or">
                    <span className="cart-ctxt text-orange fw-5">
                      {formatPrice(cart?.totalPrice)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              padding: 30,
              marginTop:20
            }}
            className="cart-chead bg-white"
          >
            <div className="fw-6">Phương thức thanh toán</div>
          <div className="wrap-method">
          {paymentMethods.map((item) => (
            <div style={{
                border:item.id === method ? "2px solid rgb(41, 174, 189)":"",
                color:item.id === method ? "rgb(41, 174, 189)":""
            }} onClick={() => setMethod(item.id)} className="method">
                {item.name}
            </div>
           ))}
          </div>
          </div>
          <div className="cart-cfoot flex align-start justify-between py-3 bg-white">
            <div className="cart-cfoot-l"></div>

            <div className="cart-cfoot-r flex flex-column justify-end">
              <div className="total-txt flex align-center justify-end">
                <div className="font-manrope fw-5">Total:</div>
                <span className="text-orange fs-22 mx-2 fw-6">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="button"
                className="checkout-btn text-white bg-orange fs-16"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
