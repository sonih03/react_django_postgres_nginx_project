import { useQuery } from "@tanstack/react-query";
import { useAllGetUser } from "./useUser.js";
import {useAllGetProduct} from "./useProduct.js"
import { salesAllGetApi } from "../apis/sales.api.js";

export const useAllGetSales = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: salesAllGetApi
    })
}

export const useGetSales = () => {//join 작업
    const {data: userList=[]} = useAllGetUser()
    const{data: productList=[]} = useAllGetProduct()
    const {data: salesList=[]} = useAllGetSales()
    // console.log(salesList,"userList")
    const userObj = {}
    userList?.forEach(item => {//오브젝트를 사용하고 싶은데 map은 리스트 return 하니까 for each 사용
        userObj [item.id] = item
    });
    const productObj = {}
    productList.forEach(item => {
        productObj[item.id] = item
    })

    const rowData = salesList.map(item => ({

        ...item,
        user_name: userObj[String(item.user_id)]?.username ?? "알 수 없음",
        product_name: productObj[String(item.product_id)]?.product_name ?? "알 수 없음"
        }
    ))
    return rowData;
}
