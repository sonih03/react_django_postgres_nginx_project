import React from 'react'
import SalesTable from '../../no2_components/sales/SalesTable'
import { useCurrentUser } from '../../no3_store/hooks/useUser'
import AuthControl from '../../no2_components/layout/AuthControl';
import styled from 'styled-components'

const SalesPage = () => {
  const {data:user} = useCurrentUser();
  if(!user){
    return(
      <AuthControl
        message='로그인 후 매출 정보를 조회할 수 있습니다.'
      />
    )
  }
  return (
    <Container>
      <SalesTable/>
    </Container>
  )
}

export default SalesPage

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: transparent;
  padding: 32px;
  box-sizing: border-box;
`;
