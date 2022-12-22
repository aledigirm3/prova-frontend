import React from 'react'

// eslint-disable-next-line react/prop-types
const Card = ({ id, image, productName, prodCategory, price }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '2em', border: '3mm ridge rgba(128,128,128, .3)' }}>
    <img src={image} className="card-img-top" alt=""/>
    <div className="card-body">
     <h5 className="card-title">{productName}</h5>
     <p className='card-category'>CATEGORIA: {prodCategory}</p>
     <h6 className="card-text">{price} $</h6>
     <div style={{ display: 'flex' }}>
     <a href={`/product/${id}`} className="btn btn-black" style={{ margin: '0% 0% 5% 0%', padding: '3%' }}>Go somewhere</a>
     <a className="btn btn-success" href="#" role="button" style={{ margin: '0% 0% 5% 3%', padding: '3%' }}>Buy now</a>
     </div>
   </div>
  </div>
  )
}

export default Card
