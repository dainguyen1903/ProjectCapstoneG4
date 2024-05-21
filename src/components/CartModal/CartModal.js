import React from 'react';
import "./CartModal.scss";
import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';

const CartModal = ({carts}) => {
  return (
    <div className='cart-modal'>
      <h5 className='cart-modal-title fw-5 fs-15 font-manrope text-center'>Sản phẩm</h5>
      {
        (carts?.length > 0) ? (
          <div className='cart-modal-list grid'>
            {
              carts.map(cart => {
                const image = cart?.product?.imagesProductDtoList.length > 0 ?cart?.product?.imagesProductDtoList[0].path :""
                const product = cart?.product || {};
                const price  = product?.price || 0;
                const discount = product?.discount || 0;
                const excatPrice =Math.ceil( price - (price/100)*discount) 

                return (
                  <div className='cart-modal-item grid align-center font-manrope py-2' key = {cart.id}>
                    <div className='cart-modal-item-img'>
                      <img src = {image} alt = "" className='img-cover' />
                    </div>
                    <div className='cart-modal-item-title fs-13 font-manrope text-capitalize'>{cart?.product?.productName}</div>
                    <div className='cart-modal-item-price text-orange fs-14 fw-6'>
                    {formatPrice(excatPrice)}
                    </div>
                  </div>
                )
              })
            }

            <div className='text-capitalize view-cart-btn bg-orange fs-15 font-manrope text-center'>Xem giỏ hàng</div>
          </div>) : (
          <div className = "flex flex-column align-center justify-center cart-modal-empty">
            <img src = {shopping_cart} alt = "" className='' />
            <h6 className='text-dark fw-4'>Chưa có sản phẩm nào</h6>
          </div>
        )
      }
    </div>
  )
}

export default CartModal