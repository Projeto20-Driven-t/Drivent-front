import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import check from '../assets/images/akar-icons_circle-check-fill.png';
import { payTicket } from '../../src/services/ticketApi';

function CardForm(props) {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [confirmado, setConfirmado] = useState(false);
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };
  async function handleSubmit(e) {
    let body = {
      ticketId: props.ticket.id,
      cardData: {
        issuer: 'MasterCard',
        number: state.number,
        name: state.name,
        expirationDate: state.expiry,
        cvv: state.cvc
      }
    };
    // eslint-disable-next-line
    const pay = await payTicket(body, props.token)
      .then(() => {
        props.setPayment(!props.payment);
        setConfirmado(true); 
      });
  };
  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  return (
    <>
      <h2 className="subtitulo">Ingresso escolhido</h2>
      <div className="resumoContainer">
        {/* eslint-disable-next-line */}
        <p className="pp">{props.first.name === 'Online' ? props.first.name : `${props.first.name}` + `+${props.second.name}`}</p>
        <span className="span">R$ {props.first.name === 'Online' ? props.first.price : props.second.price + props.first.price}</span>
      </div>
      <h2 className="subtitulo">Pagamento</h2>
      {(!confirmado ? <div className='containerExt'>
        <div className="containerInt">
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
          <form className="card-form">
            <div className="form-group mt-4">
              <input
                type="number"
                name="number"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <h3 className="desc">E.g.: 49 ... , 51 ... , 36 ... , 37 ...</h3>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Name"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <div className="expiry-and-cvc-container mt-3">
                <input
                  type="tel"
                  className="form-control expiration-date-field"
                  placeholder="Valid Thru"
                  name="expiry"
                  pattern="\d\d/\d\d"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="tel"
                  className="form-control cvc-field ml-3"
                  placeholder="CVC"
                  name="cvc"
                  pattern="\d{3,4}"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </div>

          </form>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block cor"
          onClick={handleSubmit}
          disabled={state.name.length === 0 || state.number.length < 16 || state.expiry.length < 5 || state.cvc.length < 3}
          
        >
          FINALIZAR PAGAMENTO
        </button>
      </div> : '')}

      {(confirmado ? <div className="confirmadoContainer">
        <img src={check} alt='check' />
        <div className="confirmado">
          <p><strong>Pagamento confirmado!</strong></p>
          Prossiga para escolha de hospedagem e atividades
        </div>
      </div> : <div></div>)}
    </>
  );
}

export default CardForm;
