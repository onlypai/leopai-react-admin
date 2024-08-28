import { configureStore } from '@reduxjs/toolkit';
import user from './modules/user';
import permissions from './modules/permissions';

const store = configureStore({
  reducer: { user, permissions },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
