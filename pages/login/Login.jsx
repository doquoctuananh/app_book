import { View,Text, Button,TextInput,
    KeyboardAvoidingView,TouchableOpacity ,
    Platform,
    Pressable
 } from "react-native";
import styles from "./LoginStyles.jsx"
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
function Login() {
    const navigate = useNavigation();
    const [login,setLogin] = useState({
        Username:"",
        Password:""
    })
    return ( <View style ={styles.login}>
        <View style={styles.form}>
            <KeyboardAvoidingView
                behavior={Platform.OS== "ios" ? "padding" : "height"}
            >
                <View style ={styles.header}>
                    <Text style={{fontSize: 32,
                        color:"black",
                        fontWeight:800
                        }}>World's Book</Text>
                </View>
                <View style = {styles.container}>
                    {Object.keys(login).map((cur,index) => {
                        return <View key = {index} style= {styles.input}>
                            <TextInput
                                key={index}
                                keyboardType ={ cur =="Password" ?'numeric' : 'email-address'}
                                placeholder= {`Enter ${cur}`}
                                secureTextEntry = {cur =="Password" ? true : false}
                            />
                    </View>
                    })}
                    
                </View>

                <View style = {styles.footer}>
                    <TouchableOpacity 
                        style ={{height:50,
                            backgroundColor:"#FE7743",
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius: 20
                        }}
                    >
                        <Text style ={{fontSize: 20,
                            color:"#fff"
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    </View> );
}

export default Login;