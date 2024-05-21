import React from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../../utils/images";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
  getCartTotal,
  setCartOrder,
  removeCartAction,
  updateQuantity,
  getListCart,
} from "../../store/cartSlice";
import { Checkbox } from "antd";
import e from "cors";
import moment from "moment";
import { removeCartTicketAction, updateQuantityCartTicket } from "../../store/cartTicketSlice";

const CartTicketPage = () => {
  const dispatch = useDispatch();
  const cartsTickket = useSelector(state => state.cartTicket.carts);
  const disabledCheckout = cartsTickket.filter((i) => i.isOrder).length === 0;
  const navigate = useNavigate();

  if (cartsTickket.length === 0) {
    return (
      <div className="container my-5">
        <div className="empty-cart flex justify-center align-center flex-column font-manrope">
          <img src={shopping_cart} alt="" />
          <span className="fw-6 fs-15 text-gray">
            Chưa có vé nào
          </span>
          <Link to="/ticket" className="shopping-btn bg-orange text-white fw-5">
            Mua vé ngay
          </Link>
        </div>
      </div>
    );
  }
  const changeSlectOrder = (cart) => (e) => {
    dispatch(
      setCartOrder({
        id: cart.id,
        isOrder: e.target.checked,
      })
    );
  };
  const totalAmount = cartsTickket.reduce((total, cart) => {
    const match = cart?.fixtures
    const totalPrice = match?.priceOfTicket * cart.quantity

    return total + totalPrice
  }, 0);
  return (
    <div className="cart bg-whitesmoke">
      <div className="container">
        <div className="cart-ctable">
          <div className="cart-chead bg-white">
            <div className="cart-ctr fw-6 font-manrope fs-15">
              <div className="cart-cth">
                <span className="cart-ctxt"></span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">S.N.</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Trận đấu</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Giá mỗi vé</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Số lượng vé</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Tổng giá</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Actions</span>
              </div>
            </div>
          </div>

          <div className="cart-cbody bg-white">
            {cartsTickket.map((cart, idx) => {
              const match = cart?.fixtures
              const totalPrice = match?.priceOfTicket * cart.quantity

              return (
                <div className="cart-ctr py-4" key={cart?.id}>
                  <div className="cart-ctd">
                    <Checkbox onChange={changeSlectOrder(cart)} />
                  </div>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">{idx + 1}</span>
                  </div>
                  <div className="cart-ctd">
                    <span className="cart-ctxt bold">
                    {match.homeTeam} - {match.awayTeam}
                    </span>
                    <div>Giải đấu : {match?.name}</div>
                    <div>Vòng đấu : {match?.round}</div>
                    <div>Ngày : {match?.dateTime ? moment(match.dateTime).format("DD-MM-YYYY"):""}</div>
                  </div>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">{formatPrice(match.priceOfTicket)}</span>
                  </div>
                  <div className="cart-ctd">
                    <div className="qty-change flex align-center">
                      <button
                        type="button"
                        className="qty-decrease flex align-center justify-center"
                        onClick={() =>
                          dispatch(
                            updateQuantityCartTicket({
                                id: cart?.cartTicketItemId,
                              quantity: cart?.quantity - 1,
                            })
                          )
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
                          dispatch(
                            updateQuantityCartTicket({
                              id: cart?.cartTicketItemId,
                              quantity: cart?.quantity + 1,
                            })
                          )
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-ctd">
                    <span className="cart-ctxt text-orange fw-5">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <div className="cart-ctd">
                    <button
                      type="button"
                      className="delete-btn text-dark"
                      onClick={() =>
                        dispatch(removeCartTicketAction(cart?.cartTicketItemId))
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-cfoot flex align-start justify-between py-3 bg-white">
            <div className="cart-cfoot-l">
              {/* <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4' onClick={() => {
               carts.forEach(async(cart )=> {
               await dispatch(removeCartAction(cart?.cartItemId))
                
               })
               dispatch(getListCart());
              }}>
                <i className='fas fa-trash'></i>
                <span className='mx-1'>Clear Cart</span>
              </button> */}
            </div>

            <div className="cart-cfoot-r flex flex-column justify-end">
              <div className="total-txt flex align-center justify-end">
                <div className="font-manrope fw-5">
                  Total ({cartsTickket.length}) items:{" "}
                </div>
                <span className="text-orange fs-22 mx-2 fw-6">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                style={{
                  background: disabledCheckout && "gray",
                  cursor: disabledCheckout && "default",
                }}
                disabled={disabledCheckout}
                type="button"
                className="checkout-btn text-white bg-orange fs-16"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTicketPage;
