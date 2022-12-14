import React from "react";
import config from "../configuration";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Card = ({ id, image, productName, prodCategory, price, role }) => {
  const deleteHandler = () => {
    axios
      .delete(`${config.api.uri}/product/${id}`, { withCredentials: true })
      .then(() => {
        window.location.reload(false);
        toast.success("Prodotto eliminato con successo");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        margin: "2em",
        border: "3mm ridge rgba(128,128,128, .3)",
      }}
    >
      <img src={image} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-category">CATEGORIA: {prodCategory}</p>
        <h6 className="card-text">{price} $</h6>
        <div style={{ display: "flex" }}>
          <a
            href={`/product/${id}`}
            className="btn btn-black"
            style={{ margin: "0% 0% 0% 0%", padding: "3%" }}
          >
            INFO
          </a>
          <a
            className="btn btn-success"
            href="#"
            role="button"
            style={{ margin: "0% 0% 0% 5%", padding: "3%" }}
          >
            Buy now
          </a>

          {role === 1 ? (
            <>
              <button
                type="button"
                style={{ margin: "0% 0% 5% 5%", padding: "5%" }}
                className="btn btn-danger"
                data-mdb-toggle="modal"
                data-mdb-target="#exampleModal"
              >
                X
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Delete
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-mdb-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Sicuro di voler eliminare definitivamente questo prodotto
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-mdb-dismiss="modal"
                      >
                        Chiudi
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-mdb-dismiss="modal"
                        onClick={deleteHandler}
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
