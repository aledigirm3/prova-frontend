import React from 'react'

// eslint-disable-next-line react/prop-types
const Card = ({ image, productName, prodCategory, price }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '2em', border: '3mm ridge rgba(128,128,128, .3)' }}>
    <img src={image} className="card-img-top" alt=""/>
    <div className="card-body">
     <h5 className="card-title">{productName}</h5>
     <p className='card-category'>CATEGORIA: {prodCategory}</p>
     <h6 className="card-text">{price} $</h6>
     <a href="#" className="btn btn-primary">Go somewhere</a>
   </div>
  </div>
  )
}

export default Card
