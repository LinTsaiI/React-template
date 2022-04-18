import { createSlice } from '@reduxjs/toolkit';

export const demoSlice = createSlice({
  name: 'demo',
  initialState: {
    demo: 'this is a demo',
  },
  reducers: {
    demoAction: (state, actions) => {
      // do something
    },
  }
});

export const { demoAction } = demoSlice.actions;
export default demoSlice.reducer;