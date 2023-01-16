import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../configuration";
import Card from "../component/Card";
import { toast } from "react-toastify";

const Home = () => {
  const controller = new AbortController();
  const [userRole, setUserRole] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [update, setUpdate] = useState(false);
  // ordinamento
  const [sort, setSort] = useState("");
  // products from the backend
  const [products, setProducts] = useState([]);
  // categories from the backend
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    axios
      .get(`${config.api.uri}/category`)
      .then((result) => {
        setCategorys(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Controllo ruolo utente da passare a card
    axios
      .get(`${config.api.uri}/auth/actions/getme`, { withCredentials: true })
      .then((result) => setUserRole(result.data.user.role))
      .catch(() => setUserRole(0));
  }, []);
  /* ======================================================PAGINATION==================================================== */
  const limit = 3;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handlePrevious = () => {
    controller.abort();
    const p = page;
    if (p === 1) {
      return;
    }

    setPage(p - 1);
    setUpdate(!update);
  };

  const handleNext = () => {
    controller.abort();
    const p = page;
    if (p === pageCount) {
      return;
    }

    setPage(p + 1);
    setUpdate(!update);
  };
  /* ======================================================================================================================= */

  const handleCategorySearch = (e) => {
    controller.abort();
    setCategory(e.target.value);
    setSearch("");
    setSort("");
    setPage(1);
    setUpdate(!update);
  };

  const handleSearch = (e) => {
    controller.abort();
    setSearch(e.target.value);
    setSort("");
    setPage(1);
    setUpdate(!update);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.loading("Caricamento");
      axios
        .get(
          `${config.api.uri}/product/actions/search?name=${search}&category=${category}&page=${page}&limit=${limit}&sort=${sort}`,
          { signal: controller.signal }
        )
        .then((result) => {
          setProducts(result.data.result);
          if (category === "") {
            axios
              .get(`${config.api.uri}/product/count?name=${search}`)
              .then((result) => {
                let pg = Math.floor(result.data.data.count / 3);
                if (result.data.data.count % 3 !== 0) {
                  pg += 1;
                }
                setPageCount(pg);
              })
              .catch((err) => console.log(err));
          } else {
            axios
              .get(
                `${config.api.uri}/product/count?name=${search}&category=${category}`
              )
              .then((result) => {
                let pg = Math.floor(result.data.data.count / 3);
                if (result.data.data.count % 3 !== 0) {
                  pg += 1;
                }
                setPageCount(pg);
              })
              .catch((err) => console.log(err));
          }
          toast.dismiss();
        })
        .catch((err) => {
          console.log(err);
          toast.dismiss();
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [update]);

  return (
    <div>
      <div className="filtri">
        <nav className="navbar navbar-light bg-light">
          <div style={{ display: "flex", margin: "10px 50px 20px" }}>
            <input
              className="form-control mr-sm-2"
              onChange={handleSearch}
              type="search"
              placeholder="Search"
              style={{ margin: "auto 50px auto" }}
              aria-label="Search"
              value={search}
            />
            <select
              id="category"
              onChange={handleCategorySearch}
              name="cars"
              className="form-control select select-initialized"
              style={{ margin: "auto 50px auto" }}
              value={category}
            >
              <option value="">Categoria: nessuna</option>
              {categorys.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn"
              onClick={() => {
                controller.abort();
                setSort("asc");
                setUpdate(!update);
              }}
            >
              PREZZO CRESCENTE
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                controller.abort();
                setSort("desc");
                setUpdate(!update);
              }}
            >
              PREZZO DECRESCENTE
            </button>
          </div>
        </nav>
      </div>
      <div className="row">
        {products.map((p) => (
          <Card
            key={p._id}
            id={p._id}
            image={p.image}
            productName={p.name}
            prodCategory={p.category.name}
            price={p.price}
            role={userRole}
          />
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ margin: "0% 0% 0% 43%" }}>
          <li className="page-item">
            <button
              type="button"
              className="btn btn-light"
              data-mdb-ripple-color="dark"
              onClick={handlePrevious}
            >
              prev
            </button>
          </li>
          <li className="page-item"> {page} </li>
          <li className="page-item">
            <button
              type="button"
              className="btn btn-light"
              data-mdb-ripple-color="dark"
              onClick={handleNext}
            >
              next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
