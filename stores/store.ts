import { configureStore } from "@reduxjs/toolkit"
import messageReducer from '../data/messages/messageSlice'
import chatReducer from '../data/messageSelect/messageSelectSlice'

export const store = configureStore({
    reducer: {
        message: messageReducer,
        chatUUIDSelector: chatReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch