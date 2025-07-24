// Trong PrivateNavigator.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { ActivityIndicator, View } from 'react-native';

function PrivateNavigator({children}) {
    const navigate = useNavigation();
    const [token,setToken] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect( () => {
        const checkToken = async () => {
            try {
                let storedToken = await AsyncStorage.getItem("token");
                if(storedToken){
                    setToken(storedToken);
                } else {
                    setToken(null); 
                    navigate.navigate("login"); 
                }
            } catch (e) {
                console.error("Lỗi khi đọc token từ AsyncStorage:", e);
                setToken(null);
                navigate.navigate("login");
            } finally {
                setIsLoading(false); 
            }
        };
        checkToken();
    },[]); 

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <>
            {token ? children : null}
        </>
    );
}

export default PrivateNavigator;