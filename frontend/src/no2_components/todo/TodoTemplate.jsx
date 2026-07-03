import React from 'react'
import styled from 'styled-components'

const TodoTemplate = ({children}) => {
  return (
    <Container>
        <HeaderTitle>일정관리</HeaderTitle>
        <Content>
            {children}
        </Content>
    </Container>
  )
}

export default TodoTemplate

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    rgba(196, 180, 253, 0.2) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 24px;
  box-shadow: 
    inset 0 3px 5px rgba(255, 255, 255, 0.6),
    inset 0 -5px 12px rgba(255, 255, 255, 0.2),
    0 15px 30px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  border: 1px solid rgba(196, 180, 253, 0.35);
`;

const HeaderTitle = styled.div`
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(139, 92, 246, 0.25) 100%);
  color: white;
  font-size: 20px;
  font-weight: 750;
  padding: 24px;
  text-align: center;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 
    inset 0 2.5px 3px rgba(255, 255, 255, 0.75),
    inset 0 -5px 7px rgba(255, 255, 255, 0.4),
    inset 0 4px 4px rgba(139, 92, 246, 0.15);
`;

const Content = styled.div`
  padding: 32px 24px;
  background: transparent;
`;