import React from 'react';
import "./CartModal.scss";
import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';
import {Row,Col} from "antd"
import moment from 'moment';

const CartTicketModal = ({carts}) => {
  return (
    <div className='cart-modal'>
      <h5 className='cart-modal-title fw-5 fs-15 font-manrope text-center'>Vé</h5>
      {
        (carts?.length > 0) ? (
          <div className='cart-modal-list grid'>
            {
              carts.map(cart => {
               
                   const match = cart.fixtures;
                return (
                  <Row align={"middle"} style={{color:"black",borderBottom:" 1px solid rgba(0, 0, 0, 0.05)",paddingBottom:10}}>
                   <Col span={16}>
                    <Row>
                      <Col span={24}>
                      <span  className="bold" style={{color:"black",fontSize:18}}>{match.homeTeam} - {match.awayTeam}</span>
                      </Col>
                      <Col span={24}>
                      {match.dateTime ? moment(match.dateTime).format("DD-MM-YYYY"):""}
                      </Col>
                    </Row>
                   </Col>
                   <Col span={8}>
                   <div className='cart-modal-item-price text-orange fs-14 fw-6'>
                   {formatPrice(match.priceOfTicket)}
                    </div>
                   
                   </Col>
                  </Row>
                 
                )
              })
            }

           
          </div>) : (
          <div className = "flex flex-column align-center justify-center cart-modal-empty">
            <img src = {shopping_cart} alt = "" className='' />
            <h6 className='text-dark fw-4'>No tickets yet</h6>
          </div>
        )
      }
    </div>
  )
}

export default CartTicketModal