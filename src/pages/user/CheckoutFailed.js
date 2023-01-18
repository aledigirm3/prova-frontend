import React from "react";

const CheckoutFailed = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <div className="payment">
              <div className="payment_header">
                <div className="check">
                  <i className="fa" aria-hidden="true"></i>
                </div>
              </div>
              <div className="content">
                <h1>Opss... Qualcosa è andato storto</h1>
                <p>Il pagamento non è andato a buon fine. Perfavore riprova!</p>
                <p>
                  Se il problema dovesse ripresentarsi scrivere a:
                  prvwebapp@gmail.com
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

export default CheckoutFailed;
