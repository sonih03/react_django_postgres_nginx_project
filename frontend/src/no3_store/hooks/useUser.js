import{
    useQuery,
    useQueryClient,
    useMutation
} from"@tanstack/react-query"
import {
    userAllGetApi,
    userLoginApi,
    userRegisterApi,
    currentUserApi
} from"../apis/user.api"

export const useAllGetUser = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: userAllGetApi
    })
}

// export const useLoginUser = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: userLoginApi,
//         onSuccess: (user) => {
//             localStorage.setItem("currentUser", JSON.stringify(user))
//         }
//     })
// }

export const useLoginUser = () => {
    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: (token) => {
            localStorage.setItem(
                "accessToken",
                token.access_token
            );
        }
    })
}

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: currentUserApi,
        enabled: !!localStorage.getItem("accessToken"),
        retry: false,
    });
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    })
}

// export const useLogoutUser = () => {
//     const queryClient = useQueryClient();
//     return () => {
//         localStorage.removeItem("currentUser");
//         queryClient.setQueryData(["user"], null);
//     }
// }

// export const getCurrentUser = () => {
//     const user = localStorage.getItem("currentUser")
//     return user && JSON.parse(user)
// }

export const logout = () => {
    localStorage.removeItem("accessToken")
}
