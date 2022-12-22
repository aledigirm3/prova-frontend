import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../configuration'
import Card from '../component/Card'

const Home = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  // products from the backend
  const [products, setProducts] = useState([])
  // categories from the backend
  const [categorys, setCategorys] = useState([])
  useEffect(() => {
    axios.get(`${config.api.uri}/category`)
      .then(result => { setCategorys(result.data.data) })
      .catch(err => { console.log(err) })
  }, [])
  /* ======================================================PAGINATION==================================================== */
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    if (category === '') {
      axios.get(`${config.api.uri}/product/count?name=${search}`)
        .then(result => {
          let pg = (Math.floor(result.data.data.count / 3))
          if ((result.data.data.count % 3) !== 0) { pg += 1 }
          setPageCount(pg)
        })
        .catch(err => console.log(err))
    } else {
      axios.get(`${config.api.uri}/product/count?name=${search}&category=${category}`)
        .then(result => {
          let pg = (Math.floor(result.data.data.count / 3))
          if ((result.data.data.count % 3) !== 0) { pg += 1 }
          setPageCount(pg)
        })
        .catch(err => console.log(err))
    }
  }, [search, category])

  const handlePrevious = () => {
    const p = page
    if (p === 1) {
      return
    }

    setPage(p - 1)
  }

  const handleNext = () => {
    const p = page
    if (p === pageCount) {
      return
    }

    setPage(p + 1)
  }

  /* ======================================================================================================================= */

  const handleCategorySearch = async (e) => {
    await setCategory(e.target.value)
    await setSearch('')
    setPage(1)
  }

  const handleSearch = async (e) => {
    await setSearch(e.target.value)
    setPage(1)
  }

  useEffect(() => {
    axios.get(`${config.api.uri}/product/actions/search?name=${search}&category=${category}&page=${page}&limit=${3}`)
      .then(result => { setProducts(result.data.result) })
      .catch(err => console.log(err))
  }, [page, category, search])
  /* ======================================================SORT FUNCTION==================================================== */
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
            <input className="form-control mr-sm-2" onChange={handleSearch} type="search" placeholder="Search" aria-label="Search" value={search}/>
            <select id="category" onChange={handleCategorySearch} name="cars" className="form-control select select-initialized" style={{ margin: 'auto 50px auto' }} value={category}>
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
             <Card key={p._id} id={p._id} image={p.image} productName={p.name} prodCategory={p.category.name} price={p.price}/>
         ))
            }
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination" style={{ margin: '0% 0% 0% 43%' }}>
            <li className="page-item">
            <button type="button" className="btn btn-light" data-mdb-ripple-color="dark" onClick={handlePrevious}>prev</button>
            </li>
            <li className="page-item"> {page} </li>
            <li className="page-item">
             <button type="button" className="btn btn-light" data-mdb-ripple-color="dark" onClick={handleNext}>next</button>
           </li>
         </ul>
       </nav>

    </div>
  )
}

export default Home
