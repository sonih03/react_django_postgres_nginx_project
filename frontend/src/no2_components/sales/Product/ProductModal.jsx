import React, { useEffect } from 'react'
import { Modal, InputNumber, Select, Button, message, Form, Input } from 'antd'
import styled from 'styled-components'

const ProductModal = ({open, setOpen, initialValues, onSubmit}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if(open){
            if(initialValues){
                form.setFieldsValue(initialValues);
            }
            else{
                form.resetFields();
            }
        }
    }, [open, initialValues, form])
    const handleCancel = () => {
        setOpen(false);
        form.resetFields();//애가 초기화를 시켜줌
    }
    const onFinish = async (values) => {
        await onSubmit(values);
        setOpen(false);
        form.resetFields();
    };
  return (
    <Modal
        title={initialValues ? "상품 정보 수정" : "상품 등록"}
        open = {open}
        onCancel={handleCancel}
        footer = {null}
        width={700}
        centered
        styles={{
            content: {
                background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 100%)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: 'inset 0 3px 5px rgba(255, 255, 255, 0.7), 0 20px 40px rgba(0, 0, 0, 0.05)',
                padding: '32px'
            },
            header: {
                background: 'transparent',
                marginBottom: '24px'
            }
        }}
    >
        <StyledForm
            form={form}
            layout='vertical'
            onFinish = {onFinish}
            size = 'large'
        >
            <Form.Item
                label="상품명"
                name="product_name"
                rules={[{required:true, message: "상품명을 입력하세요."}]}
            >
                <Input placeholder = '예: 스마트폰'/>
            </Form.Item>
            <Form.Item
                label = "색상"
                name = "color"
                rules={[{required: true, message: "색상을 입력하세요"}]}
            >
                <Select
                    placeholder="색상 선택"
                    options={[
                        {value: "Black", label: "Black"},
                        {value: "White", label: "White"},
                        {value: "Red", label: "Red"},
                        {value: "Blue", label: "Blue"},

                    ]}
                />
            </Form.Item>
            <Form.Item
                label="원가"
                name="price"
                rules={[{required: true, message: "원가를 입력하세요,"}]}
            >
                <InputNumber 
                    min = {0}
                    style={{width: "100%"}}
                    placeholder='예: 439999'
                />
            </Form.Item>
             <Form.Item
                label="판매가"
                name="sale_price"
                rules={[{required: true, message: "판매가를 입력하세요,"}]}
            >
                <InputNumber 
                    min = {0}
                    style={{width: "100%"}}
                    placeholder='예: 80000'
                />
            </Form.Item>
            <Form.Item
                label = "카테고리 코드"
                name = "category_code"
                rules={[{required: true, message: "카테고리 코드를 선택하세요"}]}
            >
                <Select
                    placeholder="카테고리 코드 선택"
                    options={[
                        {value: "교수", label: "교수"},
                        {value: "학생", label: "학생"},
                        {value: "E1", label: "E1"},
                        {value: "E2", label: "E2"},
                        {value: "E3", label: "E3"},
                        {value: "A1", label: "A1"},
                        {value: "A2", label: "A2"},

                    ]}
                />
            </Form.Item>
            <Form.Item
                style={{marginTop: "28px"}}
            >
                <SubmitButton
                    type='primary'
                    htmlType='submit'
                    block
                    size='large'
                >
                    {initialValues ? "수정하기" : "등록하기"}
                </SubmitButton>
            </Form.Item>
        </StyledForm>
    </Modal>
  )
}

export default ProductModal;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #475569 !important;
  }
  
  .ant-input, 
  .ant-input-number, 
  .ant-select-selector {
    border-radius: 9999px !important;
    border: 1px solid rgba(255, 255, 255, 0.45) !important;
    background: rgba(255, 255, 255, 0.3) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    box-shadow: inset 0 1.5px 2px rgba(0, 0, 0, 0.02) !important;
    transition: all 0.2s ease !important;
    color: #0f172a !important;
    height: 48px !important;
    display: flex !important;
    align-items: center !important;
    
    &:hover {
      border-color: rgba(168, 85, 247, 0.3) !important;
    }
    
    &:focus, &:focus-within, &-focused {
      border-color: rgba(168, 85, 247, 0.5) !important;
      background: rgba(255, 255, 255, 0.4) !important;
      box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1), inset 0 1.5px 2px rgba(255, 255, 255, 0.5) !important;
    }
  }

  .ant-select-selector {
    padding: 0 20px !important;
  }
  
  .ant-input-number-input-wrapper {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
  }

  .ant-input-number-input {
    height: 100% !important;
    padding: 0 20px !important;
  }

  .ant-select-selection-placeholder {
    color: #94a3b8 !important;
  }
`;

const SubmitButton = styled(Button)`
  height: 48px !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(139, 92, 246, 0.25) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.45) !important;
  border-radius: 9999px !important;
  cursor: pointer !important;
  box-shadow: 
    0 15px 25px rgba(139, 92, 246, 0.15), 
    inset 0 2.5px 3px rgba(255, 255, 255, 0.75), 
    inset 0 -5px 7px rgba(255, 255, 255, 0.4), 
    inset 0 4px 4px rgba(139, 92, 246, 0.15) !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.75) 0%, rgba(139, 92, 246, 0.35) 100%) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 15px 25px rgba(139, 92, 246, 0.22), inset 0 2.5px 3px rgba(255, 255, 255, 0.85) !important;
  }

  &:active {
    transform: translateY(0) !important;
  }
`;
