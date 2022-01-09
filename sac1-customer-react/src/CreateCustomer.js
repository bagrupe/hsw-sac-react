import {
  Box, Button, DialogTitle, FormControl, TextField
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

function CreateCustomer(props) {
  const classes = useStyles();
  const url = props.url;

  const [customerId, setCustomerId] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [iban, setIban] = useState();

  const createCustomer = async () => {
    try {
      let request = { name: name, address: address, iban: iban };
      const response = await axios.post(url + "/customer", request, {
        validateStatus: function (status) {
          return status <= 400;
        }
      });

      if (response.status === 201) {
        alert("Kunde erfolgreich gespeichert");
      }

      if (response.status === 400) {
        alert("Kunde konnte nicht gespeichert werden, der Request war schlecht");
      }

      setCustomerId(response.data?.id);
    } catch (error) {
      alert(error.message + " Beim Laden ist etwas schief gegangen.");
    }
  }

  const onChangeCustomer = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "customerName") {
      setName(value);
    }

    if (name === "customerAddress") {
      setAddress(value);
    }

    if (name === "customerIban") {
      setIban(value);
    }

  };

  return (
    <Box>
      <DialogTitle>Kunde anlegen</DialogTitle>
      <FormControl className={classes.form}>

        <TextField
          className={classes.formfield}
          disabled={true}
          label="KundenId"
          type={Number}
          value={customerId}
          defaultValue="0"
        />

        <TextField
          className={classes.formfield}
          disabled={false}
          label="Name"
          type={String}
          value={name}
          name="customerName"
          onChange={onChangeCustomer}
        />

        <TextField
          className={classes.formfield}
          disabled={false}
          label="Adresse"
          type={String}
          value={address}
          name="customerAddress"
          onChange={onChangeCustomer}
        />

        <TextField
          className={classes.formfield}
          disabled={false}
          label="IBAN"
          type={String}
          value={iban}
          name="customerIban"
          onChange={onChangeCustomer}
        />
        <Button onClick={() => createCustomer()}>
        Kunde speichern
      </Button>
      </FormControl>
      


    </Box>
  );
}

export default CreateCustomer;