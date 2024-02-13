import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const url = `https://neog-assignment-22-backend.onrender.com/api/event`;

// read all Events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        return result.data.events;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// add new event
export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 201) {
        return result.data.event;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// updating an existing Events
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${url}/${data.id}`, data.newEvent, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.event;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// delete an existing student
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${url}/${eventId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.event;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const eventSlice = createSlice({
  name: "eventsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while fetching all Events!");
      })
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        toast.success("New Event added successfully!");
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while adding new Event!");
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
        toast.success("Event Updated successfully!");
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while updating Event!");
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(
          (event) => event._id !== action.payload._id
        );
        toast.success("Event Deleted successfully!");
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while deleting Event!");
      });
  },
});

export default eventSlice.reducer;
