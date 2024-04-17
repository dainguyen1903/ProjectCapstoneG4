import React, { useState } from "react";
import "./../CartPage/CartPage.scss";
import "./order.scss";
import { formatPrice } from "../../utils/helpers";
import OrderItem from "./OrderItem";
const ListShipping = ({list}) => {


  return (
    <div>
    

      <div className="cart-cbody">
        {list.map((item, idx) => {
          return <OrderItem item={item} />
          // return (
          //   <div className="cart-ctr-or py-4" key={cart?.id}>
          //     <div className="cart-ctd-or">
          //       <span className="cart-ctxt">{idx + 1}</span>
          //     </div>
          //     <div className="cart-ctd-or">
          //       <span className="cart-ctxt">{cart?.productName}</span>
          //     </div>
          //     <div className="cart-ctd-or">
          //       <span className="cart-ctxt">
          //         {formatPrice(cart?.discountedPrice)}
          //       </span>
          //     </div>
          //     <div className="cart-ctd-or">
          //       <div className="qty-change flex align-center">
          //         <div className="qty-value flex align-center justify-center">
          //           {cart?.quantity}
          //         </div>
          //       </div>
          //     </div>

          //     <div className="cart-ctd-or">
          //       <span className="cart-ctxt text-orange fw-5">
          //         {formatPrice(cart?.totalPrice)}
          //       </span>
          //     </div>
          //   </div>
          // );
        })}
      </div>
    </div>
  );
};

export default ListShipping;
