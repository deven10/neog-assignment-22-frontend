import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "../Features/eventSlice";
import { volunteerSlice } from "../Features/volunteerSlice";

export default configureStore({
  reducer: {
    events: eventSlice.reducer,
    volunteers: volunteerSlice.reducer,
  },
});
