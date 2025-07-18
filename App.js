import { StatusBar } from 'expo-status-bar';
import {  SafeAreaView,StyleSheet,View
 } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicNavigator,privateNavigator } from './navigation/Navigator.jsx';
import PrivateNavigator from './navigation/PrivateNavigatior.jsx';
export default function App() {
    const Stack = createNativeStackNavigator()
    return (
        <SafeAreaView style= {styles.area}>

            <View style ={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName ="login">
                        {publicNavigator.map((route,index) => {
                            let Comp = route.component;
                            return <Stack.Screen 
                                        key = {route.name}
                                        name = {route.name}
                                        component = {Comp}
                                        options={route.options ? route.options : {headerShown:false}}
                                    />
                        })}

                        {
                            privateNavigator.map((route,index) => {
                                let Comp = route.component;
                                return <Stack.Screen 
                                    key = {route.name}
                                    name = {route.name}
                                    component = {() => {
                                        <PrivateNavigator>
                                            <Comp />
                                        </PrivateNavigator>
                                    }
                                    }
                                    options= {route.options ? route.options : {headerShown:false}}
                                />
                            })
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  area : {
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  
});
