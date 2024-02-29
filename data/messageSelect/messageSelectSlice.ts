import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../stores/store"


export interface ChatSelectState {
    uuid: string
}

const initialState: ChatSelectState = {
    uuid: ''
}

export const chatUUIDSelectorSlice = createSlice({
    name: 'chatUUIDSelector',
    initialState,
    reducers: {
        setChatUUID: (state, action) => {
            state.uuid = action.payload
        }
    }
})

export const {setChatUUID} = chatUUIDSelectorSlice.actions

export const selectChat = (state: RootState) => state.message.toString()

export default chatUUIDSelectorSlice.reducer