import AntDesign from '@expo/vector-icons/AntDesign';
import { Alert, StyleSheet, Text,View } from 'react-native';
function ForwardPage({
    list,
    setPage
}) {

    const forward = (e) => {
        console.log(e.target.name)
    }

    return ( <View style={styles.page}>
        {list.first != true ? <AntDesign 
            name="banckward" 
            size={24} 
            color="black" 
            onPress = {() => setPage(page => page-1)}
            /> : ''}

        <Text style= {{marginHorizontal:10,fontSize:16}}>
            {list.number + 1} / {list.totalPages}
        </Text>

        {list.last != true ? <AntDesign 
            name="forward" 
            size={24} 
            color="black" 
            onPress = {() => setPage(page => page+1)}
            /> : ''}
    </View> );
}

const styles = StyleSheet.create({
    page:{
        paddingTop:12,
        display :'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ForwardPage;