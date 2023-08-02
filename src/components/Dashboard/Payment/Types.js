export default function types(ticketType) {
  const possibilities = [
    { id: '', name: 'Presencial', price: 100 }, 
    { id: '', name: 'Online', price: 200 },
    { id: '', name: 'Sem Hotel', price: 500 },
    { id: '', name: 'Com Hotel', price: 600 }
  ];

  for (let i = 0; i < ticketType.length; i++) {
    const { id, isRemote, includesHotel, price } = ticketType[i];

    if (!isRemote) {
      if (!includesHotel) {
        possibilities[0].id = id;
        possibilities[0].price = price;
      } else {
        possibilities[1].id = id;
        possibilities[1].price = price;
        possibilities[2].id = id;
        possibilities[2].price = 0;
      }
    } else {
      possibilities[3].id = id;
      possibilities[3].price = price;
    }
  }

  return possibilities;
}
