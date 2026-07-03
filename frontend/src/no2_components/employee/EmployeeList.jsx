import React, { useEffect } from 'react'
import styled from 'styled-components'
// import { useDispatch, useSelector } from 'react-redux';
// import { employeeAllGetSlice, select } from '../../no3_store/slices/employeeSlice';<-------------------주석처리

import { useAllGetEmployee } from "../../no3_store/hooks/useEmployee"

const EmployeeList = ({selectedId, setSelectedId}) => {
  const { data: empTable = [], isLoading, error } = useAllGetEmployee();

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>{error.message}</h3>;

  return (
      <Container>
        {empTable?.map(item => (
            <EmployeeButton
                key={item.id}
                $active={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
            >
              {/* 💡 [대정답] 이제 무조건 username만 깔끔하게 바라보도록 설정! */}
              <Name $active={selectedId === item.id}>{item.username}</Name>
              <Job $active={selectedId === item.id}>{item.job}</Job>
            </EmployeeButton>
        ))}
      </Container>
  );
};

// 컴포넌트 정상 종료 (styled-components는 하단에 기존 코드 그대로 유지해 줘!)
export default EmployeeList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const EmployeeButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(0, 250, 250, 0.4)' : 'rgba(255, 255, 255, 0.35)')};
  background: ${({ $active }) => ($active ? 'linear-gradient(135deg, rgba(0, 200, 200, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)')};
  box-shadow: ${({ $active }) => ($active ? 'inset 0 3px 4px rgba(255, 255, 255, 0.8), inset 0 -5px 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 200, 200, 0.2)' : 'inset 0 1px 1px rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: left;
  width: 100%;

  &:hover {
    background: ${({ $active }) => ($active ? 'linear-gradient(135deg, rgba(0, 200, 200, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)')};
    border-color: ${({ $active }) => ($active ? 'rgba(0, 250, 250, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? '#0f766e' : '#1e293b')};
  transition: color 0.2s ease;
  
  ${EmployeeButton}:hover & {
    color: ${({ $active }) => ($active ? '#0f766e' : '#0f172a')};
  }
`;

const Job = styled.div`
  font-size: 13px;
  color: ${({ $active }) => ($active ? '#0d9488' : '#64748b')};
  margin-top: 4px;
  font-weight: 500;
  transition: color 0.2s ease;
  
  ${EmployeeButton}:hover & {
    color: ${({ $active }) => ($active ? '#0d9488' : '#334155')};
  }
`;
