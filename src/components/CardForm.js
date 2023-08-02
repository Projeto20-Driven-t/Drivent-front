import React, { useState } from 'react';
import Results from './Results';
import check from '../assets/images/akar-icons_circle-check-fill.png';

function CardForm() {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [submittedData, setSubmittedData] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedData({ name, cardNumber, expiry, cvc });
  }
  
  return (
    <>
      <h1 className="titulo">Ingresso e pagamento</h1>
      <h2 className="subtitulo">Ingresso escolhido</h2>
      <div className="resumoContainer">
        <p className="pp">Presencial + Com Hotel</p>
        <span className="span">R$ 600</span>
      </div>
      <h2 className="subtitulo">Pagamento</h2>
      <form className="card-form">
        <Results data={submittedData} />
        <div className="form-group mt-4">
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <h3 className="desc">E.g.: 49 ... , 51 ... , 36 ... , 37 ...</h3>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="expiry-and-cvc-container mt-3">
            <input
              type="text"
              className="form-control expiration-date-field"
              placeholder="Valid Thru"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <input
              type="text"
              className="form-control cvc-field ml-3"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>
        </div>
      
      </form>
      <button
        type="submit"
        className="btn btn-primary btn-block cor"
        onClick={handleSubmit}
      >
    FINALIZAR PAGAMENTO
      </button>
      <div className="confirmadoContainer">
        <img src={check} alt='check'/>
        <div className="confirmado">
          <p><strong>Pagamento confirmado!</strong></p>
          Prossiga para escolha de hospedagem e atividades
        </div>
      </div>
    </>
  );
}

export default CardForm;
