// SiderBar.jsx

import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

const SiderBar = () => {

    const [open, setOpen] = useState(false)
    const [salesOpen, setSaleOpen] = useState(false)
    const location = useLocation()

  return (
    <>

        {/* 모바일 상단 바 */}
        <MobileTopBar>

            <MenuButton
                onClick={() => setOpen(!open)}
            >
                ☰
            </MenuButton>

            <MobileLogo>
                MySystem
            </MobileLogo>

        </MobileTopBar>

        {/* 사이드바 */}
        <Container $open={open}>

            <Menu>

                <MenuItem
                    to="/"
                    $active={location.pathname === "/"}
                    onClick={() => setOpen(false)}
                >
                    Home
                </MenuItem>

                <MenuItem
                    to="/todo"
                    $active={location.pathname === "/todo"}
                    onClick={() => setOpen(false)}
                >
                    할일
                </MenuItem>

                <MenuItem
                    to="/employee"
                    $active={location.pathname === "/employee"}
                    onClick={() => setOpen(false)}
                >
                    고용인 정보
                </MenuItem>
                <MenuWrapper>
                    <MenuItemButton
                    
                        $active={salesOpen}
                        onClick={() => setSaleOpen(prev => !prev)}
                    >
                        <span>판매 관리</span>
                        {salesOpen ? <MdExpandLess/> : <MdExpandMore />}
                    </MenuItemButton>
                </MenuWrapper>
                {salesOpen && (
                    <SubMenu>
                        <MenuItem
                        to="/product"
                        $active={location.pathname === "/product"}
                        onClick={() => setOpen(false)}
                >
                        상품 정보
                        </MenuItem>
                        <MenuItem
                        to="/sales"
                        $active={location.pathname === "/sales"}
                        onClick={() => setOpen(false)}
                    >
                        판매 정보
                        </MenuItem>
                    </SubMenu>
                )
                }
                

            </Menu>

        </Container>

    </>
  )
}

export default SiderBar

const MenuWrapper = styled.div`
    width: 100%;
`

const MenuItemButton = styled.button`
    width: 100%;
    border: 1px solid ${({$active}) =>
        $active ? "rgba(0, 250, 250, 0.4)" : "rgba(255, 255, 255, 0.35)"
    };
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 12px 18px;
    font-size: 15px;
    font-weight: 600;

    background: ${({$active}) =>
        $active ? "linear-gradient(135deg, rgba(0, 200, 200, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)" : "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)"
    };
    color: ${({$active}) =>
        $active ? "#0f766e" : "#475569"
    };
    border-radius: 9999px;
    box-shadow: ${({$active}) =>
        $active ? "inset 0 3px 4px rgba(255, 255, 255, 0.8), inset 0 -5px 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 200, 200, 0.2)" : "inset 0 1px 1px rgba(255, 255, 255, 0.5)"
    };

    transition: all 0.2s ease;
    
    &:hover {
        background: ${({$active}) => $active ? "linear-gradient(135deg, rgba(0, 200, 200, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%)" : "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)"};
        color: ${({$active}) => $active ? "#0f766e" : "#0f172a"};
        border-color: ${({$active}) => $active ? "rgba(0, 250, 250, 0.5)" : "rgba(255, 255, 255, 0.5)"};
    }
    
    svg {
        font-size: 20px;
        transition: transform 0.25s ease;
    }
`

const SubMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-left: 16px;
    padding-left: 10px;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    margin-top: 4px;
`

const MobileTopBar = styled.div`
    display: none;

    @media (max-width: 768px){
        width: 100%;
        height: 60px;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }
`;

const MenuButton = styled.button`
    border: none;
    background: transparent;
    color: #1e293b;
    font-size: 28px;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
        color: #000000;
    }
`;

const MobileLogo = styled.div`
    color: #1e293b;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.02em;
`;

const Container = styled.aside`
    width: 240px;
    min-height: calc(100vh - 70px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 100%);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    padding: 24px 16px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-right: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 
        inset 0 3px 4px rgba(255, 255, 255, 0.7),
        inset 0 -5px 10px rgba(255, 255, 255, 0.3),
        inset 0 4px 6px rgba(0, 0, 0, 0.02),
        0 15px 35px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px){
        position: fixed;
        top: 60px;
        left: ${({ $open }) => ($open ? "0" : "-100%")};
        width: 240px;
        height: calc(100vh - 60px);
        overflow-y: auto;
        z-index: 999;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.05);
    }
`;

const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MenuItem = styled(Link)`
    text-decoration: none;
    padding: 12px 18px;
    border-radius: 9999px;
    color: ${({ $active }) =>
        $active ? "#0f766e" : "#475569"};
    background: ${({ $active }) =>
        $active ? "linear-gradient(135deg, rgba(0, 200, 200, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)" : "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)"};
    border: 1px solid ${({ $active }) =>
        $active ? "rgba(0, 250, 250, 0.4)" : "rgba(255, 255, 255, 0.35)"};
    font-size: 15px;
    font-weight: 600;
    box-shadow: ${({ $active }) =>
        $active ? "inset 0 3px 4px rgba(255, 255, 255, 0.8), inset 0 -5px 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 200, 200, 0.2)" : "inset 0 1px 1px rgba(255, 255, 255, 0.5)"};
    transition: all 0.2s ease;

    &:hover{
        background: ${({ $active }) => $active ? "linear-gradient(135deg, rgba(0, 200, 200, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%)" : "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)"};
        color: ${({ $active }) => $active ? "#0f766e" : "#0f172a"};
        border-color: ${({ $active }) => $active ? "rgba(0, 250, 250, 0.5)" : "rgba(255, 255, 255, 0.5)"};
    }
`;