import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { Title } from '../../../assets/styles/payment';
import useToken from '../../../hooks/useToken';
import { Loading } from '../../../components/Loading';
import Ticket from '../../../components/Dashboard/Payment/Options';
import { CardTicketsBlock } from '../../../components/Dashboard/Payment/Card';
import { toast } from 'react-toastify';
import { createTicket, getTickets, payTicket, ticketTypeService } from '../../../services/ticketApi';

export default function Payment() {
  const [userHaveATicket, setUserHaveATicket] = useState();
  const [personalInformations, setPersonalInformations] = useState();
  const [ticketType, setTicketType] = useState();
  const [firstSelection, setFirstSelection] = useState({});
  const [secundSelection, setsecundSelection] = useState({});
  const [userSelect, setUserSelect] = useState();
 
  const [payment, setPayment] = useState(true);
  const token = useToken();
  useEffect(async() => {
    try {
      const personalInformations = await getPersonalInformations(token);
      setPersonalInformations(personalInformations);
      const arrTicketType = await ticketTypeService(token);
      setTicketType(arrTicketType);
      const ticketUser = await getTickets(token);
      setUserHaveATicket(ticketUser);
    } catch (error) {
      return <Loading>Loading...</Loading>;
    }
  }, [payment]);
  
  if (!ticketType) return <Loading>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Loading>;

  function reserve() {
    setUserSelect(firstSelection.name !== 'Online' ? secundSelection : firstSelection);
  }
  async function pay() {
    try {
      
    } catch (error) {
      return toast(error.message);
    }
    let body = { ticketTypeId: userSelect.id }; 
    const ticketUserNow = await createTicket(body, token);
    body = { ticketId: ticketUserNow.id };
    await payTicket(body, token);
    setPayment(!payment);
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
            <h1>Pagamento</h1>
            <>
              <CardTicketsBlock>
                <Text>
                  <div>
                    {firstSelection.name === 'Online'
                      ? firstSelection.name
                      : `${firstSelection.name} + ${secundSelection.name}`}
                  </div>
                </Text>
                <p>
                  R${' '}
                  {firstSelection.name === 'Online' ? firstSelection.price : firstSelection.price + secundSelection.price}
                </p>
              </CardTicketsBlock>
             
            </>
          </>
        )}
        {(firstSelection.name === 'Online' || (firstSelection.name === 'Presencial' && secundSelection.name)) && (
          <>
            <ValueTicket>
              Fechado! O total ficou em
              <strong>
                R${' '}
                {firstSelection.name === 'Online' ? firstSelection.price : secundSelection.price + firstSelection.price}
              </strong>
              . Agora é só confirmar
            </ValueTicket>
            <ButtonSelect onClick={userSelect ? pay : reserve}>
              {userSelect ? 'FINALIZAR PAGAMENTO' : 'RESERVAR INGRESSO'}
            </ButtonSelect>
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
