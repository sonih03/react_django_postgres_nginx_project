import React, { useState } from 'react'
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdRemoveCircleOutline
} from "react-icons/md"

import styled from 'styled-components'
import { usePutToggleTodo, usePutUpdateTodo, useGetTodo, useDeleteTodo } from '../../no3_store/hooks/useTodo';


const TodoListChild = ({item}) => {
    const updateMutation = usePutUpdateTodo();
    const deleteMutation = useDeleteTodo();
    const toggleMutation = usePutToggleTodo();
  
    
    const[editing,setEditing] = useState(false)
    const[todo,setTodo] = useState(item)

    // const handleToggle = () => {
    //     dispatch(todoPutSlice({ ...item, checked: !item.checked }));
    //     setEditing(false);
    // }
    
    const handleToggle = () => {
      
      try{
        setTodo(prev => ({...prev, checked:!todo.checked}))
        toggleMutation.mutateAsync({...todo, checked: !todo.checked});
        setEditing(false);
        alert("토글 성공")
      }
      catch{
        alert("토글 실패")
      }
            
        
        
    }

    const handleUpdate = () => {
      if (todo.subject.trim() !== ""){
        }
      try{
        updateMutation.mutateAsync(todo);
          setEditing(false);
          alert("수정 성공")
      }
      catch{
        alert("수정 실패")
      }
            
        
        
      
    }

  return (
    <TodoItem>
      <CheckboxWrapper onClick={handleToggle}> 
        {
        todo.checked ?
        <CheckedIcon/> : <UncheckedIcon/>
        }
      </CheckboxWrapper>
      
      <TextWrapper>
        {
            editing ?
                <EditInput
                    type='text'
                    name="subject"
                    value={todo.subject}
                    onChange={(e) => setTodo(
                      prev => ({
                        ...prev,
                        [e.target.name] : e.target.value
                      }))}
                    onBlur = {handleUpdate}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") handleUpdate();
                    }}
                    autoFocus
                />
                :
                <TodoText
                  $checked={todo.checked}
                  onDoubleClick={() => {
                    setTodo(item);
                    setEditing(true);
                  }}
                >
                   {item.subject} 
                </TodoText>
        }
      </TextWrapper>
      
      <RemoveButton
        onClick={() => deleteMutation.mutateAsync(item.id)}
      >
        <MdRemoveCircleOutline size={20} />
      </RemoveButton>
    </TodoItem>
  )
}

export default TodoListChild


const TodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 10px 20px rgba(31, 38, 135, 0.02), 
    inset 0 2px 3px rgba(255, 255, 255, 0.7), 
    inset 0 -3px 5px rgba(255, 255, 255, 0.2);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 100%);
    border-color: rgba(255, 255, 255, 0.55);
    transform: translateX(2px);
  }
`;

const CheckboxWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

const CheckedIcon = styled(MdCheckBox)`
  color: #a855f7;
  font-size: 24px;
`;

const UncheckedIcon = styled(MdCheckBoxOutlineBlank)`
  color: #cbd5e1;
  font-size: 24px;
  
  &:hover {
    color: #a855f7;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const TodoText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $checked }) => ($checked ? '#94a3b8' : '#1e293b')};
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
  cursor: pointer;
  user-select: none;
  word-break: break-all;
`;

const EditInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  border-bottom: 2px solid #a855f7;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  outline: none;
  padding: 2px 0;
`;

const RemoveButton = styled.div`
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: 12px;

  &:hover {
    color: #f43f5e;
    transform: scale(1.1);
  }
`;