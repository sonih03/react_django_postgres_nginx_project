import React, { useState } from 'react'
import { Modal, Input, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginUser } from '../../no3_store/hooks/useUser';

const {Title, Text} = Typography;


const initialState = {
  username: "",
  password: ""
}

const LoginForm = ({open, setOpen}) => {
  const [user, setUser] = useState(initialState)
  const navigate = useNavigate();
  const loginMutation = useLoginUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // const handleLogin = async (event) => {
  //
  //   if (user.username.trim() === "") {
  //     alert("이름을 넣어주세요!")
  //     return
  //   }
  //   if (user.username.trim() === "") {
  //     alert("아이디를 넣어주세요!")
  //     return
  //   }
  //     if(user.username.trim()){
  //       try{
  //       await loginMutation.mutateAsync(user)
  //       alert("로그인 성공")
  //       setOpen(false)//로그인 성공하면 로그인창 없애기
  //       setUser(initialState)//로그인해도 남아있던 아이디 비번 초기화
  //       navigate("/")
  //     }
  //     catch(error){
  //       alert(error?.message || "로그인 실패")
  //     }
  //     return
  //   }
  // }
  const handleLogin = async (event) => {
    // 1. 유효성 검사 (Validation)
    if (user.username.trim() === "") {
      alert("아이디를 넣어주세요!");
      return;
    }
    if (user.password.trim() === "") {
      alert("비밀번호를 넣어주세요!");
      return;
    }

    // 2. 비즈니스 로직 실행 (바로 try-catch 진입)
    try {
      // 리액트 쿼리 뮤테이션으로 { username, password } 전달 (가공은 API 단에서 처리함)
      await loginMutation.mutateAsync(user);

      alert("로그인 성공!");
      setOpen(false);       // 로그인 성공하면 모달 닫기
      setUser(initialState); // 입력 필드 깔끔하게 초기화
      navigate("/");
    } catch (error) {
      alert(error?.message || "로그인 실패");
    }
  };


  return (
    <>
      <Modal
        open = {open}
        onOk={handleLogin}
        onCancel={() => setOpen(false)}
        okText="로그인"
        cancelText="취소"
        confirmLoading = {loginMutation.isPending}
        width={450}
        centered
      >

        <Wrapper>
          <Title style={{textAlign: "center"}}>로그인</Title>
          <Description>
            계정에 로그인하여 서비스를 이용하세요.
          </Description>
          <InputGroup>
            <Label>아이디</Label>
            <Input
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="아이디 입력"
            />
          </InputGroup>
          <InputGroup>
            <Label>비밀번호</Label>
            <Input
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
            />
          </InputGroup>
          <Divider />
          <RegisterButton
            type="button"
            onClick={() => {
              setOpen(false)
              navigate("/")
            }}
          >
            닫기
          </RegisterButton>
        </Wrapper>
      </Modal>
    </>


    // <Container>
    //   <Form onSubmit={handleSubmit}>

    //     <Logo>MySystem</Logo>

        

    //   </Form>
    // </Container>
  )
}

export default LoginForm;

const Wrapper = styled.div`
  padding: 10px 0;
`

const Description = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 15px;
  margin-bottom: 32px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
`

const BaseButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 9999px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
`

const RegisterButton = styled(BaseButton)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  color: #334155;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);

  &:hover{
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%);
    border-color: rgba(255, 255, 255, 0.5);
    color: #0f172a;
  }
`