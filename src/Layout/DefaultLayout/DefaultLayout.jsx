import { View } from "react-native";
import Header from "../Header/Header";
import styles from "./DefaultStyle";
import { createContext,useEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TotalQuantityCart from "./CartContext";
// const TotalQuantityCart = createContext()
function DefaultLayout({
    children
}) {
    const [token,setToken] = useState("");
    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem("token");
            if(token){
                setToken(token)
            }
        }
        getToken()
    },[])

    const [totalQuantityCart,setTotalQuantityCart] = useState(0)
    useEffect(() => {
        fetch(`http://192.168.5.184:8080/api/books/cart/total`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTotalQuantityCart(data)
        }
        )
    },[token])
    return ( <View style={styles.app}>
        <TotalQuantityCart.Provider value = {{totalQuantityCart,setTotalQuantityCart}}>
            <Header />
            <View>
                {children}
            </View>
        </TotalQuantityCart.Provider>
        
    </View> );
}
// export {TotalQuantityCart}
export default DefaultLayout;