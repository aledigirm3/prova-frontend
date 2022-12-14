import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../configuration'
import Card from '../component/Card'

const Home = () => {
  // products from the backend
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${config.api.uri}/product/actions/all`)
      .then(result => {
        setProducts(result.data.result)
      })
      .catch(err => console.log(err))
  }, [])

  // categories from the backend
  const [categorys, setCategorys] = useState([])

  useEffect(() => {
    axios.get(`${config.api.uri}/category`)
      .then(result => { setCategorys(result.data.data) })
      .catch(err => { console.log(err) })
  }, [])

  const [category, setCategory] = useState('')

  const handleSearchCategory = (e) => {
    setCategory(e.target.value)
    axios.get(`${config.api.uri}/product/actions/search?name=&category=${e.target.value}`)
      .then(result => { setProducts(result.data.result) })
      .catch(err => console.log(err))
  }

  const handleSearch = (e) => {
    axios.get(`${config.api.uri}/product/actions/search?name=${e.target.value}&category=${category}`)
      .then(result => { setProducts(result.data.result) })
      .catch(err => console.log(err))
  }

  /* =================================== ==================SORT FUNCTION==================================================== */
  const sortedProductPriceDesc = (e) => {
    const newProds = [...products]
    setProducts(newProds.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0))
  }

  const sortedProductPriceAsc = (e) => {
    const newProds = [...products]
    setProducts(newProds.sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0))
  }
  /* ======================================================================================================================= */

  return (
    <div>
      <div className='filtri'>
       < nav className="navbar navbar-light bg-light">
          <div style={{ display: 'flex', margin: '10px 50px 20px' }}>
            <input className="form-control mr-sm-2" onChange={handleSearch} type="search" placeholder="Search" aria-label="Search"/>
            <select id="category" onChange={handleSearchCategory} name="cars" className="form-control select select-initialized" style={{ margin: 'auto 50px auto' }} value={category}>
                    <option value="">Filtra per categoria</option>
                    {
                      categorys.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))
                    }
                </select>
                <button type="button" className="btn" onClick={sortedProductPriceAsc}>PREZZO CRESCENTE</button>
                <button type="button" className="btn" onClick={sortedProductPriceDesc}>PREZZO DECRESCENTE</button>
           </div>
       </nav>
      </div>
      <div className="row">
          {
         products.map((p) => (
             <Card key={p._id} image={p.image} productName={p.name} prodCategory={p.category.name} price={p.price}/>
         ))
            }
        </div>

    </div>
  )
}

export default Home
