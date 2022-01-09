import {
    Box, Button, DialogTitle,
    FormControl, TextField
} from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';

class ShowCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = { errorOpen: false, isLoading: false, customer: {} }
    
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        this.setState({customerId: event.target.value});
    }

    loadCustomer = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await axios.get("http://localhost:8080/api/customer/" + this.state.customerId)
            this.setState({ customer: response.data })
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
                            disabled={false}
                            label="KundenId"
                            type={Number}
                            value={this.state.customerId}
                            onChange={this.handleChange}
                        />

                        <TextField
                            disabled={true}
                            label="Name"
                            type={String}
                            value={this.state.customer?.name}
                        />

                        <TextField
                            disabled={true}
                            label="Adresse"
                            type={String}
                            value={this.state.customer?.address}
                        />

                        <TextField
                            disabled={true}
                            label="IBAN"
                            type={String}
                            value={this.state.customer?.iban}
                        />
                    </FormControl>
                    <Button variant="outlined" color="primary" onClick={this.loadCustomer}>
                        Kunde anzeigen
                    </Button>

                </div>


            </Box>
        )
    }
}

export default ShowCustomer;