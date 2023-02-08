import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesAsync, reset } from "../redux/vehicleSlice";
import VehicleList from "./VehicleList";

const PeopleList = () => {
  const people = useSelector((state) => state.people);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [vehicleList, setVehicleList] = useState([]);
  const dispatch = useDispatch();
  const tooltipRef = useRef();

  const clickVehicles = useCallback((e, list) => {
    const displaysetting = tooltipRef.current.style.display;
    const newdisplay = displaysetting === "block" ? "none" : "block";
    tooltipRef.current.style.display = newdisplay;
    const y = e.clientY - 150 < 0 ? 0 : e.clientY - 150;
    tooltipRef.current.style.left = e.clientX - 650 + "px";
    tooltipRef.current.style.top = y + "px";
    setVehicleList(list);
  }, []);

  useEffect(() => {
    setVehicleCount(vehicleList.length);
    dispatch(reset());
    vehicleList.forEach((url) => {
      dispatch(getVehiclesAsync(url));
    });
  }, [vehicleList, dispatch]);

  return (
    <div>
      <div ref={tooltipRef} className={"VehicleTooltip"}>
        <Button
          onClick={() => (tooltipRef.current.style.display = "none")}
          sx={{ float: "right" }}
        >
          Close
        </Button>
        <VehicleList count={vehicleCount} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Height</TableCell>
              <TableCell align="right">Mass</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Edited</TableCell>
              <TableCell align="right">Vehicles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.height}</TableCell>
                <TableCell align="right">{row.mass}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">
                  {row.edited.substring(0, 10)}_{row.edited.substring(11, 16)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={(e) => clickVehicles(e, row.vehicles)}
                  >
                    Vehicles ({row.vehicles.length})
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PeopleList;
