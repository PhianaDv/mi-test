import { useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useDispatch , useSelector } from 'react-redux';
import { getVehiclesAsync, reset } from '../redux/vehicleSlice';
import VehicleList from './VehicleList';
import * as d3Select from 'd3-selection';

const PeopleList = () => {
const people = useSelector((state) => state.people);
const [vehicleCount, setVehicleCount] = useState(0)
const dispatch = useDispatch();
const tooltipRef = useRef();
function clickVehicles (list,e) {
   
    const displaysetting = d3Select.select(tooltipRef.current).style('display')
    const newdisplay = displaysetting === 'block'?'none':'block'
    d3Select.select(tooltipRef.current)
    .style("display",newdisplay)
    .style("left", e.clientX-650 + "px")
    .style("top",e.clientY - 150 + "px");
    console.log(list.length)
    setVehicleCount(list.length)
    dispatch(reset());
    list.forEach(url => {
    dispatch(getVehiclesAsync(url)) ;  
});
}

return (
  <div>
     <div     
        ref={tooltipRef}    
        className={"VehicleTooltip"} 
        >
        <VehicleList count={vehicleCount}/>
        <Button onClick={() => d3Select.select(tooltipRef.current).style("display","none")}>Close</Button>
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.height}</TableCell>
              <TableCell align="right">{row.mass}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.edited}</TableCell>
              <TableCell align='right'>
                <Button variant='contained' 
                onClick={(event) => clickVehicles(row.vehicles, event)}>
                  Vehicles ({row.vehicles.length})</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default PeopleList