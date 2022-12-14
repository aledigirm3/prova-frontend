import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import config from '../../configuration'

const CreateProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')

  // categories from the backend
  const [categorys, setCategorys] = useState([])

  useEffect(() => {
    axios.get(`${config.api.uri}/category`)
      .then(result => { setCategorys(result.data.data) })
      .catch(err => { console.log(err) })
  }, [])

  // handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${config.api.uri}/product`, {
        name,
        description,
        price,
        category,
        image
      }, { withCredentials: true })

      setName('')
      setDescription('')
      setPrice('')
      setCategory('')
      setImage('')

      toast.success('Prodotto aggiunto con successo')
    } catch (err) {
      toast.error(err.response.data.error)
    }
  }

  return (
    <div>
         <div className="container custom_class">
        <h2 className="signup_title text-center ">CREATE PRODUCT</h2>
        <form className=" col-sm-6 offset-3 pt-5 signup_form " encType="multipart/form-data" >

            <div className="form-outline mb-4">
                <input onChange={(e) => setName(e.target.value)} type="text" id="form4Example1" className="form-control" value={name}/>
                <label className="form-label" htmlFor="form4Example1">Nome</label>
            </div>

            <div className="form-outline mb-4">
                <textarea onChange={(e) => setDescription(e.target.value)} type="text" id="form4Example2" className="form-control" value={description}/>
                <label className="form-label" htmlFor="form4Example2">Descrizione </label>
            </div>

            <div className="form-outline mb-4">
                <input onChange={(e) => setPrice(e.target.value)} type="number" id="form4Example3" className="form-control" value={price}/>
                <label className="form-label" htmlFor="form4Example2">Prezzo </label>
            </div>

            <div className="form-outline mb-1">
                <select onChange={(e) => setCategory(e.target.value)} id="category" name="cars" className="form-control select select-initialized" value={category} >
                    <option value="">Scegli la categoria</option>
                    {
                         categorys.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                         ))
                    }
                </select>
            </div>

            <div className="form-outline mb-4">
                <input onChange={handleImage} type="file" id="formupload" name="image" className="form-control" />
                <label className="form-label" htmlFor="form4Example2">Immagine</label>
            </div>
            <img className="img-fluid" src={image} alt="" />
            <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Create</button>

         </form>
    </div>
 </div>
  )
}

export default CreateProduct
