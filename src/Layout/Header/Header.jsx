import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Badge } from 'react-native-paper';
import { useContext } from "react";
import TotalQuantityCart from "../DefaultLayout/CartContext";
// import { TotalQuantityCart } from "../DefaultLayout/DefaultLayout.jsx";
function Header() {
    const navigate = useNavigation()
    const {totalQuantityCart} = useContext(TotalQuantityCart);

    return ( <View style = {styles.header}>
        <TouchableOpacity style = {styles.icon} onPress = {() => navigate.navigate("home")}>
            <View >
                <Feather name="home" size={24} color="white" />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.icon} onPress ={() => navigate.navigate("cart")}>

            <View style={{ position: 'relative' }}>
                  <Feather name="shopping-cart" size={24} color="white" />
                  <Badge
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -10,
                      backgroundColor: 'red',
                      color: 'white',
                      fontSize: 16,
                    }}
                  >
                    {totalQuantityCart}
                  </Badge>
                </View>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.icon} onPress ={() => navigate.navigate("orders")}>
            <View >
                <MaterialIcons name="history" size={24} color="white" />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.icon} onPress={() => navigate.navigate("setting")}>
            <View >
                <Feather name="settings" size={24} color="white" />
            </View>
        </TouchableOpacity>
    </View> );
}

const styles = StyleSheet.create({
    header : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: 'rgb(122, 122, 115)',
        elevation:8,
        paddingVertical: 6,
        height:60
    },
    icon:{
        // backgroundColor:'red',
        paddingVertical: 10,
        paddingHorizontal:10,
        alignItems:'center'
    }
})

export default Header;