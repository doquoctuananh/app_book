import { View,Text, Button,TextInput,
    KeyboardAvoidingView,TouchableOpacity ,
    Platform,ImageBackground,
    Pressable
 } from "react-native";
import styles from "./LoginStyles.jsx"
import { useNavigation } from "@react-navigation/native";
import { useState,useCallback } from "react";
import assests from "../../assets/Assests.jsx"
import MyTextInput from "../../components/MyTextInput/MyTextInput.jsx"
import { ValidateLogin } from "../../components/Validate/Validate.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Login() {
    const navigate = useNavigation();
    
    const [login,setLogin] = useState({
        username:"",
        password:""
    })
    const [errors,setErrors] = useState({})

    const handleForm =useCallback((text,cur) => {
        setErrors({})
        setLogin(prev => {
            return {
                ...prev,
                [cur] :text
            }
        })
    },[])

    const handLogin =() => {
        let error = ValidateLogin(login)
        console.log("error" )
        console.log(error)
        console.log(login)
        if(Object.keys(error).length>0){
            setErrors(error)
        }
    
        else{
            const body = {username:login.username, password:login.password}
            fetch("http://192.168.5.184:8080/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            }) 
            .then( async (response) => {
                if(!response.ok){
                    const mess = await response.json()
                    const messError = {server : mess.message}    
                    setErrors(messError)
                    return;
                }
                return response.json()
            }) 
            .then(data => {
                if(data && data.token){
                    if(data.role  == "USER"){

                        const setToken = async() => {
                            const token = AsyncStorage.setItem("token",data.token)
                            if(token){
                                navigate.navigate("home")
                            }
                        }
                        setToken()                                                            
                    }
                }
            })     
        }
    }

    

    return ( <View style ={styles.login}>
        <ImageBackground
            style = {styles.imagebg} 
            source={assests.imagebook1}  
        >
        <View style={styles.form}>

                <KeyboardAvoidingView
                    behavior={Platform.OS== "ios" ? "padding" : "height"}
                >
                    <View style ={styles.header}>
                        <Text style={{fontSize: 32,
                            color:"black",
                            fontWeight:'800',
                            fontStyle:'italic',
                            
                            }}>World's Book</Text>
                    </View>
                    <View style = {styles.container}>
                        {Object.keys(login).map((cur,index) => {
                            return <View key = {index} style= {styles.input}>
                                <MyTextInput
                                    auto = "none"
                                    value={login[cur]}
                                    onChangeText={(text) =>{handleForm(text,cur)}}
                                    keyboardType ={ cur =="password" ?'numeric' : 'email-address'}
                                    placeholder= {`Enter ${cur}`}
                                    secureTextEntry = {cur == "password" ? true : false}
                                />
                        </View>
                        })}
                        <View style ={{
                            alignItems:'flex-end',
                            
                            }}>
                            <Text style ={{fontSize:20,
                                 color:"#3D74B6"
                            }}>Register?</Text>
                        </View>
                    </View>

                    <View style = {styles.footer}>
                        {/* {Object.keys(errors).length>0 && <Text style= {{color:'red'}}>Khong duoc de trong</Text>
                        }
                        {errors.server && <Text>{errors.server}</Text>} */}
                        <TouchableOpacity 
                            style ={{height:50,
                                backgroundColor:"#FE7743",
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius: 20
                            }}
                            onPress = {handLogin}
                        >
                            <Text style ={{fontSize: 20,
                                color:"#fff"
                            }}
                                 
                            >Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    </View> );
}

export default Login;