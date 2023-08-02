import React, { useState } from 'react';
import Card from 'react-credit-cards';

function Results(props) {
  const { data } = props;
  const [isFrontOfCardVisible, setIsFrontOfCardVisible] = useState(true);

  function toggleCardFlip(e) {
    e.preventDefault();
    setIsFrontOfCardVisible(!isFrontOfCardVisible);
  }

  return (
    <div className='mt-3'>
      <div className='mt-3 cursor-pointer' onClick={toggleCardFlip}>
        <Card
          cvc={data.cvc || ''}
          expiry={data.expiry || ''}
          name={data.name || ''}
          number={data.cardNumber || ''}
          focused={isFrontOfCardVisible ? 'number' : 'cvc'}
        />
      </div>
      
    </div>
  );
}

export default Results;
