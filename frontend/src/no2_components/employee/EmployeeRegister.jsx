import React, { useState } from 'react'
import styled from 'styled-components'

// 💡 [대정답 1] 초기 객체 장부의 key를 name에서 username으로 전격 변경!
const initialEmp = {
    username: '', email: '', job: '', pay:''
}

import { usePostRegisterEmployee } from "../../no3_store/hooks/useEmployee";

const EmployeeRegister = () => {
    const [emp, setEmp] = useState(initialEmp);
    const registerMutation = usePostRegisterEmployee();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmp(prev => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await registerMutation.mutateAsync(emp);
            setEmp(initialEmp);
            alert("직원 등록이 완료되었습니다.");
        } catch {
            alert("직원 등록 실패");
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormTitle>새 직원 등록</FormTitle>
            <FormGrid>
                <FormGroup>
                    <Label>이름</Label>
                    {/* 💡 [대정답 2] name과 value 속성을 모두 username으로 일치화! */}
                    <Input
                        type="text"
                        name="username"
                        value={emp.username}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>이메일</Label>
                    <Input
                        type="email"
                        name="email"
                        value={emp.email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>직업</Label>
                    <Input
                        type="text"
                        name="job"
                        value={emp.job}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>급여 (원)</Label>
                    <Input
                        type="number"
                        name="pay"
                        value={emp.pay}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
            </FormGrid>
            <SubmitButton type="submit">등록하기</SubmitButton>
        </FormContainer>
    );
};

// 컴포넌트 정상 종료 (styled-components는 하단에 기존 주석 그대로 유지)
export default EmployeeRegister;

// --- 스타일드 컴포넌트 영역 ---
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: transparent;
  padding: 8px 4px;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;

const Input = styled.input`
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #0f172a;
  box-shadow: inset 0 1.5px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &:focus {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1), inset 0 1.5px 2px rgba(255, 255, 255, 0.5);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(139, 92, 246, 0.25) 100%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 9999px;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 
    0 15px 25px rgba(139, 92, 246, 0.15), 
    inset 0 2.5px 3px rgba(255, 255, 255, 0.75), 
    inset 0 -5px 7px rgba(255, 255, 255, 0.4), 
    inset 0 4px 4px rgba(139, 92, 246, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.75) 0%, rgba(139, 92, 246, 0.35) 100%);
    transform: translateY(-1px);
    box-shadow: 0 15px 25px rgba(139, 92, 246, 0.22), inset 0 2.5px 3px rgba(255, 255, 255, 0.85);
  }

  &:active {
    transform: translateY(0);
  }
`;