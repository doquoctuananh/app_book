import { Text,View,FlatList } from "react-native";
import DefaultLayout from "../../src/Layout/DefaultLayout/DefaultLayout";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "~pages/order/OrdersStyles.jsx"
import OrderItem from "./OrderItem";
import ForwardPage from "~components/ForwardPage/ForwardPage.jsx"
function Orders() {
    const [token,setToken] = useState();
    const [historyOrder,setHistoryOrder] = useState({})
    const [page,setPage] = useState(0)
    useEffect(() => {
        const getToken = async () => {
            const get = await AsyncStorage.getItem("token");
            if(get){
                setToken(get)
            }
        }
        getToken();
    },[])

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("page",page)
        let query = params.toString()
        fetch(`http://192.168.5.184:8080/api/books/orders?${query}`,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setHistoryOrder(data)
        })
    },[token,page])

    return ( <DefaultLayout>
        {
            historyOrder.content?.length > 0 ? 
            <View style = {styles.app}>
                <FlatList 
                    data = {historyOrder.content}
                    keyExtractor={(item,index) => item.id + index}
                    renderItem ={({item,index}) => {
                        return item.listOrderDetails.map((orderitem,index) => {
                            return <OrderItem 
                                    image = {orderitem.book.imageUrl}
                                    orderDate ={item.orderDate}
                                    name ={item.name}
                                    address ={item.address}
                                    orderStatus ={item.orderStatus}
                                    paymentMethod = {item.paymentMethod}
                                    bookName ={orderitem.book.bookName}
                                    price ={orderitem.book.price}
                                    quantity = {orderitem.quantity}
                                />
                        })
                        
                    }}
                />
                
                <ForwardPage 
                    list = {historyOrder}
                    setPage = {setPage} 
                />
               
            </View> :<Text style ={{fontSize:24}}>Chưa có đơn hàng nào</Text>
        }
    </DefaultLayout> );
}

export default Orders;