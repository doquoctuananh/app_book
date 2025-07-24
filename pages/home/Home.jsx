import { FlatList, StyleSheet, Text,
     TextInput, View,Button, 
     Pressable} from "react-native";
import styles from "./HomeStyle.jsx"
import DefaultLayout from "../../src/Layout/DefaultLayout/DefaultLayout.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState,useEffect,createContext } from "react";
import TableBook from "~pages/home/TableBook";
import ForwardPage from "../../src/components/ForwardPage/ForwardPage.jsx";
function Home() {
    const [token,setToken] = useState("")
    const [books,setBooks] = useState({})
    const [page,setPage] = useState(0)
    const [search,setSearch] = useState("")
    useEffect(() => {
        const getToken = async() => {
            const get = await AsyncStorage.getItem("token");
            if(get){
                setToken(get)
            }
        }

        getToken()
    },[])

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("page",page)
        let query = params.toString()
        fetch(`http://192.168.5.184:8080/api/home/books?${query}`,{
            method:"GET",

        })
        .then(response => response.json())
        .then(data => {
            setBooks(data) 
        })
    },[page,token])

    

    const handleSearch = () => {
        if(search !== ""){
            setPage(0);
            const params = new URLSearchParams();
            
        }
    }
    
    // console.log(search)
    return ( <View style ={styles.home}>
        
            <DefaultLayout>
                <View style={styles.content}>
                    <View style ={styles.search}>
                        <View style = {{flex:0.8}}>
                            <TextInput
                                style = {{
                                    backgroundColor:'rgb(163, 220, 154)',
                                    height:40,
                                    borderRadius:5
                                }} 
                                value = {search}
                                placeholder="Nhập tên sách"
                                
                                onChangeText = {(text) => setSearch(text)}
                            />
                        </View>
                        <View style = {{flex:0.2}}>
                            <Pressable 
                                onPress = {handleSearch}
                                style = {{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'rgb(255, 122, 48)',
                                borderRadius:5,
                                height:40}}>
                                <Text >Search</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                    <FlatList 
                        data={books.content}
                        renderItem={({item,index}) => {
                            return <TableBook
                                id={item.id}
                                key={index}
                                name = {item.bookName}
                                price ={item.price}
                                author ={item.author}
                                language={item.language}
                                image={item.imageUrl}
                                quantity = {item.quantity}
                                token ={token}
                            />
                        }}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />

                    <ForwardPage 
                        list = {books}
                        setPage = {setPage}
                    />
                </View>
            </DefaultLayout>
        
    </View> );
}


export default Home;