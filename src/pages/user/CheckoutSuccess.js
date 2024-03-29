import React from "react";

const CheckoutSuccess = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <div className="payment">
              <div className="payment_header">
                <div className="check">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </div>
              </div>
              <div className="content">
                <h1>Pagamento avvenuto con successo!</h1>
                <p>
                  Perfavore, controlla la posta elettronica per visualuizzare la
                  fattura e il codice di tracciabilità per la consegna (in
                  genere inviata entro 2h).
                </p>
                <a href="/">Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
