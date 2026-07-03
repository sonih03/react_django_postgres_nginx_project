// import axios from "axios";
// import { rootApi } from "./root.api.js";
//
//
// export const userAllGetApi = async ()=>{
//     try{
//         const response = await axios.get("http://localhost:8000/user")
//         return response.data
//
//
//     }catch(error){
//         return error
//
//     }
// }
//
// // export const userLoginApi = async (userObj)=>{
// //     try{
// //
// //         const response = await axios.get(
// //             `http://localhost:3001/user?name=${userObj.username}`
// //         )
// //
// //         const users = response.data
// //         if(!users.length){
// //             throw new Error("존재하지 않는 사용자입니다.");
// //         }
// //         const foundUser = users[0];
// //
// //         if(foundUser.password !== userObj.password){
// //             throw new Error("비밀번호가 일치하지 않습니다.");
// //         }
// //
// //         return foundUser;
// //
// //         }catch(error){
// //             throw new Error(error.message);
// //
// //     }
// // };
//
// export const userLoginApi = async (loginUser) => {
//
//     try {
//
//         const response = await rootApi.post(
//             "/auth/login",
//             {
//                 name: loginUser.username,
//                 password: loginUser.password,
//             }
//         );
//
//         return response.data;
//
//     } catch (error) {
//
//         throw new Error(
//             error.response?.data?.detail ??
//             "로그인에 실패했습니다."
//         );
//
//     }
//
// };
//
// // export const userRegisterApi = async (userObj)=>{
// //     try{
// //         const response = await axios.get(`http://localhost:3001/user?name=${userObj.username}`)
// //         const users = response.data
// //         if(users.length){
// //             throw new Error("이미 존재하는 사용자입니다.")
// //         }
// //
// //         return await axios.post(`http://localhost:3001/user`,userObj)
// //
// //     }catch(error){
// //         return error
// //     }
// // }
//
// export const userRegisterApi = async (userObj) => {
//     try {
//         const response = await rootApi.post(
//             "/users",
//             userObj
//         );
//         return response.data;
//     } catch (error) {
//         throw new Error(
//             error.response?.data?.detail ??
//             "회원가입에 실패했습니다."
//         );
//
//     }
//
// };
//
// export const currentUserApi = async () => {
//
//     const response = await rootApi.get("/auth/me");
//     console.log(response.data);
//     return response.data;
// };
//
//
//
//
// // export const userPutApi = async (dataObj)=>{
// //     try{
// //         const response = await axios.post(`http://localhost:3001/user/${dataObj.id}`, dataObj)
// //         return response.data
//
// //     }catch(error){
// //         return error
//
// //     }
// // }
//
// export const userPostApi = async (dataObj)=>{
//     try{
//         const response = await axios.post("http://localhost:8000/user", dataObj)
//         return response.data
//
//     }catch(error){
//         return new Error(error);
//     }
// }
//
//
// // export const userDeleteApi = async ()=>{
// //     try{
// //         const response = await axios.delete("http://localhost:3001/user2")
// //         return response.data
//
// //     }catch(error){
// //         return error
//
// //     }
// // }
//
// // export const useLogout = () => {
// //     const queryClient = useQueryClient();
// //     return () => {
// //         localStorage.removeItem("currentUser");
// //         queryClient.setQueryData(["user"], null);
// //     }
// // }
//
// export const logout = () => {
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("accessToken")
// }

import { rootApi } from "./root.api.js";

// 1. 전체 유저 조회
export const userAllGetApi = async () => {
    // 🎯 장고 URL 룰에 맞게 접두사 /api와 맨 뒤 슬래시(/) 추가
    const response = await rootApi.get("/api/users/");
    return response.data;
};

// 2. 로그인 (장고 DRF 스케일 및 평문 암호화 가동 버전)
export const userLoginApi = async (loginUser) => {
    try {
        // 🎯 장고 auth/login/ 엔드포인트 매핑
        const response = await rootApi.post("/api/auth/login/", {
            username: loginUser.username,
            password: loginUser.password,
        });
        return response.data;
    } catch (error) {
        // 🎯 FastAPI의 detail 대신 장고 DRF가 뱉어주는 error 구조로 교차 검증 변경!
        const djangoError = error.response?.data?.error;
        const errorMessage = djangoError || "로그인에 실패했습니다.";

        throw new Error(errorMessage);
    }
};

// 3. 회원가입
export const userRegisterApi = async (userObj) => {
    try {
        // 🎯 장고 urls.py의 'users/create' 경로에 맞춤 (/api/users/create)
        const response = await rootApi.post("/api/users/create", userObj);
        return response.data;
    } catch (error) {
        // 🎯 장고 에러 포맷에 맞게 예외 처리 정돈
        const djangoError = error.response?.data?.error || error.response?.data?.detail;
        throw new Error(djangoError ?? "회원가입에 실패했습니다.");
    }
};

// 4. 현재 로그인된 유저 정보 조회
export const currentUserApi = async () => {
    // 🎯 장고 auth/me/ 엔드포인트 매핑
    const response = await rootApi.get("/api/auth/me/");
    return response.data;
};

// 5. 유저 데이터 등록 (필요시 사용)
export const userPostApi = async (dataObj) => {
    const response = await rootApi.post("/api/users/create", dataObj);
    return response.data;
};

// 6. 로그아웃 (기존 로직 유지)
export const logout = (queryClient) => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");

    if (queryClient) {
        queryClient.setQueryData(["users"], null);
    }
};