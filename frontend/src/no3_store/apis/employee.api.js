// import axios from "axios";
//
//
//
//
// export const employeeAllGetApi = async () => {
//     try{
//         const response = await axios.get("http://localhost:8000/employees")
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const employeeGetApi = async (id) => {
//     try{
//         const response = await axios.get(`http://localhost:8000/employees/${id}`)
//         return response.data
//     }
//     catch(error){
//         throw error;
//     }
// };
//
// import { rootApi } from "./root.api.js";
//
// export const employeePostApi = async (employeeObj) => {
//     const response = await rootApi.post("/employees", employeeObj);
//     return response.data;
// };
//
//
// export const employeePutApi = async (dataObj) => {
//     try{
//         const response = await axios.put(`http://localhost:8000/employees/${dataObj.id}`,dataObj)
//         return response.data
//     }
//     catch(error){
//         throw error
//     }
// }
//
// export const employeeDeleteApi = async (id) => {
//     try{
//         await axios.delete(`http://localhost:8000/employees/${id}`)
//         return id
//     }
//     catch(error){
//         return new Error(error);
//     }
// }

// import { rootApi } from "./root.api.js";
//
// // 1. 전체 직원 조회
// export const employeeAllGetApi = async () => {
//     const response = await rootApi.get("/employees");
//     return response.data;
// };
//
// // 2. 특정 직원 조회
// export const employeeGetApi = async (id) => {
//     const response = await rootApi.get(`/employees/${id}`);
//     return response.data;
// };
//
// // 3. 직원 등록
// // export const employeePostApi = async (employeeObj) => {
// //     const response = await rootApi.post("/employees", employeeObj);
// //     return response.data;
// // };
//
// export const employeePostApi = async (employeeObj) => {
//     const formattedData = {
//         username: employeeObj.name, // 프론트의 name을 백엔드가 원하는 username으로 매칭!
//         email: employeeObj.email,
//         job: employeeObj.job,
//         pay: Number(employeeObj.pay), // 혹시 문자열로 들어올까 봐 숫자로 안전하게 형변환
//     };
//     const response = await rootApi.post("/employees", formattedData);
//     return response.data;
// };
//
// // 4. 직원 수정
// export const employeePutApi = async (dataObj) => {
//     const response = await rootApi.put(`/employees/${dataObj.id}`, dataObj);
//     return response.data;
// };
//
// // 5. 직원 삭제
// export const employeeDeleteApi = async (id) => {
//     await rootApi.delete(`/employees/${id}`);
//     return id;
// };

import { rootApi } from "./root.api.js";

// 1. 전체 직원 조회
export const employeeAllGetApi = async () => {
    // 🎯 장고 진입로(/api) 및 뒤 슬래시(/) 추가
    const response = await rootApi.get("/api/employees/");
    return response.data;
};

// 2. 특정 직원 조회
export const employeeGetApi = async (id) => {
    // 🎯 뒤 슬래시(/) 필수
    const response = await rootApi.get(`/api/employees/${id}/`);
    return response.data;
};

// 3. 직원 등록
export const employeePostApi = async (employeeObj) => {
    const formattedData = {
        username: employeeObj.username, // 프론트의 name을 백엔드 username으로 매칭
        email: employeeObj.email,
        job: employeeObj.job,
        pay: Number(employeeObj.pay),
    };
    // 🎯 주소 교정
    const response = await rootApi.post("/api/employees/", formattedData);
    return response.data;
};

// 4. 직원 수정
export const employeePutApi = async (dataObj) => {
    // 🎯 등록할 때와 마찬가지로 수정 데이터도 장고가 원하는 키값 구조로 안전하게 변환!
    const formattedData = {
        username: dataObj.name || dataObj.username, // 둘 중 어떤 게 들어와도 대응 가능하게 처리
        email: dataObj.email,
        job: dataObj.job,
        pay: Number(dataObj.pay),
    };

    // 🎯 주소 교정 및 데이터 주입
    const response = await rootApi.put(`/api/employees/${dataObj.id}/`, formattedData);
    return response.data;
};

// 5. 직원 삭제
export const employeeDeleteApi = async (id) => {
    // 🎯 뒤 슬래시(/) 필수
    await rootApi.delete(`/api/employees/${id}/`);
    return id;
};