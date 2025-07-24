import { Button, Image, View,
    StyleSheet,Text,Alert } from "react-native";
import DisplayPrice from "../../src/components/DisplayPrice/DisplayPrice.jsx";
import { TotalQuantityCart } from "../../src/Layout/DefaultLayout/DefaultLayout.jsx";
import { useContext } from "react";

function TableBook({
    id,
    name,
    price,
    author,
    language,
    image,
    quantity,
    token=false
}) {
    const {setTotalQuantityCart} = useContext(TotalQuantityCart)

    const handleAddCart = (idBook) => {
        const params = new URLSearchParams();
        params.append("idBook",idBook);
        params.append("quantity",1)
        let query = params.toString()
        fetch(`http://192.168.5.184:8080/api/books/cart/add?${query}`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.id>0){
                setTotalQuantityCart(prev => prev+1)
                Alert.alert("Thêm vào giỏ hàng thành công")
            }
        })
    }


    return ( <View style ={styles.row}>
        <View style ={styles.image}>
            <Image 
                source= {{uri : `http://192.168.5.184:8080/image/${image}`}} 
                style  ={{width:160, height: 120, borderRadius: 5}}
                />
        </View>
        <View style = {styles.content}>
            <Text 
                numberOfLines={1} 
                ellipsizeMode="tail" 
                style= {{width:120,
                    textAlign:'right'}}>
                    {name}
            </Text>
            <Text>{author}</Text>
            <Text>Language :{language}</Text>
            <Text>Quantity :{quantity}</Text>
            <Text>Price: <DisplayPrice price ={price} /> đ
            </Text>
            <Button 
                title= "Them gio hang"
                onPress ={() => handleAddCart(id)}
            />
        </View>
    </View> );
}

const styles = StyleSheet.create({
    row:{
        marginTop:16,
        paddingHorizontal:10,
        paddingVertical: 8,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor : "rgba(0,0,0,0.2)"
    },
    image:{
        
    },
    content:{
        alignItems:"flex-end"
    }
})

export default TableBook;