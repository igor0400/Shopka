import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const payOrderAdapter = createEntityAdapter();

const initialState = payOrderAdapter.getInitialState({
   payedOrder: {},
});

const payOrderSlice = createSlice({
   name: 'payOrder',
   initialState,
   reducers: {
      changePayedOrder: (state, action) => {
         state.payedOrder = action.payload;
      },
      clearPayedOrder: (state) => {
         state.payedOrder = {};
      },
   },
});

const { actions, reducer } = payOrderSlice;

export const { changePayedOrder, clearPayedOrder } = actions;

export default reducer;

export const { selectAll } = payOrderAdapter.getSelectors(
   (state) => state.user
);
