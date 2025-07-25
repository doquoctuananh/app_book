import { Image, StyleSheet, View ,Text,Button, Modal,Pressable} from "react-native";
import DisplayPrice from "~components/DisplayPrice/DisplayPrice"
import DisplayDate from "../../src/components/DisplayDate/DisplayDate";
import { Alert } from "react-native";
import { useState } from "react";
function OrderItem({
    image,
    orderDate,
    name,
    address,
    orderStatus,
    paymentMethod,
    bookName,
    price,
    quantity
}) {
    const [showDetail,setShowDetail] = useState(false)

    const ViewDetail = () => {
        return<View style = {{flex :1, justifyContent:'center',alignItems:'center'}}>
            <View style ={{backgroundColor:'#FFF',elevation:6,paddingHorizontal: 16,paddingVertical:24}}>
                <Text >Status : {orderStatus}</Text>
                <Text numberOfLines={1} style={{textAlign:'left'}}>Book : {bookName}</Text>
                <Text>Date Order : <DisplayDate date = {orderDate} /> </Text>
                <Text>Name: {name} </Text>
                <Text>Address: {address}</Text>
                <Text>Payment method : {paymentMethod}</Text>
                <Text>Price : <DisplayPrice price = {price} /></Text>
                <Text>Quantity : {quantity}</Text>
                <Text>TotalPrice : <DisplayPrice price = {quantity * price} /> đ</Text>
                <Button 
                    title="Ok"
                    onPress = {() => setShowDetail(false)} 
                    color="red"
                    />
            </View>
        </View>
    }

    return ( <View style = {styles.orderitem}>
        <Modal 
            transparent ={true}
            animationType="fade"
            visible={showDetail}
        >
            <ViewDetail />
        </Modal>

        <View>
            <Image source={{uri : `http://192.168.5.184:8080/image/${image}`}}
                style ={{width : 150, height: 120, borderRadius: 5}}
            />
        </View>

        <View style = {styles.content}>
            <Text >Status : {orderStatus}</Text>
            <Text numberOfLines={1} style={{width:150,textAlign:'right'}}>Book : {bookName}</Text>
            <Text>Date Order : <DisplayDate date = {orderDate} /> </Text>
            
            <Text>TotalPrice : <DisplayPrice price = {quantity * price} /> đ</Text>
            <Button
                title="View Detail"
                onPress = {() => setShowDetail(true)}
            />
        </View>

        
    </View> );
}

const styles = StyleSheet.create({
    orderitem:{
        marginTop:30,
        display:'flex',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:6,
        justifyContent:'space-between',
        backgroundColor :'rgba(0,0,0,0.3)',
        paddingVertical:16,
        // paddingBottom:80
    },
    content:{
        alignItems:'flex-end',
        justifyContent:'center'
    }
})

export default OrderItem;