import { configureStore } from '@reduxjs/toolkit'
import demoReducer from './slice/demoSlice';

export default configureStore({
  reducer: {
    demo: demoReducer,
  },
})