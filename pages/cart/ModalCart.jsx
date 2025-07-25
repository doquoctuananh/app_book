import { StyleSheet, View,Text,Button, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";
import { isValidateInforOrder } from "../../src/components/Validate/Validate";
import { RadioButton} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import DisplayPrice from "../../src/components/DisplayPrice/DisplayPrice";
function ModalCart({
    setShowModal,
    token,
    filterCheck,
    setCheck ,
    totalPrice
}) {

    const [inforOrder,setInforOrder] = useState({
        name : "",
        phone : "",
        address : "",
        payment : ""
    })
    const [errors,setErrors] = useState({})
    const navigate = useNavigation()

    const handlePayment = () => {
        const error = isValidateInforOrder(inforOrder);
        console.log(error)
        if(Object.keys(error).length > 0){
            setErrors(error)
        }
        else{
            console.log(123)
            const params = new URLSearchParams();
            params.append("listCartId",filterCheck.join(",")),
            params.append("name",inforOrder.name)
            params.append("address",inforOrder.address)
            params.append("paymentMethod",inforOrder.payment)
            let query = params.toString()
            console.log(query)
            fetch(`http://192.168.5.184:8080/api/books/orders/create?${query}`,{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.id>0){
                    setShowModal(false)
                    Alert.alert("Đặt hàng thành công")
                    navigate.navigate("home")                   
                }
            })
        }
    }

    const handleCancelPayment = () => {
        setShowModal(false)
        filterCheck.forEach((cur,index) => {
            setCheck(prev => {
                return {
                    ...prev,
                    [cur] : !prev[cur]
                }
            })
        })
    }

    return ( <View style = {styles.modal}>
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios'? "padding":"height"}
        >
            <View style = {styles.centermodal}>
                {
                    Object.keys(inforOrder).map((cur,index) => {
                        return cur !=="payment" ? <>                       
                            <TextInput
                                    value={inforOrder[cur]}
                                    onChangeText={text => {setInforOrder(prev => {
                                        return {
                                            ...prev,
                                            [cur] : text
                                        }
                                    })}}
                                    style ={styles.modalinput}
                                    placeholder= {`Enter ${cur}`}
                            /> 
                            <Text style ={{color:'red'}}>{errors[cur] || null}</Text>
                        </> : <View>
                                <Text style ={{paddingVertical: 16,
                                    backgroundColor:"rgb(163, 220, 154)",
                                    paddingHorizontal: 10
                                }}>
                                        Choose payment method:
                                </Text> 
                                <Text style ={{color:'red'}}>{errors[cur] || null}</Text>
                                <View style ={{alignItems:'flex-start',marginVertical:10}}>                                   
                                    <RadioButton.Group 
                                        onValueChange={(text) => setInforOrder(prev => {
                                            return {
                                                ...prev,
                                                [cur] :text
                                            }
                                        })} 
                                        value={inforOrder[cur]}
                                    >
                                              <View>
                                                <Text>Cash</Text>
                                                <RadioButton value="Cash" />
                                              </View>
                                              <View>
                                                <Text>Bank VNPay</Text>
                                                <RadioButton value="Bank" />
                                              </View>
                                    </RadioButton.Group>
                                </View>                       
                            </View> 
                    })
                }
                
                <View style = {{marginBottom: 12,borderRadius:5}}>
                    <Button 
                        title={`Payment ${totalPrice.toLocaleString("vi-VN")} VND`} 
                        onPress = {handlePayment}
                    />
                </View>
                <Button 
                    title="Cancel"
                    onPress = {handleCancelPayment}
                    color ='red'
                />
            </View>
        </KeyboardAvoidingView>
    </View> );
}

const styles = StyleSheet.create({
    modal:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    centermodal:{
        width:380,
        paddingHorizontal:20,
        paddingVertical:30,
        backgroundColor:"#FFF",
        elevation:10,
        borderRadius:5
    },
    modalinput : {
        backgroundColor:"rgb(163, 220, 154)",
        marginBottom: 10,
        paddingVertical: 16,
        paddingHorizontal: 20,
    }
})

export default ModalCart;