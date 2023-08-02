import styled from 'styled-components';
import { CardTicket } from './Card';
import types from './Types';
import TitleGray from './TitleOptions';

const Ticket = ({ ticketType, firstSelection, setFirstSelection, secundSelection, setsecundSelection }) => {
  const type = types(ticketType); 
  return (
    <>
      <TitleGray title={'Primeiro, escolha sua modalidade de ingresso'} />
      <CardSection>
        {type.slice(0, 2).map((e) => (
          <CardTicket
            key={e.name}
            e={e}
            firstSelection={firstSelection}
            setFirstSelection={setFirstSelection}
            setsecundSelection={setsecundSelection}
          />
        ))}
      </CardSection>
      { firstSelection.name === 'Presencial' &&
          <>
            <TitleGray title={'Ótimo! Agora escolha sua modalidade de hospedagem'} />
            <CardSection>
              {type.slice(2, 4).map((e) => (
                <CardTicket key={e.name} e={e} firstSelection={secundSelection} setFirstSelection={setsecundSelection} />
              ))}
            </CardSection>
          </>
      }

    </>
  );
};
  
export default Ticket;
  
const CardSection = styled.div` 
    display: flex;
  `;
