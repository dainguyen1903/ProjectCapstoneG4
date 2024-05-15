import React, { useEffect, useState } from "react";
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
import CartPage from "../CartPage/CartPage";
import { orrderApi } from "../../api/order.api";
import { Button, Input, Modal } from "antd";
import ModalInfoShip from "./ModalInfoShip";
import { set } from "date-fns";
import { EditOutlined } from '@ant-design/icons';
import { paymentApi } from "../../api/payment.api.";

const CheckOutPage = () => {
 const {currentUser} = useSelector(state => state.auth);
 console.log(currentUser)
  const [visible,setVisiable] = useState(false);
  const [shipData,setShipData] = useState({
    receiverName:currentUser?.fullname || "",
    receiverPhone:"",
    receiverAddress:currentUser?.address||"",
    note:"",
  })

  useEffect(() => {
  setShipData({
    ...shipData,
    receiverName:currentUser?.fullname || "",
    receiverAddress:currentUser?.address||"",
  })
  },[currentUser])

  const paymentMethods = [
    {
      id: 1,
      name: "Thanh toán VNPAY",
      key:"VNPAY",
    },
    {
      id: 2,
      name: "Thanh toán khi nhận hàng",
      key:"COD"

    },
  ];
  const dispatch = useDispatch();
  const orders = useSelector(getAllCarts)
  const [method,setMethod] = useState(paymentMethods[0])

  
  const totalAmount = orders.reduce((total, cart) => {
    const product = cart?.product || {};
    const price = product?.price || 0;
    const discount = product?.discount || 0;
    const excatPrice = Math.ceil(price - (price / 100) * discount);
    const totalPrice = excatPrice * cart.quantity;
    return total + totalPrice;
  }, 0);

  // 
  const onClose = () => setVisiable(false)
  // ADD ORDER
  const handleAddOrder = async()=>{
    try {
      const dataPost = {
        shipping:{
          shipName:shipData.receiverName,
          phone:shipData.receiverPhone,
          note:shipData.note,
          address:shipData.receiverAddress,
          ward:"a",
          district:"b",
          province:"c",
          desiredDeliveryTime:true,

        },
        paymentMethod:method.key,

      }
      const res = await orrderApi.addOrder(dataPost)
      if(res.data.status === 200 ||res.data.status === 204 ){
        const orderId = res.data.data;
        const pay = await paymentApi.createpayment({orderId})
        const url = pay?.data?.data?.paymentUrl;
        if(url){
          window.location.href = url;
        }
      }
      else{
        Modal.error({
          title:"Lỗi",
          content:"Thanh toán thất bại",
          centered:true
        })
      }

    } catch (error) {
      Modal.error({
        title:"Lỗi",
        content:"Thanh toán thất bại",
        centered:true
      })
      console.log(error)
    }
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
            <div style={{
              display:"flex",
              justifyContent:'space-between',
              alignItems:"center"
            }}>
            <div>
              <div>
                
              </div>
             <div>
             {shipData.receiverName} {shipData.receiverPhone || " "} {shipData.receiverAddress}
             </div>
             {shipData.note && <div>
              Note : {shipData.note}
              </div>}
            </div>
           <Button onClick={() => setVisiable(true)}>
           <EditOutlined /> Chỉnh sửa
           </Button>
            </div>
          </div>
          <div>
            <CartPage isCheckout />
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
                border:item.id === method.id ? "2px solid rgb(41, 174, 189)":"",
                color:item.id === method.id ? "rgb(41, 174, 189)":""
            }} onClick={() => setMethod(item)} className="method">
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
                  {formatPrice(totalAmount || 0)}
                </span>
              </div>

              <button
              onClick={() => handleAddOrder()}
                type="button"
                className="checkout-btn text-white bg-orange fs-16"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalInfoShip onClose={onClose} visible={visible} shipData={shipData} setShipData={setShipData} />
      {/* <Modal
      title="Thông tin người nhận"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <div>
        <label>Tên người nhận:</label>
        <Input
          value={receiverName}
          onChange={e => setReceiverName(e.target.value)}
          placeholder="Nhập tên người nhận"
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Số điện thoại người nhận:</label>
        <Input
          value={receiverPhone}
          onChange={e => setReceiverPhone(e.target.value)}
          placeholder="Nhập số điện thoại người nhận"
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Địa chỉ:</label>
        <Input
          value={receiverAddress}
          onChange={e => setReceiverAddress(e.target.value)}
          placeholder="Nhập địa chỉ người nhận"
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <Button type="primary" >
          Xác nhận
        </Button>
        <Button
          style={{ marginLeft: '8px' }}
          onClick={onClose}
        >
          Hủy
        </Button>
      </div>
    </Modal> */}
    </div>
  );
};

export default CheckOutPage;
