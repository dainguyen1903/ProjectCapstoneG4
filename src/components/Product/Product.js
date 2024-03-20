import React from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const Product = ({product}) => {
  const imageUrl = product.imagesProductList && product.imagesProductList.length>0 ? product.imagesProductList[0]:""
  
  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        <div className='category'>{product?.category}</div>
        <div className='product-item-img'>
          <img className='img-cover' src = {imageUrl} alt = {product.title} />
        </div>
        <div className='product-item-info fs-14'>
        
          <div className='title py-2'>
            {product?.productName}
          </div>
          <div className={`price flex align-center justify-center`}>
            <span className={product?.discount >0?"old-price":"new-price"}>
              {formatPrice(product?.price)}
            </span>
          {product.discount > 0 &&   <span className='new-price'>
              {formatPrice(Math.ceil(product?.price*(100-product?.discount)/100))}
            </span>}
           {product.discount > 0 && <span className='discount fw-6'>
              ({product?.discount}% Off)
            </span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product