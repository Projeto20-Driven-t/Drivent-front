import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { hotelsListService } from '../../../services/hotelApi';
import { Loading } from '../../Loading';
import styled from 'styled-components';
import HotelCard from './HotelCard';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = useToken();
  useEffect(() => {
    async function getHotelsList() {
      const hotelsList = await hotelsListService(token);
      setHotels(hotelsList);
      setIsLoading(false);
    }
    getHotelsList();
  }, []);

  if (isLoading) return <Loading>Loading...</Loading>;
  return (
    <HotelContainer>
      {hotels ? (
        hotels.map((hotel, index) => {
          return <HotelCard key={index} id={hotel.id} name={hotel.name} image={hotel.image} />;
        })
      ) : (
        <Loading>Hoteis Indisponiveis</Loading>
      )}
    </HotelContainer>
  );
}

const HotelContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    overflow-y: scroll;
`;

