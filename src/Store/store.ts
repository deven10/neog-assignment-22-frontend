import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "../Features/eventSlice";
import { volunteerSlice } from "../Features/volunteerSlice";

const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
    volunteers: volunteerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
