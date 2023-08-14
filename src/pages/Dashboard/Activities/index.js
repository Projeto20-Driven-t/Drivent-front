import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title } from '../../../assets/styles/payment';
import useToken from '../../../hooks/useToken';
import { Loading } from '../../../components/Loading';
import { getTickets } from '../../../services/ticketApi';
import { getActivities, getActivitiesDate, postActivity } from '../../../services/activitiesApi';

export default function ActivitiesPage() {
  // eslint-disable-next-line
  const [ticketData, setTicketData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [activitiesDate, setActivitiesDate] = useState([]);
  const [activities, setActivities] = useState([]);
  const token = useToken();
  const [clickedIndex, setClickedIndex] = useState(null);
  function Dates(props) {
    const { id, weekDay, monthDay, month } = props.date;
    
    const handleClick = () => {
      setClickedIndex(id);
      getActivitiesByDateId(id);
    };

    return (
      <span
        style={{ backgroundColor: clickedIndex === id ? '#FFD37D' : '#E0E0E0' }}
        onClick={handleClick}
      > {weekDay}, 0{monthDay}/0{month}
      </span>
    );
  }

  async function getActivitiesByDateId(dateId,) {
    const response = await getActivities();
    const activities = response.filter(activity => activity.dateId === dateId);
    setActivities(activities);
  }

  function Activities(props) {
    const { id, name, location, startsAt, endsAt, slots } = props.activity;
    return (
      <div onClick={() => postActivity(id, token)}>
        {name}, {location}, {startsAt}, {endsAt}, {slots}
      </div>
    );
  }

  useEffect(async() => {
    try {     
      const ticket = await getTickets(token);
      setTicketData(ticket);
      const dates = await getActivitiesDate();
      setActivitiesDate(dates);
      setIsLoading(false);
    } catch (error) {
      return <Loading>Loading...</Loading>;
    }
  }, []);
 
  if(isLoading) return <Loading>Loading...</Loading>;
  if(ticketData.TicketType.isRemote === true) {
    return (
      <Loading>
        Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
      </Loading>
    );
  }
  if(ticketData.status !== 'PAID') {
    return (
      <Loading>
        Você precisa ter confirmado pagamento antes de fazer a escolha de atividades
      </Loading>
    );
  }

  return (
    <>
      <Title>Escolha de atividades</Title>
      <SubTitle>Primeiro, filtre pelo dia do evento:</SubTitle>
      <DatesContainer>
        {activitiesDate.map((value, i) => (
          <Dates date={value} key={i} />
        ))}
      </DatesContainer>
      <ActivitiesContainer>
        {activities.map((value, i) => (
          <Activities activity={value} key={i} />
        ))}
      </ActivitiesContainer>
    </>
  );
}

const SubTitle = styled.div`
  display: none;
  width: 396px;
  font-family: 'roboto';
  font-weight: 400;
  font-size: 20px;
  color: #8E8E8E;
  margin-top: 20px;
`;

const DatesContainer = styled.div`
  width: 700px;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 20px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 131px;
    height: 37px;
    font-family: 'roboto';
    font-weight: 400;
    font-size: 14px;
    background-color: ${(props) => (props.background)};
    margin-right: 10px;
    border-radius: 4px;
  }
`;

const ActivitiesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 70%;
  font-weight: 700;
  font-size: 10px;
  margin-top: 22px;
  border-radius: 4px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 79px;
    font-weight: 700;
    font-size: 10px;
    background-color: #F1F1F1;
    margin-bottom: 22px;
    margin-right: 10px;
    padding: 10px; 
    border-radius: 4px;
  }
`;
