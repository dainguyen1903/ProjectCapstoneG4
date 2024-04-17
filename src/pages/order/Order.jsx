import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAllCarts } from "../../store/cartSlice";
import "./../CartPage/CartPage.scss";
import ListCancel from "./ListCancel";
import ListShiped from "./ListShipped";
import ListShipping from "./ListShipping";
import "./order.scss";
import { orrderApi } from "../../api/order.api";
import { STATUS_ORDER } from "../../constants/common";

const OrderPage = () => {
  const [listOrder, setListOrder] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);
  const listStatus = [
    {
      id: 0,
      name: "Tất cả",
    },
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

  const getLisOrder = async () => {
    try {
      const res = await orrderApi.getListOrderByUserId(currentUser.id);
      setListOrder(res.data.data || []);
    } catch (error) {}
  };
  useEffect(() => {
    if (currentUser) {
      getLisOrder();
    }
  }, [currentUser]);

  const listPending = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.pending
  );
  const listInprogress = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.inprogress
  );
  const listComplete = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.complete
  );
  const listCancel = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.cancel
  );

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
                className={`${
                  item.id === value ? "status-active point" : "point"
                }`}
              >
                {item.name}
              </span>
            ))}
            <div></div>
          </div>
          <div>
            {value === 0 && <ListShipping list={listOrder} />}
            {value === 1 && <ListShipping list={listPending} />}
            {value === 2 && <ListShipping list={listComplete} />}
            {value === 3 && <ListShipping list={listCancel} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
