// import axios from "axios";
//
// export const todoAllGetApi = async () => {
//     try{
//         const response = await axios.get("http://localhost:8000/todos")
//         return response.data
//     }
//     catch(error){
//         return error
//     }
// }
//
// export const todoGetApi = async (id) => {
//     try{
//         const response = await axios.get(`http://localhost:8000/todos/${id}`)
//         return response.data
//     }
//     catch(error){
//         return error
//     }
// }
//
// export const todoPostApi = async (dataObj) => {
//     try{
//         const response = await axios.post("http://localhost:8000/todos", dataObj)
//         return response.data
//     }
//     catch(error){
//         return error
//     }
// }
//
// export const todoPutApi = async (dataObj) => {
//     try{
//         const response = await axios.put(`http://localhost:8000/todos/${dataObj.id}`, dataObj)
//         return response.data
//     }
//     catch(error){
//         return error
//     }
// }
//
// export const todoDeleteApi = async (id) => {
//     try{
//         const response = await axios.delete(`http://localhost:8000/todos/${id}`)
//         return id;
//     }
//     catch(error){
//         return new Error(error);
//     }
// }

import { rootApi } from "./root.api.js";

// 1. 전체 할 일 조회
export const todoAllGetApi = async () => {
    // 🎯 장고 진입로(/api) 및 뒤 슬래시(/) 추가
    const response = await rootApi.get("/api/todos/");
    return response.data;
};

// 2. 특정 할 일 조회
export const todoGetApi = async (id) => {
    // 🎯 뒤 슬래시(/) 필수
    const response = await rootApi.get(`/api/todos/${id}/`);
    return response.data;
};

// 3. 할 일 등록
export const todoPostApi = async (dataObj) => {
    // 🎯 주소 교정 (dataObj 안에는 이미 subject, checked가 이쁘게 들어있음!)
    const response = await rootApi.post("/api/todos/", dataObj);
    return response.data;
};

// 4. 할 일 수정
export const todoPutApi = async (dataObj) => {
    // 🎯 주소 교정 및 슬래시 닫기
    const response = await rootApi.put(`/api/todos/${dataObj.id}/`, dataObj);
    return response.data;
};

// 5. 할 일 삭제
export const todoDeleteApi = async (id) => {
    // 🎯 뒤 슬래시(/) 필수
    await rootApi.delete(`/api/todos/${id}/`);
    return id;
};