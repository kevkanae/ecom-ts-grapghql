import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userSlice, userSliceReducer } from "../redux/reducers/user";
import { addToCart } from "./API/addToCartApi";
import { productAPi } from "./API/productAPI";
import { rtkQueryErrorLogger } from "./middleware/middleware.error";
export const store = configureStore({
  reducer: combineReducers({
    user: userSliceReducer,
    [productAPi.reducerPath]: productAPi.reducer,
    [addToCart.reducerPath]: addToCart.reducer,
  }),
  // default middleware provided by rtk which enable the superpower of refetching the query on internet reconnection
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      productAPi.middleware
      // rtkQueryErrorLogger
    );
  },
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
