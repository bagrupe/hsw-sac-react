import {
  Box, Button,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useState } from 'react';

const useStyles = makeStyles({
  grid: {
    marginLeft: 100,
    minHeight: 400,
  },
  button: {
    marginLeft: 100,
  }
});

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Adresse',
    width: 150,
  },
  {
    field: 'iban',
    headerName: 'IBAN',
    width: 250,
  },
];

function ListCustomers(props) {
  const classes = useStyles();
  const url = props.url;
  const [rows, setRows] = useState([
    { id: 0, name: '<...>', address: '<...>', iban: '<...>' },
  ]);

  const loadCustomers = async () => {
    try {

      const response = await axios.get(url + "/customers", {
        validateStatus: function (status) {
          return status <= 400;
        }
      });

      if (response.status === 400) {
        alert("Kunden konnte nicht abgeholt werden, der Request war schlecht");
      }

      setRows(response.data);
    } catch (error) {
      alert(error.message + " Beim Laden ist etwas schief gegangen.");
    }
  }

  return (
    <Box>
      <DataGrid
        className={classes.grid}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick>
      </DataGrid>
      <Button className={classes.button} onClick={() => loadCustomers()}>
        Kunden laden
      </Button>
    </Box>
  );
}

export default ListCustomers;