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

function IbanValidator(props) {
  const classes = useStyles();
  const url = props.url;
  const [iban, setIban] = useState("DE75888888880000012345");
  const [valid, setValid] = useState("");
  const [message, setMessage] = useState("Bitte Button klicken");

  const validateIbanAxios = async () => {
    try {
      const response = await axios.get(url+"/ValidateIban?iban="+iban, {
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

  const validateIban = async () => {
    try {
      await fetch (url + "/ValidateIban?iban="+iban, {
        method: 'GET',
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

  const onChangeIban = (event) => {
    setIban(event.target.value);
    setValid("false");
    setMessage("Bitte Button klicken");
  };

  return (
    <Box>
      <Box>
        <DialogTitle>IBAN validieren</DialogTitle>
        <FormControl className={classes.form}>
        <TextField
          disabled={false}
          label="IBAN"
          type={String}
          value={iban}
          onChange={onChangeIban}
          className={classes.formfield}
        />
        <Button
          onClick={() => validateIban()}
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

export default IbanValidator;