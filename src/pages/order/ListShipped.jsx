import React, { useState } from 'react';
import "./../CartPage/CartPage.scss";
import "./order.scss";
import { formatPrice } from '../../utils/helpers';
import { Button } from 'antd';
const ListShiped= () => {
    const [listShip,setListShip] = useState([
        {
            id: 10,
            productName: "Áo thi đấu số 2 ",
            price: 400000,
            discount: 0,
            size: "L",
            description: "Áo thi đấu CLB số 2 ",
            quantity: 1,
            categoryId: {
              id: 1,
              name: "Áo",
            },
            imagesProductList: [],
            totalPrice: 400000,
            discountedPrice: 400000,
            isOrder: true,
          },
          {
            id: 20,
            productName: "Giày đá bóng màu vàng",
            price: 680000,
            discount: 0,
            size: "38",
            description: "Giày đá bóng Jogarbola Colorlux 2.0 Ultra màu vàng",
            quantity: 1,
            categoryId: {
              id: 2,
              name: "Giày",
            },
            imagesProductList: [],
            totalPrice: 680000,
            discountedPrice: 680000,
            isOrder: true,
          },
    ])
 
  return (
<div>
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
           <div>
           {listShip.map((cart, idx) => {
              return (
               <div>
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
                     

                      <div className="qty-value flex align-center justify-center">
                        {cart?.quantity}
                      </div>

                   
                    </div>
                  </div>

                  <div className="cart-ctd-or">
                    <span className="cart-ctxt text-orange fw-5">
                      {formatPrice(cart?.totalPrice)}
                    </span>
                  </div>
                
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"flex-end",
                    marginTop:10,
                    paddingBottom:10,
                  }}>
                    <Button style={{
                      background:"rgb(41, 174, 189)",
                      color:"white",
                      marginRight:10
                    }}>Mua lại</Button>
                    <Button>Liên hệ với người bán</Button>
                  </div>
               </div>
              );
            })}
           </div>
           
          </div>
</div>
   )
}

export default ListShiped