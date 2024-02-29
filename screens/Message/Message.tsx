import { View, StyleSheet, Pressable, Text, Image, FlatList, TextInput } from "react-native"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import uuid from 'react-native-uuid'

import { MessageProps } from "../../types/MessageProps";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { saveMessageDispatch } from "../../data/messages/messageSlice";

export default function Message({navigation}){


    const [messages, setMessages] = useState<MessageProps[]>([])
    const [personName, setPersonName] = useState<string>('')

    // chamar o UUID da pessoa a fazer a filtragem
    const conversas = useAppSelector(state => state.message)
    const uuidPerson = useAppSelector(state => state.chatUUIDSelector.uuid)

    const dispatch = useAppDispatch()

    // conversa da pessoa específica
    const conversa = conversas.filter(item => item.personId == uuidPerson)

    useEffect(()=>{
        
        setMessages(conversa[0].messages)
        setPersonName(conversa[0].personName)

    }, [])

    

    const [inputMessage, setInputMessage] = useState<string>("")

    const messagesFixed = [
        {
            id: 1,
            sender: 'other',
            message: 'Olá Camarada, vi que você se tornou um monstro imbatível, espero que possa confirmar minha admiração para com vossa mercê expondo todos os seus crimes à público, para que assim possa ser executado.',
            date: '28/02/2024'
        },
        {
            id: 2,
            sender: 'me',
            message: 'Desgraça',
            date: '28/02/2024'
        },
        {
            id: 3,
            sender: 'other',
            message: 'Noooooossa!!!!',
            date: '28/02/2024'
        }
    ]

    const newOtherMessage = () => {
        const date = new Date()

        const mesFormatado = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`:`${date.getMonth()+1}`

        setMessages([...messages, {
            id: uuid.v4().toString(),
            message: 'Isso é uma mensagem, caso queira alterar, mude a função newOtherMessage()!!!',
            sender: 'other',
            date: `${date.getDate()}/${mesFormatado}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        }])
    }

    const saveMessage = () => {
        const message = inputMessage
        setInputMessage(null)

        const data = new Date()

        const mesFormatado = data.getMonth()+1 < 10 ? `0${data.getMonth()+1}`:`${data.getMonth()+1}`

        setMessages([...messages, {
            message: message,
            id: uuid.v4().toString(),
            date: `${data.getDate()}/${mesFormatado}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`,
            sender: 'me'
        }])

        // manda pra store
        // dispatch(saveMessage({
        //     personId: uuidPerson,
        //     message: {
        //         id: uuid.v4().toString(),
        //         message: message,
        //         sender: 'me',
        //         date: `${data.getDate()}/${mesFormatado}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`,
        //     }
        // }))
        dispatch(saveMessageDispatch({
            personId: uuidPerson,
            message: {
                id: uuid.v4().toString(),
                sender: 'me',
                message: message,
                date: `${data.getDate()}/${mesFormatado}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`,
            }
        }))
    }

    const MessageItem = ({message, date, color, sender}: MessageProps) => (
        // Quadrado invisível para decidir a posição do quadrado chique dms slkkk
        <View style={{flex: 1, flexDirection: 'row', justifyContent: sender == 'other'?'flex-start':'flex-end', marginBottom: 7, marginTop: 7}}>
            {/* Quadrado interno */}
            <View style={{backgroundColor: color, maxWidth: '75%', padding: 10, borderRadius: 10, borderTopStartRadius: sender == 'other'?0:10, borderTopEndRadius: sender == 'me'?0:10}}>
                <Text style={{fontSize: 16, color: sender=='other'?'#24254f':'#d2d3f2'}}>{message}</Text>
                <Text style={{marginTop: 10, color: sender == 'other'?'#4A4B82':'#9294c7', textAlign: sender=='me'?'right':'left'}}>{date}</Text>
            </View>
            
        </View>
    )

    return (
        <View style={styles.container}>

            {/* Barra superior */}
            <View style={[styles.supBar]}>
                {/* Botão para voltar */}
                <Pressable android_ripple={{color: 'black', radius: 30}} style={{padding: 5}} onPress={()=>{navigation.goBack()}}>
                    <Ionicons name="arrow-back-outline" size={35} color="white"/>
                </Pressable>


                {/* Nome e telefone do camarada */}
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={conversa[0].image} style={{width: 50, height: 50, borderRadius: 100}}/>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>{personName}</Text>
                </View>

                {/* Menu de opções do camarada + foto do camarada */}
                <Pressable android_ripple={{color: 'black', radius: 30}} style={{padding: 5}} onPress={newOtherMessage}>
                    <MaterialCommunityIcons name="dots-horizontal" size={35} color="white" />
                </Pressable>
            </View>

            {/* Lista de mensagens */}
            <FlatList style={[styles.messageBox]} data={messages} renderItem={({item}) => <MessageItem color={item.sender == 'other'?'#899fe0':'#686294'} message={item.message} date={item.date} sender={item.sender}/>} keyExtractor={item => item.id}/>

            {/* Input */}
            <View style={styles.sendMessageBar}>
                <TextInput style={styles.inputMessage} placeholder="Digite sua mensagem..." onChangeText={setInputMessage} value={inputMessage} multiline></TextInput>
                <Pressable style={{padding: 10}} android_ripple={{color: 'black', radius: 30}} onPress={()=>saveMessage()}>
                    <MaterialCommunityIcons name="send" size={24} color="white" />
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#2e2b42',
      justifyContent: 'space-between'
    },
  
    supBar:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 'auto',
      padding: 10,
      backgroundColor: '#1b192b',
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20
    },
  
    supBarText: {
      color: 'white'
    },
  
    messageBox: {
      flex: 1,
      height: 10,
      backgroundColor: '#2e2b42',
      paddingHorizontal: 15,
    },
  
    sendMessageBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1b192b',
      padding: 5,
      minHeight: 50,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20
    },

    inputMessage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 12,
        backgroundColor: '#d2d3f2',
        margin: 10,
        padding: 12
    },
  
  })