
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPeopleAsync = createAsyncThunk(
    'slice/getPeopleAsync',
    async () => {
        const response = await fetch("https://swapi.dev/api/people/");
        if (response.ok) {
            const people = await response.json()
            return people.results
        }
    }
);

export const filterPeopleAsync = createAsyncThunk(
    'slice/filterPeopleAsync',
    async (payload) => {
        const response = await fetch(`https://swapi.dev/api/people/?search=${payload}`);
        if (response.ok) {
            const people = await response.json()
            return people.results
        }
    }
);

const peopleSlice = createSlice({
    name: "people",
    initialState: [],
    extraReducers : {
        [getPeopleAsync.fulfilled] : (state, action) => {
            return action.payload
        },
        [filterPeopleAsync.fulfilled] : (state, action) => {
            return action.payload
        }
    }
});


export default peopleSlice.reducer