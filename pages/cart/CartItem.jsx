import { StyleSheet, Text, View,Image,Pressable } from "react-native";
import DisplayPrice from "../../src/components/DisplayPrice/DisplayPrice";
import Checkbox from 'expo-checkbox';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext, useState } from "react";
import { TotalQuantityCart } from "../../src/Layout/DefaultLayout/DefaultLayout";
function CartItem({
    idCart,
    nameBook,
    price,
    quantity,
    image,
    check,
    setCheck,
    token,
    setCart
}) {
    const {setTotalQuantityCart} = useContext(TotalQuantityCart)

    const handleCheck = (id) => {
        setCheck(prev=> {
            return {
                ...prev,
                [id]: !prev[id]
            }
        })
    }
    const handleAddProduct =(id) => {
        const params = new URLSearchParams();
        params.append("cartId",id)
        const query = params.toString();
        fetch(`http://192.168.5.184:8080/api/books/cart/increase?${query}`,{
            method:'POST',
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                setTotalQuantityCart(prev=> prev +1)
                setCart(prev => {
                    return prev.map((cur,index) => {
                        return cur.id == idCart ? data : cur
                    }) 
                })
            }
        })
    }

    const handleRemoveProduct = (id) => {
        const params = new URLSearchParams()
        params.append("cartId",id)
        let query = params.toString();
        fetch(`http://192.168.5.184:8080/api/books/cart/substract?${query}`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.id >0 || data>0){
                setTotalQuantityCart(prev => prev -1);
                setCart(prev => {
                    const newCart = prev.map((cur,index) => {
                           return cur.id == parseInt(id) ? {...cur,quantity:cur.quantity -1} :cur;
                        }
                    ).filter((cur,index) => cur.quantity>0)
                    return newCart;
                })
            }
        })
    }
    return ( <View style={styles.cart_item}>
        <View style = {styles.image}>
            <View style = {styles.checkbox}>
                <Checkbox
                    value = {check[idCart]}
                    onValueChange={() => handleCheck(idCart)}
                    color="#000"
                />
            </View>
            <Image 
                source= {{uri: `http://192.168.5.184:8080/image/${image}`}}
                style ={{width :160, height: 120, borderRadius:5}}
            />
        </View>
        <View style = {styles.content}>
            <Text>{nameBook}</Text>
            <Text>Price: <DisplayPrice price = {price} /></Text>
            <Text>Total Price: <DisplayPrice price ={quantity * price} /> đ</Text>
            <View style = {styles.add_remove}>
                <Pressable style = {styles.icon}
                    onPress ={() => handleAddProduct(idCart)}
                >
                    <Ionicons name="add" size={24}  color="black" />
                </Pressable>
                <Text style ={{marginLeft:5, marginRight:5}}>{quantity}</Text>
                <Pressable 
                    style = {styles.icon}
                    onPress = {() => handleRemoveProduct(idCart)}
                    >
                    <Ionicons name="remove" size={24}  color="black" />
                </Pressable>
            </View>
        </View>
    </View> );
}

const styles = StyleSheet.create({
    cart_item:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:"rgba(255, 122, 48,0.5)",
        justifyContent:"space-between",
        paddingHorizontal:10,
        paddingVertical:12,
        marginBottom: 16
    },
    image:{
        display:'flex',
        flexDirection:'row'
    },
    checkbox:{
        marginRight:6,
        justifyContent:'center'

    },
    content:{
        alignItems:'flex-end',
        justifyContent:'center'
    },
    add_remove:{
        display:'flex',
        flexDirection:'row',
        marginTop:6
    },
    icon:{
        backgroundColor:"#fff",
        borderRadius: 5,
        
    }
})

export default CartItem;