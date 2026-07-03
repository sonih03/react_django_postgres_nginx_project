// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
// import { useGetEmployee, usePutUpdateEmployee } from '../../no3_store/hooks/useEmployee';

// const EmployeeUpdate = ({ selectedId }) => {
//   const { data: emp, isLoading, error } = useGetEmployee(selectedId);
//   const [newEmp, setNewEmp] = useState(null);
//   // const [prevEmp, setPrevEmp] = useState(null);
//   const updateMutation = usePutUpdateEmployee();

//   // if (emp !== prevEmp) {
//   //   setNewEmp(emp ? { ...emp, name: emp.name || emp.username || '' } : null);
//   //   setPrevEmp(emp);
//   // }

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setNewEmp(prev => ({
//       ...prev, [name]: value
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     }
//     try {
//       updateMutation.mutate(newEmp);
//       alert("직원 정보가 수정되었습니다.");
//     } catch(error){
//       alert("직원 정보 수정 실패.");
//     }
//   };

//   if (isLoading) return <h3>Loading...</h3>;
//   if(error) return <h3>{error.message}</h3>


//   const hasEmp = !!emp;

//   return (
//     <FormContainer onSubmit={handleSubmit}>
//       <FormTitle>직원 정보 수정</FormTitle>
//       {hasEmp ? (
//         <>
//           <FormGrid>
//             <FormGroup>
//               <Label>이름</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={newEmp.name}
//                 onChange={handleChange}
//                 placeholder="이름"
//                 required// 애가 있으면 뭔 if문 안 써도 됨
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>이메일</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={newEmp.email}
//                 onChange={handleChange}
//                 placeholder="이메일"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>직업</Label>
//               <Input
//                 type="text"
//                 name="job"
//                 value={newEmp.job}
//                 onChange={handleChange}
//                 placeholder="직업"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>급여 (원)</Label>
//               <Input
//                 type="number"
//                 name="pay"
//                 value={newEmp.pay}
//                 onChange={handleChange}
//                 placeholder="급여"
//                 required
//               />
//             </FormGroup>
//           </FormGrid>
//           <SubmitButton type="submit">수정 완료</SubmitButton>
//         </>
//       ) : (
//         <NoSelectionMessage>수정할 직원을 목록에서 먼저 선택해주세요.</NoSelectionMessage>
//       )}
//     </FormContainer>
//   )


// export default EmployeeUpdate

// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   background: #ffffff;
//   padding: 8px 4px;
// `;

// const FormTitle = styled.h3`
//   font-size: 18px;
//   font-weight: 700;
//   color: #1e293b;
//   margin: 0 0 4px 0;
// `;

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 16px;

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Label = styled.label`
//   font-size: 13px;
//   font-weight: 600;
//   color: #475569;
// `;

// const Input = styled.input`
//   padding: 12px 14px;
//   font-size: 14px;
//   border-radius: 8px;
//   border: 1px solid #cbd5e1;
//   outline: none;
//   background: #f8fafc;
//   transition: all 0.2s ease;

//   &:focus {
//     border-color: #3b82f6;
//     background: #ffffff;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
//   }
// `;

// const SubmitButton = styled.button`
//   padding: 12px 24px;
//   font-size: 15px;
//   font-weight: 600;
//   color: #ffffff;
//   background: #3b82f6;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   align-self: flex-start;
//   transition: all 0.2s ease;

//   &:hover {
//     background: #2563eb;
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// const NoSelectionMessage = styled.p`
//   font-size: 14px;
//   color: #64748b;
//   margin: 0;
//   font-weight: 500;
//   background: #f8fafc;
//   padding: 24px;
//   border-radius: 8px;
//   text-align: center;
//   border: 1px dashed #cbd5e1;
// `;

import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGetEmployee, usePutUpdateEmployee } from '../../no3_store/hooks/useEmployee';

const EmployeeUpdate = ({ selectedId }) => {
  const { data: emp, isLoading, error } = useGetEmployee(selectedId);
  const [newEmp, setNewEmp] = useState(null);
  const updateMutation = usePutUpdateEmployee();

  useEffect(() => {
    if (emp) {
      setNewEmp({ ...emp });
    } else {
      setNewEmp(null);
    }
  }, [emp]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEmp(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateMutation.mutate(newEmp);
      alert("직원 정보가 수정되었습니다.");
    } catch (error) {
      alert("직원 정보 수정 실패.");
    }
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>{error.message}</h3>;

  const hasEmp = !!newEmp;

  return (
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>직원 정보 수정</FormTitle>
        {hasEmp ? (
            <>
              <FormGrid>
                <FormGroup>
                  <Label>이름</Label>
                  {/* 💡 [대정답] name과 value를 모두 username으로 전격 교체! */}
                  <Input
                      type="text"
                      name="username"
                      value={newEmp.username || ''}
                      onChange={handleChange}
                      placeholder="이름"
                      required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>이메일</Label>
                  <Input
                      type="email"
                      name="email"
                      value={newEmp.email || ''}
                      onChange={handleChange}
                      placeholder="이메일"
                      required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>직업</Label>
                  <Input
                      type="text"
                      name="job"
                      value={newEmp.job || ''}
                      onChange={handleChange}
                      placeholder="직업"
                      required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>급여 (원)</Label>
                  <Input
                      type="number"
                      name="pay"
                      value={newEmp.pay || ''}
                      onChange={handleChange}
                      placeholder="급여"
                      required
                  />
                </FormGroup>
              </FormGrid>
              <SubmitButton type="submit">수정 완료</SubmitButton>
            </>
        ) : (
            <NoSelectionMessage>수정할 직원을 목록에서 먼저 선택해주세요.</NoSelectionMessage>
        )}
      </FormContainer>
  );
};

export default EmployeeUpdate;

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
    border-color: rgba(20, 184, 166, 0.5);
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1), inset 0 1.5px 2px rgba(255, 255, 255, 0.5);
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
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.65) 0%, rgba(45, 212, 191, 0.25) 100%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 9999px;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 
    0 15px 25px rgba(20, 184, 166, 0.15), 
    inset 0 2.5px 3px rgba(255, 255, 255, 0.75), 
    inset 0 -5px 7px rgba(255, 255, 255, 0.4), 
    inset 0 4px 4px rgba(20, 184, 166, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.75) 0%, rgba(45, 212, 191, 0.35) 100%);
    transform: translateY(-1px);
    box-shadow: 0 15px 25px rgba(20, 184, 166, 0.22), inset 0 2.5px 3px rgba(255, 255, 255, 0.85);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NoSelectionMessage = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%);
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  border: 1px dashed rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3);
`;