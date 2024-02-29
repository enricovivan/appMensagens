import { View, Text, Button, ImageSourcePropType, Image, Pressable, StyleSheet } from "react-native";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { setChatUUID } from "../../data/messageSelect/messageSelectSlice";

import { MessageState } from "../../data/messages/messageSlice";

import { Entypo } from '@expo/vector-icons';

interface LastMessage {
    author: string
    message: string
}

export default function MessageList({navigation}){

    const pessoas = useAppSelector(state => state.message)
    const uuidPessoas = useAppSelector(state => state.chatUUIDSelector.uuid)
    const dispatch = useAppDispatch()

    const renderListItemPessoa = (source: ImageSourcePropType, personName: string, onPress: ()=>void, key: string, lastMessage: LastMessage) => (
        <View key={key}>
            <Pressable onPress={onPress} style={st.chatBox}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>

                    <Image source={source} style={{width: 70, height: 70, borderRadius: 100, borderColor: '#686294', borderWidth: 2}}/>

                    <View style={{flex: 1, flexGrow: 1, marginLeft: 15, justifyContent: 'space-between', paddingVertical: 5}}>
                        <Text style={{fontSize: 18, color: '#1b192b', fontWeight: '500'}}>{personName}</Text>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 16, color: 'black'}}>{`${lastMessage.author}: ${lastMessage.message}`}</Text>
                    </View>

                    <Entypo name="chevron-right" size={35} color="black" style={{padding: 5}}/>

                </View>
            </Pressable>
            {/* <View style={st.divider}></View> */}
        </View>
    )

    const goToChat = (uuid: string) => {
        dispatch(setChatUUID(uuid))
        navigation.navigate("Contato")
    }

    return (
        <View style={[st.container]}>
            
            {/* Header */}
            <View style={st.header}>
                <Text style={st.title}>Mensagens</Text>
            </View>

            {/* Lista de Mensagens */}
            <View style={st.messages}>
                {pessoas.map(item => renderListItemPessoa(item.image, item.personName, ()=>{goToChat(item.personId)}, item.personId, {
                    author: item.messages[item.messages.length-1].sender == 'me'?'Eu':item.personName.split(' ')[0],
                    message: item.messages[item.messages.length-1].message
                    }))}
            </View>

        </View>
    )
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#2e2b42'
    },
    header: {
        width: 'auto',
        minHeight: 25,
        padding: 20,
        backgroundColor: '#1b192b',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: '500'
    },
    messages: {
        padding: 15
    },
    chatBox: {
        backgroundColor: '#d2d3f2',
        marginBottom: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    divider: {
        borderBottomColor: '#686294',
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 2,
        marginBottom: 15
    }
})