import { StyleSheet,TextInput,View,Text } from "react-native";

function MyTextInput({
    value,
    keyboardType,
    placeholder,
    secureTextEntry,
    auto=false,
    onChangeText=false,
    error
}) {
    return (<View >
        <TextInput 
            value = {value}
            keyboardType = {keyboardType}
            placeholder= {placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText = {onChangeText}
            autoCapitalize={auto}
            style = {styles.input}
        /> 
    </View> 
)
    ;
}

const styles = StyleSheet.create({
    input:{
        color:'#fff',
        backgroundColor:"rgba(0,0,0,0.3)",       
        paddingHorizontal:12,
        paddingTop:16,
        paddingBottom:16,
        borderRadius:6,
    },
    error:{
        color:'red'
    }
})

export default MyTextInput