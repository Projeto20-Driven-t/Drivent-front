import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getHotelWithRoomsByHotelId, hotelsListService } from '../../../services/hotelApi';
import { Loading } from '../../Loading';
import styled from 'styled-components';
import HotelCard from './HotelCard';
import Room from './Room';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hotelWithRooms, setHotelWithRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const token = useToken();

  async function getHotelWithRooms(hotelId) {
    try {
      const hotelAndRooms = await getHotelWithRoomsByHotelId(hotelId, token);
      //eslint-disable-next-line
      console.log(hotelAndRooms.Rooms);
      setHotelWithRooms(hotelAndRooms.Rooms);
    } catch (error) {
      alert(error);
    }
  }

  async function selectRoom(roomId) {
    setSelectedRoom(roomId);
  }

  useEffect(() => {
    async function getHotelsList(token) {
      const hotelsList = await hotelsListService(token);
      setHotels(hotelsList);
      setIsLoading(false);
    }
    getHotelsList();
  }, []);

  if (isLoading) return <Loading>Loading...</Loading>;
  return (
    <>
      <HotelContainer>
        <h1>Escolha de hotel e quarto</h1>
        {hotels ? (
          hotels.map((hotel, index) => {
            return (
              <HotelCard
                key={index}
                id={hotel.id}
                name={hotel.name}
                image={hotel.image}
                getHotelWithRooms={getHotelWithRooms}
              />
            );
          })
        ) : (
          <Loading>Hoteis Indisponiveis</Loading>
        )}
      </HotelContainer>

      <RoomsSection>
        <h3>Ótima pedida! Agora escolha seu quarto.</h3>
        <RoomsContainer>
          {hotelWithRooms ? (
            hotelWithRooms.map((room, index) => (
              <Room key={index} id={room.id} name={room.name} capacity={room.capacity} selectRoom={selectRoom} />
            ))
          ) : (
            <></>
          )}
        </RoomsContainer>
      </RoomsSection>
    </>
  );
}

const HotelContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  overflow-y: scroll;
`;
const RoomsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
`;
const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
