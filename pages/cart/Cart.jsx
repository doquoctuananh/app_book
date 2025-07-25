import { FlatList, Pressable, Text, View,
    Button,Alert,
    Modal
 } from "react-native";
import DefaultLayout from "../../src/Layout/DefaultLayout/DefaultLayout";
import Header from "../../src/Layout/Header/Header";
import styles from "~pages/cart/CartStyle.jsx"
import { useEffect, useState } from "react";
import CartItem from "~pages/cart/CartItem.jsx";
import DisplayPrice from "../../src/components/DisplayPrice/DisplayPrice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalCart from "~pages/cart/ModalCart.jsx";
function Cart() {
    const [token,setToken] = useState("")
    const [cart,setCart] = useState([])
    const [check,setCheck] = useState({})
    const [filterCheck,setFilterCheck] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [showModal,setShowModal] = useState(false)
    useEffect(() => {
        const getToken =  async () => {
            const get = await AsyncStorage.getItem("token");
            if(get){
                setToken(get)
            }
        }
        getToken()
    },[])

    useEffect(() => {

        if(token){
            fetch(`http://192.168.5.184:8080/api/books/cart`,{
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setCart(data)
            })
        }
    },[token])

    useEffect(() => {
        const filter = Object.keys(check).filter((cur,index) => check[cur] == true);
        
        const total = filter.reduce((acc,cur,index) => {
            const findCart = cart.find((crt,index) => crt.id == parseInt(cur))
            
            return acc + findCart.quantity*findCart.book.price;
        },0)
        setFilterCheck(filter);
        setTotalPrice(total)
    },[check])

    const handleCheckout = () => {
        if(filterCheck.length>0){
            setShowModal(true)
        }
        else{
            Alert.alert("Chưa chọn sản phẩm")
        }
    }   

    return ( <DefaultLayout>
            <Modal 
                visible={showModal}
                transparent={true}
                animationType="slide"
            >
                <ModalCart 
                    setShowModal = {setShowModal}
                    token={token}
                    filterCheck = {filterCheck}
                    setCheck = {setCheck}
                    totalPrice ={totalPrice}
                />
            </Modal>

            { cart.length > 0 ? <View style = {styles.cart}> 
                <FlatList 
                    keyExtractor={(item) => item.id}
                    renderItem = {({item,index}) => {
                        return <CartItem 
                                idCart ={item.id}
                                nameBook ={item.book.bookName}
                                price ={item.book.price}
                                quantity ={item.quantity}
                                image ={item.book.imageUrl}
                                check={check}
                                setCheck ={setCheck}
                                token= {token}
                                setCart ={setCart}
                            />
                    }}
                    data = {cart}
                />

                <Pressable style = {styles.checkout}
                        onPress = {handleCheckout}
                >
                    <Text style={{fontSize: 20}}>Checkout: {totalPrice> 0? <DisplayPrice price = {totalPrice} /> : 0} VND</Text>
                </Pressable>
            </View> : <Text style = {{fontSize: 24}}>Không có sản phẩm</Text>}
        </DefaultLayout>
    );
}



export default Cart;