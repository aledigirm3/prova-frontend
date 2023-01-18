import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../configuration.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UserDashboard = () => {
  const controller = new AbortController();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [update, setUpdate] = useState(false);

  //CARRELLO
  const [prodotti, setProdotti] = useState([]);
  const [total, setTotal] = useState(0);

  //ADMIN
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState("");

  useEffect(() => {
    axios
      .get(`${config.api.uri}/category`, { signal: controller.signal })
      .then((result) => {
        setCategorys(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryToDelete, name]);

  useEffect(() => {
    toast.loading("Caricamento");
    axios
      .get(`${config.api.uri}/auth/actions/getme`, { withCredentials: true })
      .then(async (res) => {
        await setUser(res.data.user);

        axios
          .get(`${config.api.uri}/cart/actions/displayproduct`, {
            withCredentials: true,
          })
          .then(async (result) => {
            setProdotti(result.data.result.prodotti);
            let tot = 0;
            {
              await result.data.result.prodotti.map((p) => (tot += p.price));
            }
            setTotal(tot);
            toast.dismiss();
          })
          .catch((err) => {
            console.log(err);
            toast.dismiss();
          });
      })
      .catch((err) => {
        toast.dismiss();
        navigate("/signin");
        console.log(err);
      });
  }, [update]);

  const deleteProduct = (id) => {
    axios
      .put(
        `${config.api.uri}/cart/actions/removeproduct/`,
        { id },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setUpdate(!update);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitCategory = () => {
    axios
      .post(
        `${config.api.uri}/category`,
        { name, description },
        { withCredentials: true }
      )
      .then((result) => {
        setName("");
        setDescription("");
        toast.success("Categoria aggiunta con successo");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  const handleDeleteCategory = () => {
    if (categoryToDelete === "") {
      return toast.warning("Nessuna categoria selezionata");
    }
    axios
      .delete(`${config.api.uri}/category/${categoryToDelete}`, {
        withCredentials: true,
      })
      .then((result) => {
        setCategoryToDelete("");
        toast.success("Categoria e prodotti correlati eliminati con successo");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  //PAY
  const handlePay = () => {
    axios
      .post(
        `${config.api.uri}/stripe/create-checkout-session`,
        {
          prodotti,
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
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="container-fluid dashboard_container"
        style={{ margin: "3%" }}
      >
        <div className="row">
          <div className="col-sm-4">
            <div className="card card_dashboard">
              <div className="card-header">
                <b>User Dashboard</b>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {user.name}</li>
                <li className="list-group-item">E-mail {user.email}</li>
                <li className="list-group-item">
                  Join at {new Date(user.createdAt).toLocaleDateString()}
                </li>
                <li className="list-group-item">
                  {user.role === 1 ? "ADMIN" : "USER"}
                </li>
              </ul>
            </div>
          </div>
          {user.role === 1 ? (
            <div className="col-sm-8">
              <a
                className="btn btn-success"
                href="/admin/create/product"
                role="button"
              >
                + product
              </a>
              <div className="category" style={{ margin: "1% 0% 0% 0%" }}>
                <button
                  type="button"
                  className="btn btn-success"
                  data-mdb-toggle="modal"
                  data-mdb-target="#exampleModal"
                >
                  + category
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
                          Add category
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-mdb-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-outline mb-4">
                          <input
                            onChange={(e) => {
                              controller.abort();
                              setName(e.target.value);
                            }}
                            type="text"
                            id="form4Example1"
                            className="form-control"
                            value={name}
                          />
                          <label className="form-label" htmlFor="form4Example1">
                            Nome
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            id="form4Example1"
                            className="form-control"
                            value={description}
                          />
                          <label className="form-label" htmlFor="form4Example1">
                            Descrizione
                          </label>
                        </div>
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
                          onClick={handleSubmitCategory}
                        >
                          Aggiungi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-mdb-toggle="modal"
                  data-mdb-target="#exampleModal2"
                  style={{ margin: "0% 0% 0% 1%" }}
                >
                  - category
                </button>
                <div
                  className="modal fade"
                  id="exampleModal2"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Delete category
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-mdb-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <select
                          onChange={(e) => setCategoryToDelete(e.target.value)}
                          id="category"
                          name="cars"
                          className="form-control select select-initialized"
                          value={categoryToDelete}
                        >
                          <option value="">Scegli la categoria</option>
                          {categorys.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
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
                          onClick={handleDeleteCategory}
                        >
                          Elimina
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <h1>CARRELLO</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Immagine</th>
            <th scope="col">Nome</th>
            <th scope="col">Prezzo</th>
            <th scope="col">Rimuovi</th>
          </tr>
        </thead>
        <tbody>
          {prodotti.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={p.image}
                  className="img-fluid rounded-pill"
                  alt="Townhouses and Skyscrapers"
                  style={{ maxWidth: "20%" }}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.price}$</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-rounded"
                  data-mdb-ripple-color="dark"
                  onClick={() => deleteProduct(p._id)}
                >
                  &#x2718;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded-5">
        <div className="container-fluid  d-flex align-items-center">
          <a className="navbar-brand me-2" href="https://mdbgo.com/">
            <img
              src="https://easy-data.mdbgo.io/img/logo.png"
              height="27"
              alt=""
              loading="lazy"
              style={{ margintop: "-1px" }}
            />
          </a>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link mt-1" href="#">
                <strong>TOTALE: </strong> <u>${total}</u>
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-link px-3 me-1 "
              onClick={handlePay}
            >
              PAGA
            </button>
            <a type="button" className="btn btn-link px-3 me-1" href="/">
              Continua lo shopping
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserDashboard;
