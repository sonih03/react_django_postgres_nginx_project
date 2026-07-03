import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../no3_store/hooks/useUser'
import {logout} from '../../no3_store/apis/user.api.js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import LoginFormModal from '../user/LoginFormModal'
import RegisterFormModal from '../user/RegisterFormModal'



const HeaderBar = () => {
    const {data: user} = useCurrentUser();
    const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  // const {data:user} = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getCurrentUser,
  //   initialData: getCurrentUser
  // })
  const navigate = useNavigate();
  // const logout = useLogoutUser();
  const queryClient = useQueryClient();


  const handleLogout = () => {
    logout()
      alert("로그아웃 되었습니다.")
    queryClient.removeQueries({
        queryKey:["currentUser"]
  })

    navigate("/")
  }



  return (
    <>
      <Container>
        <Logo onClick={() => navigate("/")}>
          KSLOVE
        </Logo>
        <Menu>
          {user ?
            <UserSection>
              <UserName>
                {user.user?.username}
              </UserName>
              <LogoutButton onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </UserSection>
            :
            <ButtonGroup>
              <LoginButton onClick={() => setLoginOpen(true)}>
                로그인
              </LoginButton>
              <RegisterButton onClick={() => setRegisterOpen(true)}>
                회원가입
              </RegisterButton>
            </ButtonGroup>
          }
        </Menu>
      </Container>
      <LoginFormModal
        open={loginOpen}
        setOpen={setLoginOpen}
      />
      <RegisterFormModal 
        open = {registerOpen}
        setOpen = {setRegisterOpen}
      />
    </>
    
  )
}

export default HeaderBar


const Container = styled.header`
  width: 100%;
  height: 70px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    inset 0 3px 4px rgba(255, 255, 255, 0.7),
    inset 0 -5px 10px rgba(255, 255, 255, 0.3),
    inset 0 4px 6px rgba(0, 0, 0, 0.02),
    0 15px 35px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px){
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover{
    opacity: 0.9;
    filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15));
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const UserName = styled.div`
  color: #1e293b;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(244, 247, 255, 0.15) 0%, rgba(244, 247, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 8px 16px;
  border-radius: 9999px;
  box-shadow: 
    inset 0 2px 3px rgba(255, 255, 255, 0.75),
    inset 0 -3px 5px rgba(255, 255, 255, 0.3),
    inset 0 2px 2px rgba(31, 38, 135, 0.05);
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BaseButton = styled.button`
  border: none;
  outline: none;
  padding: 9px 20px;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover{
    transform: translateY(-1px);
  }
`;

const LoginButton = styled(BaseButton)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  color: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);

  &:hover{
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const RegisterButton = styled(BaseButton)`
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(139, 92, 246, 0.25) 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 
    0 15px 25px rgba(139, 92, 246, 0.15), 
    inset 0 2.5px 3px rgba(255, 255, 255, 0.75), 
    inset 0 -5px 7px rgba(255, 255, 255, 0.4), 
    inset 0 4px 4px rgba(139, 92, 246, 0.15);

  &:hover{
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.75) 0%, rgba(139, 92, 246, 0.35) 100%);
    box-shadow: 0 15px 25px rgba(139, 92, 246, 0.22), inset 0 2.5px 3px rgba(255, 255, 255, 0.85);
  }
`;

const LogoutButton = styled(BaseButton)`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.65) 0%, rgba(251, 146, 60, 0.25) 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 
    0 15px 25px rgba(239, 68, 68, 0.12), 
    inset 0 2.5px 3px rgba(255, 255, 255, 0.75), 
    inset 0 -5px 7px rgba(255, 255, 255, 0.4), 
    inset 0 4px 4px rgba(239, 68, 68, 0.15);

  &:hover{
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.75) 0%, rgba(251, 146, 60, 0.35) 100%);
    box-shadow: 0 15px 25px rgba(239, 68, 68, 0.18), inset 0 2.5px 3px rgba(255, 255, 255, 0.85);
  }
`;