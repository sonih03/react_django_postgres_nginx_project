import React, { useState } from 'react'
import styled from 'styled-components';

import EmployeeList from '../no2_components/employee/EmployeeList'
import EmployeeTable from '../no2_components/employee/EmployeeTable'
import EmployeeRegister from '../no2_components/employee/EmployeeRegister'
import EmployeeUpdate from '../no2_components/employee/EmployeeUpdate'
// import { useDispatch, useSelector } from 'react-redux';
// import { setEmp, employeeDeleteSlice, SetMode } from '../no3_store/slices/employeeSlice';

import{//<------------------여기서 새로 import
  useDeleteEmployee
  
}from "../no3_store/hooks/useEmployee"

const EmployeePage = () => {
  const [selectedId,setSelectedId] = useState("");//<----잠시 임시방편?
  const [mode, SetMode] = useState("register")
  const deleteMutation = useDeleteEmployee();
  const handleDelete = async () => {
    if(!selectedId) {
      alert("삭제할 데이터를 선택하세요");//<---------------여기는 일단 주석처리?
      return;
    // }
    // dispatch(employeeDeleteSlice(selectedId))//이거 주석처리하고
    }
    try{
      await deleteMutation.mutateAsync(selectedId)//<----------------------이거 선언, 다음 emplist로 감
      alert("직원 정보가 삭제되었습니다.");
      setSelectedId(null);
    }
    catch(error){
      alert("직원 삭제 실패")
    }
  }



  return (
    <Container>

      <Title>
        Employee Management
      </Title>

      <Content>

        <LeftSection>

          <PinkCard>
            <SectionTitle>
              직원 목록
            </SectionTitle>

            <EmployeeList
              selectedId = {selectedId}
              setSelectedId = {setSelectedId}
            />
          </PinkCard>

        </LeftSection>

        <RightSection>

          <BlueCard>
            <SectionTitle>
              직원 정보
            </SectionTitle>

            <EmployeeTable
              selectedId = {selectedId}
            />
          </BlueCard>

          <BlueCard>

            <ButtonGroup>
              <ActionButton
                $active={mode === "register"}
                onClick={() => SetMode("register")}
              >
                등록
              </ActionButton>

              <ActionButton
                $active={mode === "update"}
                onClick={() => SetMode("update")}
              >
                수정
              </ActionButton>

              <DeleteButton
                $active={mode === "delete"}
                onClick={() => SetMode("delete")}
              >
                삭제
              </DeleteButton>
            </ButtonGroup>

            {
              mode === "register" ?

              <EmployeeRegister
                selectedId = {setSelectedId}
              />

              :

              mode === "update" ?

              <EmployeeUpdate
                key={selectedId}
                selectedId = {selectedId}
              />

              :

              mode === "delete" ?

              <DeleteBox>
                <p>⚠️ 선택한 직원의 데이터를 삭제하시겠습니까?</p>

                <DeleteConfirmButton
                  onClick={handleDelete}
                >
                  삭제 확인
                </DeleteConfirmButton>
              </DeleteBox>

              :

              null
            }

          </BlueCard>

        </RightSection>

      </Content>

    </Container>
  )
}

export default EmployeePage


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 32px;
  background: transparent;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
  color: #0f172a;
  letter-spacing: -0.02em;
`

const Content = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 900px){
    flex-direction: column;
  }
`

const LeftSection = styled.div`
  width: 280px;

  @media (max-width: 900px){
    width: 100%;
  }
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PinkCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 192, 203, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 192, 203, 0.4);
  box-shadow: 
    inset 0 3px 5px rgba(255, 255, 255, 0.6),
    inset 0 -5px 12px rgba(255, 255, 255, 0.2),
    0 15px 30px rgba(0, 0, 0, 0.03);
`

const BlueCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(173, 216, 230, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(173, 216, 230, 0.4);
  box-shadow: 
    inset 0 3px 5px rgba(255, 255, 255, 0.6),
    inset 0 -5px 12px rgba(255, 255, 255, 0.2),
    0 15px 30px rgba(0, 0, 0, 0.03);
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`

const ActionButton = styled.button`
  border: 1px solid ${({ $active }) => ($active ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.35)')};
  background: ${({ $active }) => ($active ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)')};
  color: ${({ $active }) => ($active ? '#7c3aed' : '#475569')};
  padding: 10px 24px;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  box-shadow: ${({ $active }) => ($active ? 'inset 0 3px 4px rgba(255, 255, 255, 0.8), inset 0 -5px 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)' : 'inset 0 1px 1px rgba(255, 255, 255, 0.5)')};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover{
    background: ${({ $active }) => ($active ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)')};
    color: ${({ $active }) => ($active ? '#7c3aed' : '#0f172a')};
    border-color: ${({ $active }) => ($active ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
  }
`

const DeleteButton = styled.button`
  border: 1px solid ${({ $active }) => ($active ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.35)')};
  background: ${({ $active }) => ($active ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)')};
  color: ${({ $active }) => ($active ? '#dc2626' : '#475569')};
  padding: 10px 24px;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  box-shadow: ${({ $active }) => ($active ? 'inset 0 3px 4px rgba(255, 255, 255, 0.8), inset 0 -5px 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(239, 68, 68, 0.2)' : 'inset 0 1px 1px rgba(255, 255, 255, 0.5)')};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover{
    background: ${({ $active }) => ($active ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)')};
    color: ${({ $active }) => ($active ? '#dc2626' : '#0f172a')};
    border-color: ${({ $active }) => ($active ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
  }
`

const DeleteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(254, 242, 242, 0.12) 0%, rgba(254, 242, 242, 0.03) 100%);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  align-items: flex-start;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4);

  p {
    margin: 0;
    color: #b91c1c;
    font-weight: 600;
    font-size: 14px;
  }
`

const DeleteConfirmButton = styled.button`
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: #dc2626;
  padding: 10px 24px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 
    inset 0 3px 4px rgba(255, 255, 255, 0.8), 
    inset 0 -5px 10px rgba(255, 255, 255, 0.3), 
    0 0 20px rgba(239, 68, 68, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%);
    box-shadow: 0 0 25px rgba(239, 68, 68, 0.3), inset 0 3px 4px rgba(255, 255, 255, 0.85);
  }
`