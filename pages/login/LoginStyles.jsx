import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    login:{
        flex:1,
        
    },
    form:{
        flex:1,
        paddingTop:250 ,
        backgroundColor:"rgba(0,0,0,0.2)",
    },
    header:{
        alignItems:'center',
        
    },
    container:{
        paddingTop:30,
        paddingHorizontal:30,
        rowGap:12
    },
    input: {
        backgroundColor:'#fff',
        borderRadius:6,
        paddingVertical:6,
        paddingHorizontal:8
    },
    footer:{
        marginTop:40,
        paddingHorizontal:30,
        justifyContent:'center'
    }
})

export default styles