import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  volunteers: [],
  loading: false,
  error: null,
};

const url = `https://neog-assignment-22-backend.onrender.com/api/volunteer`;

// read all Volunteers
export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        return result.data.volunteers;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// add new Volunteer
export const addVolunteer = createAsyncThunk(
  "volunteers/addVolunteer",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 201) {
        return result.data.volunteer;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// updating an existing Volunteer
export const updateVolunteer = createAsyncThunk(
  "volunteers/updateVolunteer",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${url}/${data.id}`, data.newVolunteer, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.volunteer;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// delete an existing volunteer
export const deleteVolunteer = createAsyncThunk(
  "volunteers/deleteVolunteer",
  async (volunteerId, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${url}/${volunteerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.volunteer;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const volunteerSlice = createSlice({
  name: "volunteersDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers = action.payload;
      })
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while fetching all Volunteers!");
      })
      .addCase(addVolunteer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVolunteer.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers.push(action.payload);
        toast.success("New Volunteer added successfully!");
      })
      .addCase(addVolunteer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while adding new Volunteer!");
      })
      .addCase(updateVolunteer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVolunteer.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers = state.volunteers.map((volunteer) =>
          volunteer._id === action.payload._id ? action.payload : volunteer
        );
        toast.success("Volunteer Updated successfully!");
      })
      .addCase(updateVolunteer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while updating Volunteer!");
      })
      .addCase(deleteVolunteer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVolunteer.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers = state.volunteers.filter(
          (volunteer) => volunteer._id !== action.payload._id
        );
        toast.success("Volunteer Deleted successfully!");
      })
      .addCase(deleteVolunteer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while deleting Volunteer!");
      });
  },
});

export default volunteerSlice.reducer;
