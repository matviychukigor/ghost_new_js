import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {Context} from "..";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const Residential = () => {
    const {proxy} = useContext(Context)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedId, setSelectedID] = useState(null);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onClickProxyHandler = (id, rowProxy) => {
      proxy.setInfoLoading(true)
      proxy.setSelecteProxy(rowProxy)
      proxy.setSpeedProxy(rowProxy.speed)
      setSelectedID(id)
      console.log(id)
    }

    return (
        <TableContainer component={Paper}>
        <Table stickyHeader  sx={{ minWidth: 500 }} aria-label="sticky table">
            <TableHead>
                <TableRow>
                    <TableCell>IP</TableCell>
                    <TableCell align="left">HostName</TableCell>
                    <TableCell align="left">Country</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">ZIP</TableCell>
                    <TableCell align="left">Speed</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
            {(rowsPerPage > 0
                ? proxy.proxyInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : proxy.proxyInfo
            ).map((row) => (
                <TableRow hover selected={selectedId === row.id_proxy ? true : false} onClick={() => onClickProxyHandler(row.id_proxy, row)} key={row.id_proxy}>
                  <TableCell style={{ width: "15%"}} component="th" scope="row">
                      {row.ip}
                  </TableCell>
                  <TableCell style={{ width: "15%" }} align="left">
                      {row.domain}
                  </TableCell>
                  <TableCell style={{ width: "17%" }} align="left">
                      {row.country}
                  </TableCell>
                  <TableCell style={{ width: "15%" }} align="left">
                      {row.state === "" ? "---" : row.state}
                  </TableCell>
                  <TableCell style={{ width: "15%" }} align="left">
                      {row.city === "-" || row.city === "" ? "---" : row.city}      
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align="left">
                      {row.zip === "" ? "---" : row.zip}
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align="left">
                      {row.speed}
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align="left">
                      {row.type}
                  </TableCell>
                  <TableCell style={{ width: "3%" }} align="left">
                  </TableCell>
                </TableRow>
            ))}

            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                    'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    );
}

export default Residential;