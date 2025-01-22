import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { Volunteer } from "../types/volunteerTypes";

type initialStateType = {
  volunteers: Volunteer[];
  loading: boolean;
  error: string;
};

const initialState: initialStateType = {
  volunteers: [],
  loading: false,
  error: "",
};

const url = `https://neog-assignment-22-backend.onrender.com/api/volunteer`;

// read all Volunteers
export const fetchVolunteers = createAsyncThunk<
  Volunteer[], // Success type
  void, // Argument type (args)
  { rejectValue: string } // Rejected value type
>("volunteers/fetchVolunteers", async (args, { rejectWithValue }) => {
  try {
    const result = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      return result.data.volunteers;
    } else {
      return rejectWithValue("Failed to fetch volunteers");
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return rejectWithValue(errorMessage);
  }
});

// add new Volunteer
export const addVolunteer = createAsyncThunk<
  Volunteer, // Success type
  void, // Argument type (args)
  { rejectValue: string } // Rejected value type
>("volunteers/addVolunteer", async (body, { rejectWithValue }) => {
  try {
    const result = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 201) {
      return result.data.volunteer;
    } else {
      return rejectWithValue("Failed to add volunteer");
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return rejectWithValue(errorMessage);
  }
});

interface UpdateVolunteerArgs {
  id: string;
  newVolunteer: Partial<Volunteer>; // Use `Partial` if not all fields of `Event` are required
}

// updating an existing Volunteer
export const updateVolunteer = createAsyncThunk<
  Volunteer, // Success type
  UpdateVolunteerArgs, // Argument type (args)
  { rejectValue: string } // Rejected value type
>("volunteers/updateVolunteer", async (data, { rejectWithValue }) => {
  try {
    const result = await axios.post(`${url}/${data.id}`, data.newVolunteer, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      return result.data.volunteer;
    } else {
      return rejectWithValue("Failed to update volunteer");
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return rejectWithValue(errorMessage);
  }
});

// delete an existing volunteer
export const deleteVolunteer = createAsyncThunk<
  Volunteer, // Success type
  void, // Argument type (args)
  { rejectValue: string } // Rejected value type
>("volunteers/deleteVolunteer", async (volunteerId, { rejectWithValue }) => {
  try {
    const result = await axios.delete(`${url}/${volunteerId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      return result.data.volunteer;
    } else {
      return rejectWithValue("Failed to delete volunteer");
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return rejectWithValue(errorMessage);
  }
});

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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
        toast.error("Error while deleting Volunteer!");
      });
  },
});

export default volunteerSlice.reducer;
