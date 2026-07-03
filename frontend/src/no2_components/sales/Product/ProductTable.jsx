import React, { useMemo, useState } from 'react'
// import { useDeleteProduct } from '../../../no3_store/hooks/sales/useProduct';
import { 
  useAllGetProduct, 
  usePostRegisterProduct, 
  usePutUpdateProduct,
  useDeleteProduct 
} from '../../../no3_store/hooks/useProduct.js';
import ProductModal from './ProductModal';
import Actions from 'antd/es/transfer/Actions';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';

const ProductTable = () => {
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(null);
    const {data: productList = [], isLoading, error} = useAllGetProduct();
    const registerMutation = usePostRegisterProduct();
    const updateMutation = usePutUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const handleRegister = () =>{
        setNewProduct(null);
        setOpen(true);
    }

    const handleUpdate = (item) => {
        setNewProduct(item)
        setOpen(true)
    }
    const handleDelete = async (id) => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            await deleteMutation.mutateAsync(id)
        }
    }
    const defaultColDef = useMemo(() => (
            {sortable: true, filter: true, resizable: true}
        ), [])

    const columnDefs = useMemo(() => [
      {field: "product_name", headerName: "상품명", flex: 1},
      {field: "color", headerName: "색상", flex: 1},
      {field: "price", headerName: "원가", flex: 1},
      {field: "sale_price", headerName: "판매가", flex: 1},
      {field: "category_code", headerName: "카테고리 코드", flex: 1},
      {
        headerName: "상품 관리", 
        cellRenderer: (params) => (
            <ActionBox>
                <UpdateButton onClick={() =>handleUpdate(params.data)}>
                    수정
                </UpdateButton>
                <DeleteButton onClick={() =>handleDelete(params.data.id)}>
                    삭제
                </DeleteButton>
            </ActionBox>
        ),
        flex: 1},  
    ],[handleUpdate, handleDelete])
    if(isLoading) return <Message>Loading...</Message>
    if(error) return <Message>{error.Message}</Message>

  return (
    <Wrapper>
        <Header>
            <Title>상품 관리</Title>
            <RegisterButton onClick={handleRegister}>상품 등록</RegisterButton>
        </Header>
        <GridWrapper className='ag-theme-alpine'>
            <AgGridReact
                theme="legacy"
                rowData={productList}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize = {25}
                paginationPageSizeSelector={[10, 25, 50, 100]}
                animateRows = {true}
                getRowId={(params) => params.data.id.toString()}
                rowHeight={60}
            />

        </GridWrapper>
       
      <ProductModal
        open={open}
        setOpen={setOpen}
        initialValues={newProduct}
        onSubmit={async (values) => {
            if(newProduct){
                await updateMutation.mutate({...values, id: newProduct.id})
            }
            else{
                await registerMutation.mutate(values)
            }
        }}
      />
    </Wrapper>
  )
}

export default ProductTable;

const Wrapper = styled.div`
    background: linear-gradient(
        135deg,
        rgba(216, 180, 254, 0.22) 0%,
        rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border-radius: 24px;
    padding: 32px;
    border: 1px solid rgba(216, 180, 254, 0.35);
    box-shadow: 
        inset 0 3px 5px rgba(255, 255, 255, 0.6),
        inset 0 -5px 12px rgba(255, 255, 255, 0.2),
        0 15px 30px rgba(0, 0, 0, 0.03);
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`

const Title = styled.h2`
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: #1e293b;
    letter-spacing: -0.02em;
`

const RegisterButton = styled.button`
    border: 1px solid rgba(168, 85, 247, 0.45);
    padding: 10px 24px;
    border-radius: 9999px;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(139, 92, 246, 0.25) 100%);
    color: white;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 
        inset 0 3px 4px rgba(255, 255, 255, 0.75), 
        inset 0 -5px 10px rgba(255, 255, 255, 0.3), 
        0 0 20px rgba(168, 85, 247, 0.25);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    
    &:hover{
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(139, 92, 246, 0.35) 100%);
        border-color: rgba(168, 85, 247, 0.6);
        box-shadow: 
            inset 0 3px 4px rgba(255, 255, 255, 0.85),
            0 0 25px rgba(168, 85, 247, 0.35);
        transform: translateY(-1px);
    }
    &:active {
        transform: translateY(0);
    }
`;

