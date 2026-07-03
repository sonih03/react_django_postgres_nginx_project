// import axios from "axios";
//
// export const salesAllGetApi = async () => {
//     try{
//         const response = await axios.get("http://localhost:8000/sales")
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const salesGetApi = async (id) => {
//     try{
//         const response = await axios.get(`http://localhost:8000/sales/${id}`)
//         return response.data
//     }
//     catch(error){
//         throw error;
//     }
// };
//
// export const salesPostApi = async (dataObj) => {
//     try{
//         const response = await axios.post("http://localhost:8000/sales",dataObj)
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const salesPutApi = async (dataObj) => {
//     try{
//         const response = await axios.put(`http://localhost:8000/sales/${dataObj.id}`,dataObj)
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const salesDeleteApi = async (id) => {
//     try{
//         await axios.delete(`http://localhost:8000/sales/${id}`)
//         return id
//     }
//     catch(error){
//         return new Error(error);
//     }
// }

import { rootApi } from "./root.api.js";

// 1. 전체 판매 내역 조회
export const salesAllGetApi = async () => {
    // 🎯 원래 함수명 유지 + 장고 규격 주소(/api/.../) 매핑
    const response = await rootApi.get("/api/sales/");
    return response.data;
};

// 2. 특정 판매 내역 조회
export const salesGetApi = async (id) => {
    // 🎯 끝자리 슬래시 필수
    const response = await rootApi.get(`/api/sales/${id}/`);
    return response.data;
};

// 3. 판매 내역 등록
export const salesPostApi = async (dataObj) => {
    const response = await rootApi.post("/api/sales/", dataObj);
    return response.data;
};

// 4. 판매 내역 수정
export const salesPutApi = async (dataObj) => {
    const response = await rootApi.put(`/api/sales/${dataObj.id}/`, dataObj);
    return response.data;
};

// 5. 판매 내역 삭제
export const salesDeleteApi = async (id) => {
    await rootApi.delete(`/api/sales/${id}/`);
    return id;
};