import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import config from "../configuration";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios
      .get(`${config.api.uri}/product/${id}`)
      .then(async (result) => {
        setProduct(result.data.data);
        await axios
          .get(`${config.api.uri}/category/${result.data.data.category}`)
          .then((result2) => {
            setCategory(result2.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });
  }, []);

  const addToCart = () => {
    toast.dismiss();
    axios
      .post(
        `${config.api.uri}/cart/actions/addproduct`,
        { id },
        {
          withCredentials: true,
        }
      )
      .then(() => toast.success("Prodotto aggiunto al carrello con successo"))
      .catch((err) => toast.error(err.response.data.error));
  };

  //PAGAMENTO
  const handlePay = () => {
    console.log(product);
    axios
      .post(
        `${config.api.uri}/stripe/create-checkout-session-product`,
        {
          product,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.data.url) {
          window.location.href = result.data.url;
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });
  };

  return (
    <div className="container" style={{ margin: "3%" }}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <h6 className="card-subtitle">Categoria: {category.name}</h6>
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6">
              <div className="white-box text-center">
                <img
                  src={product.image}
                  className="img-fluid"
                  alt=""
                  style={{ margin: "5% 0% 0% 0%" }}
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6">
              <h4 className="box-title mt-5">Product description</h4>
              <p>{product.description}</p>
              <h2 className="mt-5">$ {product.price}</h2>
              <button
                className="btn btn-dark btn-rounded mr-1"
                data-toggle="tooltip"
                title=""
                data-original-title="Add to cart"
                onClick={addToCart}
              >
                <i className="fa fa-shopping-cart"></i>
              </button>
              <button
                className="btn btn-success btn-rounded"
                onClick={handlePay}
              >
                Buy Now
              </button>
              <h3 className="box-title mt-5">Key Highlights</h3>
              <ul className="list-unstyled">
                <li>
                  <i className="fa fa-check text-success"></i>null
                </li>
                <li>
                  <i className="fa fa-check text-success"></i>null
                </li>
                <li>
                  <i className="fa fa-check text-success"></i>null
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
