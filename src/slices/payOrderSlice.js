import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const payOrderAdapter = createEntityAdapter();

const initialState = payOrderAdapter.getInitialState({
   payedCart: {},
});

const payOrderSlice = createSlice({
   name: 'payOrder',
   initialState,
   reducers: {
      changePayedCart: (state, action) => {
         state.payedCart = action.payload;
      },
      clearPayedCart: (state) => {
         state.payedCart = {};
      },
   },
});

const { actions, reducer } = payOrderSlice;

export const { changePayedCart, clearPayedCart } = actions;

export default reducer;

export const { selectAll } = payOrderAdapter.getSelectors(
   (state) => state.user
);
