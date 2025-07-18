import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function PrivateNavigator({children}) {
    const navigate = useNavigation()
    const [token,setToken] = useState(false)
    useEffect( () => {
        let getTokenAsync = async () => {
            let getToken = await AsyncStorage.getItem("token");
            if(getToken){

                setToken(getToken)
            }else{
                setToken(0)
                navigate.navigate("login")
            }
        } 
        getTokenAsync()
        
    },[])
    return ( <>
        {token ? children : navigate.navigate("login")}
    </> );
}

export default PrivateNavigator;