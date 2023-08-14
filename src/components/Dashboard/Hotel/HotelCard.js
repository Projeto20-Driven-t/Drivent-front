import styled from 'styled-components';

export default function HotelCard(props) {
  const { id, name, image, vacancies, getHotelWithRooms } = props;
  return (
    <Card
      onClick={() => {
        getHotelWithRooms(id);
      }}
    >
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h2>Vagas Disponíveins:</h2>
      <p>{vacancies}</p>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  width: 190px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: start;
  padding: 14px;
  border-radius: 10px;
  height: 206px;
  margin-right: 16px;
  background-color: var(--font-gray);
  img: {
    width: 50px;
  }
  h2: {
    font-size: 20px;
  }
`;
