import React from 'react'
import ProductTable from '../../no2_components/sales/Product/ProductTable'
import styled from 'styled-components'
import { useCurrentUser} from '../../no3_store/hooks/useUser'
import AuthControl from '../../no2_components/layout/AuthControl';



const ProductPage = () => {
  const {data: user} = useCurrentUser();
  if(!user){
    return(
      <AuthControl
        message='로그인 후 상품 정보를 조회할 수 있습니다.'
      />
    )
  }
  return (
    <Container>
      <ProductTable/>
    </Container>
  )
}

export default ProductPage

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: transparent;
  padding: 32px;
  box-sizing: border-box;
`;
