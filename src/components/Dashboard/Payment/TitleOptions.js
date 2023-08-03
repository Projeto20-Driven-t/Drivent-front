import styled from 'styled-components';

export default function TitleGray({ title }) {
  return (
    <TitleGrayStyle>
      <h1>{title}</h1>
    </TitleGrayStyle>
  );
}

const TitleGrayStyle = styled.div`
  font-weight: 400;
  padding-bottom: 17px;
  font-size: 20px;
  color: var(--font-gray);
`;
