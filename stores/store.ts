import { configureStore } from "@reduxjs/toolkit"
import messageReducer from '../data/messages/messageSlice'

export default configureStore({
    reducer: {
        message: messageReducer
    }
})