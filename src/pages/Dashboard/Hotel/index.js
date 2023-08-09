import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getTickets } from '../../../services/ticketApi';
import { Loading } from '../../../components/Loading';
import Hotels from '../../../components/Dashboard/Hotel';

export default function Hotel() {
  // eslint-disable-next-line
  const [ticket, setTicket] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const token = useToken();

  useEffect(() => {
    const getUserTicketAndHotels = async(token) => { 
      const userTicket = await getTickets(token);
      setTicket(userTicket);
      setIsLoading(false);
    };
    getUserTicketAndHotels(token);
  }, []);

  if(isLoading) return <Loading>Loading...</Loading>;
  if(ticket.TicketType.includesHotel === false) {
    return <Loading>Sua modalidade de ingresso não inclui hospedagem
    Prossiga para a escolha de atividades</Loading>;
  }

  if(ticket.status !== 'PAID') {
    return (
      <Loading>
        Você precisa ter confirmado pagamento antes
        de fazer a escolha de hospedagem
      </Loading>
    );
  }; 

  return (
    <Hotels />
  );
}
