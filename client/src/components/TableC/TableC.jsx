import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import Pagination from '@mui/material/Pagination';

import './TableC.css';
import { initiateTableData } from '../../store/userSlice';

const TableC = () => {
  const dispatch = useDispatch();

  // States for pagination
  const [page, setPage] = useState(1);
  const [countOfPage, setCountOfPage] = useState(1);
  const [currentTableData, setCurrentTableData] = useState([]);

  // Cookies
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // Data for table from the store
  let tableData = useSelector((state) => state.user.tableData);

  // Hanlde the pagination
  const handleChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      setCurrentTableData(tableData.slice(0, 9));
    } else {
      const count = value * 9;
      setCurrentTableData(tableData.slice(count - 9, count));
    }
  };

  useEffect(() => {
    // fetch the whole data only on the first load. otherwise, update according to the pagnation
    if (tableData.length === 0) {
      const getDataFunc = async () => {
        // Getting the data from the backend with token being passed in with req
        const getDataReq = await fetch('http://localhost:3001/api/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: cookies.token }),
        });
        const getDataRes = await getDataReq.json();
        // Setting the current table data with the limit of per page value in pagination
        setCurrentTableData(getDataRes.data.slice(0, 9));
        // Inserting all the table data into the store, which is to be used later on.
        dispatch(initiateTableData(getDataRes.data));
        // Setting the count of pages in pagination according to the data count in main table data
        setCountOfPage(() => {
          return Math.ceil(getDataRes.data.length / 9);
        });
      };
      getDataFunc();
    } else {
      // setting the current table data and count of pages on every render incase not to loose the data in state
      setCurrentTableData(tableData.slice(0, 9));
      setCountOfPage(() => {
        return Math.ceil(tableData.length / 9);
      });
    }

    // eslint-disable-next-line
  }, []);

  function BasicTable() {
    return (
      // Table
      <TableContainer
        style={
          tableData.length > 0
            ? { width: '97%', margin: '1em auto', height: '78.4vh' }
            : { width: '97%', margin: '1em auto' }
        }
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ color: 'white' }}
                className="table-cell"
                align="center"
              >
                Company Name
              </TableCell>
              <TableCell
                style={{ color: 'white' }}
                className="table-cell"
                align="center"
              >
                Email Address
              </TableCell>
              <TableCell
                style={{ color: 'white' }}
                className="table-cell"
                align="center"
              >
                Phone No
              </TableCell>
              <TableCell
                style={{ color: 'white' }}
                className="table-cell"
                align="center"
              >
                Contact Person
              </TableCell>
              <TableCell
                style={{ color: 'white' }}
                className="table-cell"
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTableData.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">{row.companyName}</TableCell>
                <TableCell align="center">{row.companyMail}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{row.contactPerson}</TableCell>
                <TableCell align="center">
                  <MoreVertIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <div className="table-container">
      <div style={{ marginTop: '0em', marginLeft: '1em' }} className="title">
        {/* View table title */}
        <h1>View Clients</h1>
        <p>Client master / View clients</p>
      </div>
      {/* Table */}
      <BasicTable />
      {/* display table content only if the data is present. else, display the error message */}
      {tableData.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '15 em' }}>
          No data is availbe in table!
        </p>
      ) : (
        /* Pagination */
        <div style={{ marginLeft: '1em' }}>
          <Pagination count={countOfPage} page={page} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default TableC;
