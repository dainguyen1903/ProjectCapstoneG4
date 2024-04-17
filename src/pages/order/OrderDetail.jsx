import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { orrderApi } from '../../api/order.api';

const OrderDetail= () => {
 
    const [oriderDetail,setOrderDetail] = useState({});
    const {id} = useParams();
    const getOrderDetail = async () => {
        try {
            const res = await orrderApi.getOrderDetailById(id);

            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      getOrderDetail()
    },[])
  return (
<div></div>
   )
}

export default OrderDetail