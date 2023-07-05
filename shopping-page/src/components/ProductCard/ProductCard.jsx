import React from 'react'
import { Link } from 'react-router-dom'
import "./ProductCard.css"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function ProductCard(props) {
  return (
    <div className='product-card mb-5'>
      <div className='product-img w-50 mx-auto'>
        {
          props.image ? (
            <img src={props.image} alt="logo" className='product-img-img' />) : (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <p>
                <Skeleton width={150} height={150}/>
              </p>
            </SkeletonTheme>)
        }
      </div>
      <hr />
      {
        props.title ? (
          <h6 className='product-title text-center'>{props.title}</h6>
        ) : (
          <Skeleton width={150} />
        )
      }
      {
        props.price ? (
          <h6 className='product-price text-center'>${props.price}</h6>
        ) : (
          <Skeleton width={80} />
        )
      }
      <Link to="product/2" className='product-link p-2 rounded mb-3'>اطلاعات بیشتر</Link>
    </div>
  )
}
