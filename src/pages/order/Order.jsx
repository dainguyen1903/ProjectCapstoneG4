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
      name: "Chờ xác nhận",
    },
    {
      id: 2,
      name: "Đã xác nhận",
    },
    
    {
      id: 3,
      name: "Đang giao",
    },
    
    {
      id: 4,
      name: "Đã giao",
    },
    {
      id: 5,
      name: "Hoàn trả",
    },
    {
      id: 6,
      name: "Giao thất bại",
    },
    {
      id: 7,
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
      const res = await orrderApi.getHistoryOrder();
      setListOrder(res.data.data || []);
    } catch (error) {}
  };
  useEffect(() => {
    if (currentUser) {
      getLisOrder();
    }
  }, [currentUser]);

  const listPendingConfirm = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.pending
  );
  const listConfirmed = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.confirmed
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
  const listReturn = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.returned
  );
  const listFail = listOrder.filter(
    (i) => i.orderStatus === STATUS_ORDER.FAILED
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
            {value === 1 && <ListShipping list={listPendingConfirm} />}
            {value === 2 && <ListShipping list={listConfirmed} />}
            {value === 3 && <ListShipping list={listInprogress} />}
            {value === 4 && <ListShipping list={listComplete} />}
            {value === 5 && <ListShipping list={listReturn} />}
            {value === 6 && <ListShipping list={listFail} />}
            {value === 7 && <ListShipping list={listCancel} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
