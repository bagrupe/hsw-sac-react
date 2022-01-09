import {
    Box, Button, DialogTitle,
    FormControl, TextField
} from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';

class ShowCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = { errorOpen: false, isLoading: false, customerId: 0, customerName: "", customerAddress: "", customerIban: "" }
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    componentDidMount() {

    }

    saveCustomer = async () => {
        this.setState({ isLoading: true });
        try {
            let customer = {name: this.state.customerName, address: this.state.customerAddress, iban: this.state.customerIban}
            const response = await axios.post("http://localhost:8080/api/customer", customer)
            this.setState({ customerId: response.data.id })
        } catch (error) {
            alert(error.message + "Beim Laden ist etwas schief gegangen.");
        }
        this.setState({ isLoading: false });
    }

    render() {

        return (
            <Box>

                <DialogTitle>Kunde anzeigen</DialogTitle>
                <div style={{ height: 300, width: '90%' }}>
                    <FormControl style={{ minWidth: 600, paddingBottom: 15 }}>

                        <TextField
                            disabled={true}
                            label="KundenId"
                            type={Number}
                            value={this.state.customerId}
                        />

                        <TextField
                            disabled={false}
                            label="Name"
                            type={String}
                            value={this.state.customer?.name}
                            onChange={this.handleChange}
                            name="customerName"
                        />

                        <TextField
                            disabled={false}
                            label="Adresse"
                            type={String}
                            value={this.state.customer?.address}
                            onChange={this.handleChange}
                            name="customerAddress"
                        />

                        <TextField
                            disabled={false}
                            label="IBAN"
                            type={String}
                            value={this.state.customer?.iban}
                            onChange={this.handleChange}
                            name="customerIban"
                        />
                    </FormControl>
                    <Button variant="outlined" color="primary" onClick={this.saveCustomer}>
                        Kunde speichern
                    </Button>

                </div>


            </Box>
        )
    }
}

export default ShowCustomer;