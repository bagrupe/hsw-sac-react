import {
  Box, Button, DialogTitle, FormControl, TextField, Card, CardContent, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useState } from 'react';

const useStyles = makeStyles({
  form: {
    marginLeft: 100,
  },
  formfield: {
    minWidth: 400,
  },
});

function ShowCustomer(props) {
  const classes = useStyles();
  const url = props.url;

  const [customerId, setCustomerId] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [iban, setIban] = useState();

  const getCustomer = async () => {
    try {

      const response = await axios.get(url + "/customer/" + customerId, {
        validateStatus: function (status) {
          return status <= 400;
        }
      });

      if (response.status === 400) {
        alert("Kunde konnte nicht abgeholt werden, der Request war schlecht");
      }

      setName(response.data?.name);
      setAddress(response.data?.address);
      setIban(response.data?.iban);
    } catch (error) {
      alert(error.message + " Beim Laden ist etwas schief gegangen.");
    }
  }

  const onChangeCustomerId = (event) => {
    setCustomerId(event.target.value);
  };
  return (
    <Box>
      <DialogTitle>Kunde anzeigen</DialogTitle>
      <FormControl className={classes.form}>

        <TextField
          className={classes.formfield}
          disabled={false}
          label="KundenId"
          type={Number}
          value={customerId}
          onChange={onChangeCustomerId}
        />
      
      <Button onClick={() => getCustomer()}>
        Kunde anzeigen
      </Button>
      </FormControl>
      <Box>
        <Card>
          <CardContent>
            <Typography>
              Name: {name}
            </Typography>
            <Typography>
              Adresse: {address}
            </Typography>
            <Typography>
              IBAN: {iban}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ShowCustomer;