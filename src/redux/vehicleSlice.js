import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = [];

export const getVehiclesAsync = createAsyncThunk(
    'slice/getVehiclesAsync',
    async (payload) => {
        const response = await fetch(`${payload}`);
        if (response.ok) {
            const vehicle = await response.json()
            return vehicle
        }
    }
);

const vehicleSlice = createSlice ({
    name: "vehicles",
    initialState,
    reducers:{
        reset: (state, action) => state = initialState
    },
    extraReducers:{
        [getVehiclesAsync.fulfilled] : (state, action) => {
            state.push(action.payload)
            },
        },
});

export const { reset } = vehicleSlice.actions;
export default vehicleSlice.reducer
