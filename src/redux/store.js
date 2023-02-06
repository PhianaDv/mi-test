import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./peopleSlice"
import vehicleReducer from "./vehicleSlice"

export default configureStore({
    reducer: {
        people : peopleReducer,
        vehicles : vehicleReducer
    }
});