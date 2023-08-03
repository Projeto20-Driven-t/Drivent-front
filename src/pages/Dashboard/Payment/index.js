import React from 'react';
import CardForm from '../../../components/CardForm';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { Title } from '../../../assets/styles/payment';
import useToken from '../../../hooks/useToken';
import { Loading } from '../../../components/Loading';
import Ticket from '../../../components/Dashboard/Payment/Options';
import { CardTicketsBlock } from '../../../components/Dashboard/Payment/Card';
import { toast } from 'react-toastify';
import { createTicket, createTicketType, getTickets, payTicket, ticketTypeService } from '../../../services/ticketApi';

export default function Payment() {
  const [userHaveATicket, setUserHaveATicket] = useState();
  const [personalInformations, setPersonalInformations] = useState();
  const [ticketType, setTicketType] = useState();
  const [firstSelection, setFirstSelection] = useState({});
  const [secundSelection, setsecundSelection] = useState({});
  const [userSelect, setUserSelect] = useState();
  const [buttomSelect, setButtomSelect] = useState(false);
  const [payment, setPayment] = useState(true);
  const [ticketUserNow, setTicketUserNow]=useState();
  const [goodTicketType, setGoodTicketType]=useState({});

  const token = useToken();
  useEffect(async() => {
    try {
      const personalInformations = await getPersonalInformations(token);
      setPersonalInformations(personalInformations);
      console.log('personalInformations', personalInformations);

      const arrTicketType = await ticketTypeService(token);
      setTicketType(arrTicketType);
      console.log('arrTicketType', arrTicketType);

      const ticketUser = await getTickets(token);
      setUserHaveATicket(ticketUser);
    } catch (error) {
      return <Loading>Loading...</Loading>;
    }
  }, [buttomSelect]);

  if (!ticketType) return <Loading>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Loading>;

  async function reserve() {
    //createTicketType -> passar o ticketTypeId por props
    const body={
      name: 'aaaa',
      price: 50,
      isRemote: false,
      includesHotel: true
    };
    setGoodTicketType(await createTicketType(body, token));
    setButtomSelect(true);
    setUserSelect(firstSelection.name !== 'Online' ? secundSelection : firstSelection);
  }
  async function pay() {
    let body = { ticketTypeId: goodTicketType.id };
    const ticketUserNowAux = await createTicket(body, token);
    setTicketUserNow(ticketUserNowAux);
    body = { ticketId: ticketUserNowAux.id };
    await payTicket(body, token);
    setPayment(!payment);
    console.log('ticketNow', ticketUserNowAux);
  }

  if (personalInformations) {
    return (
      <>
        <Title>Ingresso e pagamento</Title>
        {!userSelect && (
          <Ticket
            ticketType={ticketType}
            firstSelection={firstSelection}
            setFirstSelection={setFirstSelection}
            secundSelection={secundSelection}
            setsecundSelection={setsecundSelection}
          />
        )}
        {userSelect && (
          <>
            <CardForm first={firstSelection} second={secundSelection} goodTicketType={goodTicketType} token={token} payment={payment} setPayment={setPayment}/>
          </>
        )}
        {(firstSelection.name === 'Online' || (firstSelection.name === 'Presencial' && secundSelection.name)) && (
          <>
            {(userSelect ? '' : <ValueTicket>
              Fechado! O total ficou em
              <strong>
                R${' '}
                {firstSelection.name === 'Online' ? firstSelection.price : secundSelection.price + firstSelection.price}
              </strong>
              . Agora é só confirmar
            </ValueTicket>)}
            {(userSelect ? '' : <ButtonSelect onClick={userSelect ? pay : reserve}>
               RESERVAR INGRESSO
            </ButtonSelect>)}
          </>
        )}
      </>
    );
  } else if (!personalInformations) {
    return <Loading>{'Você precisa completar sua inscrição'}</Loading>;
  } else {
    return 'loading...';
  }
}

const ValueTicket = styled.h1`
  font-weight: 400;
  padding-bottom: 17px;
  font-size: 20px;
  color: var(--font-gray);
`;

export const ButtonSelect = styled.button`
  width: 182px;
  height: 37px;
  margin: ${(props) => props.margin || '0'};
  background: var(--button-confirm);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  &:hover{
    cursor: pointer;
  }
`;
export const Text = styled.div`
background-color: red;
`;
