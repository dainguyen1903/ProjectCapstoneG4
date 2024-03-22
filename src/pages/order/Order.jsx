import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAllCarts } from "../../store/cartSlice";
import "./../CartPage/CartPage.scss";
import ListCancel from "./ListCancel";
import ListShiped from "./ListShipped";
import ListShipping from "./ListShipping";
import "./order.scss";


const OrderPage = () => {
  const listStatus = [
    {
      id: 1,
      name: "Đang giao",
    },
    {
      id: 2,
      name: "Đã giao",
    },
    {
      id: 3,
      name: "Đã hủy",
    },
  ];
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(getAllCarts).filter((i) => i.isOrder);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  const [method, setMethod] = useState(1);
  const total = orders.reduce((cartTotal, cartItem) => {
    return (cartTotal += cartItem.totalPrice);
  }, 0);
  

  return (
    <div className="cart bg-whitesmoke">
      <div className="container">
        <div className="cart-ctable">
          <div
            style={{
              padding: 30,
            }}
            className="cart-chead bg-white wrap-status"
          >
            {listStatus.map((item) => (
              <span
                onClick={() => setValue(item.id)}
                className={`${item.id === value ? "status-active point" : "point"}`}
              >
                {item.name}
              </span>
            ))}
            <div></div>
          </div>
         <div>
            {value===1 && <ListShipping />}
            {value===2 && <ListShiped />}
            {value===3 && <ListCancel />}
         </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
