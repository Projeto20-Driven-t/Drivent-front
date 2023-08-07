import styled from 'styled-components';

export default function HotelCard(props) {
  const { name, image } = props;
  return (
    <Card>
      <img src={image} alt={name}/>
      <h2>{name}</h2>
    </Card>
  );
}

const Card = styled.div`
    display: flex;
    flex-direction : column;
    align-items: start;
    padding:14px;
    border-radius: 10px;
    background-color: var(--font-gray);
    img: {
        width: 100%;
    }
    h2: {
        font-size: 20px;
    }
`;
