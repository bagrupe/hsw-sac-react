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
  title: {
    fontSize: 14,
  },
});

function IbanCreator(props) {
  const classes = useStyles();
  const url = props.url;

  const [countryCode, setCountryCode] = useState("DE");
  const [bankIdentification, setBankIdentification] = useState("88888888");
  const [accountNumber, setAccountNumber] = useState("12345");

  const [iban, setIban] = useState("");
  const [valid, setValid] = useState("");
  const [message, setMessage] = useState("Bitte Button klicken");

  const createIbanAxios = async () => {
    try {
      let request = { countryCode: countryCode, bankIdentification: bankIdentification, accountNumber: accountNumber };
      const response = await axios.post(url + "/CreateIban", request, {
        validateStatus: function (status) {
          return status <= 400;
        }
      });

      setIban(response.data?.iban);
      setValid(response.data?.valid ? "ja" : "nein");
      setMessage(response.data?.message);
    } catch (error) {
      alert(error.message + " Beim Laden ist etwas schief gegangen.");
    }
  }

  const createIban = async () => {
    let request = { countryCode: countryCode, bankIdentification: bankIdentification, accountNumber: accountNumber };
    try {
        await fetch (url + "/CreateIban", {
          method: 'POST',
          body: JSON.stringify(request),
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(response => response.json())
          .then(data => {
            setIban(data?.iban);
            setValid(data?.valid ? "ja" : "nein");
            setMessage(data?.message);
        });

    } catch (error) {
      alert(error.message + " Beim Laden ist etwas schief gegangen.");
    }
  }

  const onChangeAccount = (event) => {
    setAccountNumber(event.target.value);
    setIban("");
    setValid("false");
    setMessage("Bitte Button klicken");
  };

  const onChangeBank = (event) => {
    setBankIdentification(event.target.value);
    setIban("");
    setValid("false");
    setMessage("Bitte Button klicken");
  };

  return (
    <Box>
      <Box>
        <DialogTitle>IBAN erstellen</DialogTitle>
        <FormControl>
          <TextField
            disabled={false}
            label="Kontonummer"
            type={String}
            value={accountNumber}
            onChange={onChangeAccount}
          />
          <TextField
            disabled={false}
            label="BLZ"
            type={String}
            value={bankIdentification}
            onChange={onChangeBank}
          />
          <Button
            onClick={() => createIban()}
            className={classes.formfield}
          >Click me</Button>

        </FormControl>
      </Box>
      <Box>
        <Card>
          <CardContent>
            <Typography>
              IBAN: {iban}
            </Typography>
            <Typography>
              Valid: {valid}
            </Typography>
            <Typography>
              Message: {message}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default IbanCreator;