// import axios from "axios";
//
//
//
//
// export const productAllGetApi = async () => {
//     try{
//         const response = await axios.get("http://localhost:8000/products")
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const productGetApi = async (id) => {
//     try{
//         const response = await axios.get(`http://localhost:8000/products/${id}`)
//         return response.data
//     }
//     catch(error){
//         throw error;
//     }
// };
//
// export const productPostApi = async (dataObj) => {
//     try{
//         const response = await axios.post("http://localhost:8000/products",dataObj)
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const productPutApi = async (dataObj) => {
//     try{
//         const response = await axios.put(`http://localhost:8000/products/${dataObj.id}`,dataObj)
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const productDeleteApi = async (id) => {
//     try{
//         await axios.delete(`http://localhost:8000/products/${id}`)
//         return id
//     }
//     catch(error){
//         return new Error(error);
//     }
// }

import { rootApi } from "./root.api.js";

// 1. 전체 상품 조회
export const productAllGetApi = async () => {
    const response = await rootApi.get("/api/products/");
    return response.data;
};

// 2. 특정 상품 조회
export const productGetApi = async (id) => {
    const response = await rootApi.get(`/api/products/${id}/`);
    return response.data;
};

// 3. 상품 등록
export const productPostApi = async (dataObj) => {
    const response = await rootApi.post("/api/products/", dataObj);
    return response.data;
};

// 4. 상품 수정
export const productPutApi = async (dataObj) => {
    const response = await rootApi.put(`/api/products/${dataObj.id}/`, dataObj);
    return response.data;
};

// 5. 상품 삭제
export const productDeleteApi = async (id) => {
    await rootApi.delete(`/api/products/${id}/`);
    return id;
};