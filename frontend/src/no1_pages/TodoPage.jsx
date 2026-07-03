import React from 'react'
import TodoTemplate from '../no2_components/todo/TodoTemplate'
import TodoInsert from '../no2_components/todo/TodoInsert'
import TodoList from '../no2_components/todo/TodoList'
import styled from 'styled-components'


const TodoPage = () => {



  return (
    <Container>
      <TodoTemplate>
        <TodoInsert />
        <TodoList />
      </TodoTemplate>
    </Container>
    
  )
}

export default TodoPage

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: transparent;
  padding: 32px;
  box-sizing: border-box;
`;