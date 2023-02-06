import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';







const VehicleList = (props) => {
    const { count } = props;
    const [loaded, setLoaded] = useState(false)
    const vehicles = useSelector((state) => state.vehicles)
    useEffect(()=> {
        if (vehicles.length===count) {
            setLoaded(true)
        }
        else {
            setLoaded(false)
        }
    },[vehicles, count])
    return (
        <div style={{color: "white"}}>
            {count===0?'No Vehicles to Display': 'Vehicles'}
    {!loaded?(  
    <Box sx={{ display: 'flex',justifyContent:"center",
  alignItems:"center", marginTop: "5px"}}>
      <CircularProgress />
    </Box>):(
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Manufacturer</TableCell>
            <TableCell align="right">Vehicle Class</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.manufacturer}</TableCell>
              <TableCell align="right">{row.vehicle_class}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    </div>

    )
};


export default VehicleList