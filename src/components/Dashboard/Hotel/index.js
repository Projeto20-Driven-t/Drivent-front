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
  // eslint-disable-next-line
  const [selectedRoom, setSelectedRoom] = useState(null);
  const token = useToken();

  useEffect(() => {
    async function getHotelsList(token) {
      const hotelsWithVacanciesList = await hotelsListService(token);
      setHotels(hotelsWithVacanciesList);
      setIsLoading(false);
    }
    getHotelsList(token);
  }, []);

  async function getHotelWithRooms(hotelId) {
    try {
      const hotelWithRooms = await getHotelWithRoomsByHotelId(hotelId, token);
      // eslint-disable-next-line
      console.log(hotelWithRooms.Rooms);
      setHotelWithRooms(hotelWithRooms.Rooms); 
    } catch (error) {
      alert(error);
    }
  }

  /*
  async function getHotelsWithVacancies(HotelsAndRooms) {
    const HotelsWithVacancies = [];
    HotelsAndRooms.map(hotel => {
      let hotelCapacity = hotel.Rooms.reduce(function(acc, currentValue) {
        return acc + currentValue.capacity;
      }, 0);
      let hotelBookings = HotelsAndRooms.map(hotel => {
        hotel.Rooms.map(room => {

        });
      });
    });
  }
*/

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
                vacancies={hotel.vacancies}
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
              <Room key={index} id={room.id} name={room.name} capacity={room.capacity} setSelectRoom={setSelectedRoom} />
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
