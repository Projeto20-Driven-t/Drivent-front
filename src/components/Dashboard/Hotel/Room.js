import styled from 'styled-components';
import { IoPersonOutline } from 'react-icons/io5';

export default function Room(props) {
  //eslint-disable-next-line
  const [isFull, setIsFull] = useState(false);
  const { id, name, capacity, setSelectedRoom } = props;
  const people = [];
  for (let i = 0; i < capacity; i++) {
    people.push(i);
  }
  return (
    <RoomCard
      disabled={isFull}
      onClick={() => {
        setSelectedRoom(id);
      }}
    >
      <p>{name}</p>
      <PeopleIconContainer>
        {people.map((person, index) => (
          <IoPersonOutline key={index} />
        ))}
      </PeopleIconContainer>
    </RoomCard>
  );
}

const RoomCard = styled.button`
  width: 190px;
  height: 45px;
  padding: 9px;
  border: 2px solid #cecece;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PeopleIconContainer = styled.div`
  width: auto;
  height: auto;
`;
