import React, { useState } from "react";
import "./../CartPage/CartPage.scss";
import "./order.scss";
import { formatPrice } from "../../utils/helpers";
import OrderItem from "./OrderItem";
const ListShipping = ({list}) => {

  return (
    <div className="container">
    

      <div className="cart-cbody">
        {list.map((item, idx) => {
          return <OrderItem item={item} />
        })}
      </div>
    </div>
  );
};

export default ListShipping;
