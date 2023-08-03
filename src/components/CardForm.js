import React, { useState } from 'react';
import Results from './Results';
import check from '../assets/images/akar-icons_circle-check-fill.png';
import { createTicket, payTicket } from '../../src/services/ticketApi';

function CardForm(props) {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [submittedData, setSubmittedData] = useState({});
  const [confirmado, setConfirmado] = useState(false);
  async function handleSubmit(e) {
    setSubmittedData({ name, cardNumber, expiry, cvc });
    console.log('user', props.userSelect.id);
    let body = { ticketTypeId: props.userSelect.id };
    const ticketUserNowAux = await createTicket(body, props.token);
    body = {
      ticketId: ticketUserNowAux.id,
      cardData: {
        issuer: 'MasterCard',
        number: cardNumber,
        name,
        expirationDate: expiry,
        cvv: cvc
      }
    };
    console.log('body', body);
    await payTicket(body, props.token)
      .then(() => {
        props.setPayment(!props.payment);
        setConfirmado(true);
      })
      .catch(() => console.log(ticketUserNowAux.id));
  }

  return (
    <>
      <h2 className="subtitulo">Ingresso escolhido</h2>
      <div className="resumoContainer">
        <p className="pp">{props.first.name === 'Online' ? props.first.name : `${props.first.name}` + `+${props.second.name}`}</p>
        <span className="span">R$ {props.first.name === 'Online' ? props.first.price : props.second.price + props.first.price}</span>
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
            onChange={(e) => {
              const CN = e.target.value;
              setCardNumber(e.target.value);
              setSubmittedData({ name, CN, expiry, cvc });
            }}
          />
          <h3 className="desc">E.g.: 49 ... , 51 ... , 36 ... , 37 ...</h3>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              const name1 = e.target.value;
              setName(e.target.value);
              setSubmittedData({ name1, cardNumber, expiry, cvc });
            }}
          />
          <div className="expiry-and-cvc-container mt-3">
            <input
              type="text"
              className="form-control expiration-date-field"
              placeholder="Valid Thru"
              value={expiry}
              onChange={(e) => {
                const exp = e.target.value;
                setExpiry(e.target.value);
                setSubmittedData({ name, cardNumber, exp, cvc });
              }}
            />
            <input
              type="text"
              className="form-control cvc-field ml-3"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => {
                const CV = e.target.value;
                setCvc(e.target.value);
                setSubmittedData({ name, cardNumber, expiry, CV });
              }}
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
      {(confirmado ? <div className="confirmadoContainer">
        <img src={check} alt='check' />
        <div className="confirmado">
          <p><strong>Pagamento confirmado!</strong></p>
          Prossiga para escolha de hospedagem e atividades
        </div>
      </div> : '')}
    </>
  );
}

export default CardForm;