const GridWrapper = styled.div`
    width: 100%;
    height: 700px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);

    /* 1. ag-Grid 자체 기본 배경 및 테두리 완전히 증발시키기 & CSS 변수 세팅 */
    .ag-theme-alpine {
        background-color: transparent !important;
        border: none !important;
        
        --ag-background-color: transparent;
        --ag-odd-row-background-color: transparent;
        --ag-header-background-color: rgba(255, 255, 255, 0.15);
        --ag-row-hover-color: rgba(255, 255, 255, 0.2);
        --ag-border-color: rgba(255, 255, 255, 0.2);
    }

    /* 2. 내부 그리드 레이어들의 하얀 배경 강제 제거 */
    .ag-root-wrapper,
    .ag-root-wrapper-body,
    .ag-body-viewport {
        background-color: transparent !important;
        background: transparent !important;
        border: none !important;
    }

    .ag-root {
        background: transparent !important;
    }

    /* 3. 헤더 영역을 영롱한 유리 상단 바로 만들기 */
    .ag-header {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(10px);
        border-bottom: 2px solid rgba(255, 255, 255, 0.3) !important;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    }

    .ag-header-row {
        background: transparent !important;
    }

    .ag-header-cell {
        color: #475569 !important;
        font-weight: 750 !important;
        font-size: 13px !important;
        letter-spacing: 0.05em !important;
    }

    /* 4. 데이터 행(Row)들 - 1번 사진처럼 개별 유리 카드로 분리하기 */
    .ag-row {
        height: 48px !important;
        margin-top: 6px !important;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.05) 100%
        ) !important;
        border: 1px solid rgba(255, 255, 255, 0.45) !important;
        border-radius: 12px !important;
        box-shadow: 
            inset 0 2px 3px rgba(255, 255, 255, 0.65),
            0 4px 10px rgba(0, 0, 0, 0.02) !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;

        &:hover {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.28) 0%,
                rgba(255, 255, 255, 0.1) 100%
            ) !important;
            border-color: rgba(255, 255, 255, 0.6) !important;
            box-shadow: 
                inset 0 2px 4px rgba(255, 255, 255, 0.75),
                0 6px 15px rgba(0, 0, 0, 0.04) !important;
            transform: translateY(-1px);
            backdrop-filter: blur(5px);
        }
    }

    .ag-row-odd,
    .ag-row-even {
        background: transparent !important;
    }

    .ag-cell {
        color: #1e293b !important;
        font-weight: 600 !important;
        font-size: 14px !important;
        display: flex !important;
        align-items: center !important;
        border-right: none !important;
    }

    /* 5. 페이지네이션 영역 투명화 */
    .ag-paging-panel {
        background-color: transparent !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #1e293b !important;
        font-weight: 600 !important;
        padding: 12px 20px !important;
    }

    .ag-paging-button {
        color: #475569 !important;
        background: rgba(255, 255, 255, 0.15) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 9999px !important;
        padding: 4px 12px !important;
        margin: 0 4px !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;

        &:hover {
            background: rgba(255, 255, 255, 0.3) !important;
            color: #0f172a !important;
            border-color: rgba(255, 255, 255, 0.5) !important;
        }

        &.ag-disabled {
            opacity: 0.4 !important;
            cursor: not-allowed !important;
        }
    }
`

const ActionBox = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    height: 100%;
`

const UpdateButton = styled.button`
    border: 1px solid rgba(16, 185, 129, 0.4);
    padding: 6px 16px;
    border-radius: 9999px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
    color: #047857;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    transition: all 0.2s ease;
    &:hover{
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%);
        color: #065f46;
        border-color: rgba(16, 185, 129, 0.5);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 0 15px rgba(16, 185, 129, 0.25);
    }
`;

const DeleteButton = styled.button`
    border: 1px solid rgba(239, 68, 68, 0.4);
    padding: 6px 16px;
    border-radius: 9999px;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
    color: #b91c1c;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);
    transition: all 0.2s ease;
    &:hover{
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.35) 0%, rgba(255, 255, 255, 0.08) 100%);
        color: #991b1b;
        border-color: rgba(239, 68, 68, 0.5);
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 0 15px rgba(239, 68, 68, 0.25);
    }
`;

const Message = styled.div`
    text-align: center;
    margin-top: 100px;
    font-size: 22px;
    font-weight: bold;
`;