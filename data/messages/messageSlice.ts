import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MessageProps } from "../../types/MessageProps";
import { RootState } from "../../stores/store";
import { ImageSourcePropType } from "react-native";


export interface MessageState {
    personId: string
    personName: string
    image: ImageSourcePropType,
    messages: MessageProps[]
}

export interface SaveMessageInPerson {
    personId: string
    message: MessageProps
}

const initialState: MessageState[] = [
    {
        personId: 'd21d3edf-98b6-44df-bd99-bf7fa25d4d2d',
        personName: "Pedro pimentas",
        image: require('../../assets/person_icons/p1.jpg'),
        messages: [
            {
                id: '1',
                sender: 'other',
                message: 'Olá Camarada, vi que você se tornou um monstro imbatível, espero que possa confirmar minha admiração para com vossa mercê expondo todos os seus crimes à público, para que assim possa ser executado.',
                date: '28/02/2024: 19:48'
            },
            {
                id: '2',
                sender: 'me',
                message: 'Desgraça',
                date: '28/02/2024 20:30'
            },
            {
                id: '3',
                sender: 'other',
                message: 'Noooooossa!!!!',
                date: '28/02/2024 20:59'
            },
        ]
    },
    {
        personId: '09dbb0d3-c4a0-41e3-a240-a52bf8510006',
        personName: "La Palma Azucar",
        image: require('../../assets/person_icons/p2.jpg'),
        messages: [
            {
                id: '1',
                sender: 'me',
                message: 'Bom dia, gostaria de um abacaxi, por favor.',
                date: '29/02/2024 07:51'
            },
            {
                id: '2',
                sender: 'other',
                message: 'Não há neste mundo sequer um abacaxi restante, somente o terror que cobre os campos de arroz é capaz de ser obtido no momento.',
                date: '29/02/2024 07:55'
            },
            {
                id: '3',
                sender: 'me',
                message: 'Ah sim',
                date: '29/02/2024 07:55'
            },
            {
                id: '4',
                sender: 'me',
                message: 'Mas então tu não consegue me arrumar um abacaxi mesmo?',
                date: '29/02/2024 07:56'
            },
            {
                id: '5',
                sender: 'other',
                message: 'Não.',
                date: '29/02/2024 07:58'
            },
            {
                id: '6',
                sender: 'me',
                message: 'Ok',
                date: '29/02/2024 08:00'
            },
        ]
    }
]

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        saveMessageDispatch: (state, action: PayloadAction<SaveMessageInPerson>) => {
            const pessoaConversa: MessageState = state.find(person => person.personId == action.payload.personId)
            // adiciona mais uma mensag3em ao chat
            pessoaConversa.messages.push(action.payload.message)
        },
    }
})

export const {saveMessageDispatch} = messageSlice.actions

export const selectMessage = (state: RootState) => state.message

export default messageSlice.reducer