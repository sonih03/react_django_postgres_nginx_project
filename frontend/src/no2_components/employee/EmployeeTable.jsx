import React from 'react'
import styled from 'styled-components';
import { useGetEmployee } from '../../no3_store/hooks/useEmployee';



const EmployeeTable = ({selectedId}) => {
  const {data: emp, isLoading, error} = useGetEmployee(selectedId)

  if (!selectedId) {
    return (
      <TableWrapper>
        <Placeholder>
          <PlaceholderIcon>👥</PlaceholderIcon>
          <PlaceholderText>조회할 직원을 목록에서 선택해주세요.</PlaceholderText>
        </Placeholder>
      </TableWrapper>
    );
  }

  if(isLoading) return<h3>loading...</h3>
  if(error) return <h3>{error.message}</h3>



  return (
    <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              {emp && Object.keys(emp).map(key => (
                <Th key={key}>{key}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row>
              {emp && Object.values(emp).map(value => (
                <Td key={value}>{value}</Td>
              ))}
            </Row>
          </tbody>
        </StyledTable>
     
    </TableWrapper>
  )
}

export default EmployeeTable;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 100%);
  box-shadow: 
    inset 0 3px 4px rgba(255, 255, 255, 0.7),
    inset 0 -5px 10px rgba(255, 255, 255, 0.3),
    inset 0 4px 6px rgba(0, 0, 0, 0.02),
    0 15px 35px rgba(0, 0, 0, 0.05);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 500px;
`;

const Th = styled.th`
  background: rgba(255, 255, 255, 0.15);
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
`;

const Td = styled.td`
  padding: 18px 20px;
  font-size: 14px;
  color: #1e293b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  font-weight: 600;
`;

const Row = styled.tr`
  background: transparent;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background: transparent;
`;

const PlaceholderIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.7;
`;

const PlaceholderText = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 600;
`;
