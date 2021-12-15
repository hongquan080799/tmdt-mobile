import React,{useState, useEffect} from 'react'
import { ScrollView , Text, StyleSheet, View, Clipboard} from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { db } from '../firebase'
export default function ChatScreen() {
    const [list, setList] = useState({})
    useEffect(()=>{
        readData();
    },[])
    const readData = ()=>{
        db.collection('voucher').orderBy('timestamp','desc').onSnapshot(snapshot =>{
            const res = snapshot.docs.map(doc => ({id:doc.id,data:doc.data()}));
            // NotificationManager.info('Your have received a voucher discount ' + res[0].data.discount * 100 + ' % of the order', 'Notification for your');
            console.log(res)
            setList(res)
        })

    }
    return (
        <ScrollView>
            {list.map(n =>{
                return (
                    <View style={styles.chatBox} key={n.id}>
                        <View style={styles.chatBoxHead}>
                            <Icon name="circle-notifications" color='#1293fc' size={35}  />
                            <View>
                                <Text style={styles.chatText}>Your have just received a voucher</Text>
                            </View>
                        </View>
                        <View style={styles.chatBoxBody}>
                            <Text style={{color:'#616161'}}>Your have received a voucher discount {n.data.discount * 100} % of your order</Text>
                            <TouchableOpacity onPress={()=> Clipboard.setString(n.data.id)}><Text style={{color:'#808090', marginTop:4}}>Code : {n.data.id}</Text></TouchableOpacity>
                            <Text style={{color:'#808080', marginTop:3}}>Time valid : {new Date(n.data.startDate).toLocaleString()} - {new Date(n.data.endDate).toLocaleString()}</Text>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    chatBox:{
        padding:12,
        backgroundColor:'white',
        marginVertical:10,
        borderRadius:20,
        marginHorizontal:5
    },
    chatBoxHead:{
        flexDirection:'row',
        alignItems:'center',
    },
    chatBoxBody:{
        padding: 5,
    },
    chatText:{
        fontSize:20,
        fontWeight: '300',
        marginLeft:10,
        color:'#909040'
    }
})