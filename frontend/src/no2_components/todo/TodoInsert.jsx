import React from 'react'
import styled from 'styled-components'
import { usePostRegisterTodo } from '../../no3_store/hooks/useTodo'
import { useState } from 'react'


const initialState = {
  "subject" : "",
  "checked": false,
}

const TodoInsert = () => {
    const [todo, setTodo ] = useState(initialState)
    const registerMutation = usePostRegisterTodo();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTodo(prev => ({
          ...prev,[name] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          await registerMutation.mutateAsync(todo)
          alert("등록성공")
        }catch{
          alert("등록실패")
        }
        
    }
        
  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text"
        name="subject"
        value={todo.subject}
        onChange={handleChange}
        required
        placeholder='할 일을 입력하세요...' 
      />
      <SubmitButton>입력</SubmitButton>
    </Form>
  )
}

export default TodoInsert

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  font-size: 15px;
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
  padding: 0 28px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(139, 92, 246, 0.25) 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
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