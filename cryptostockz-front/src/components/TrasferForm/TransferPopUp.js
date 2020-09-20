import React from 'react';
import './PopUp.css';
import { Button } from 'reactstrap';

import Grid from '@material-ui/core/Grid';
import { Form } from 'react-bootstrap';

import { TransferProduct } from '../../services/ContractService';
import { UpdateProduct } from '../../services/BackendService';

class TransferPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiver: ""
        }
    }

    transferProduct() {
        console.log("Tansfer" + typeof(this.props.id));
        TransferProduct(this.state.receiver, this.props.address)
            .then(response => {
                let values = response.events.transferTokenEvent.returnValues;
                UpdateProduct(this.props.token,values._to, values._newDna, this.props.id)
                    .then(response => {
                        alert("Successful! Product transfered");
                        window.location.reload(true);
                    })
                    .catch(error => {
                        console.log(error)
                        alert("Error transfering")
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(e) {
        if (e.target.id === "formBasicReceiver") {
            this.setState({ receiver: e.target.value });
        }
    }

    closePopup(e) {
        this.props.show = false;
        alert(this.props.show);
    }

    FormPage() {
        return (
            <div className="container">
                <Form>
                    <Form.Label>Transfer producto ownership</Form.Label>
                    <Grid container spacing={3}>
                        <Grid item md={6}>
                            <Form.Group controlId="formBasicReceiver">
                                <Form.Control type="username" placeholder="Enter receiver address" onChange={e => this.handleChange(e)} />
                            </Form.Group>
                        </Grid>
                        <Grid item md={3}>
                            <Button color="primary" onClick={e => this.transferProduct(e)}>Transfer</Button>
                        </Grid>
                        <Grid item md={3}>
                            <Button color="danger" onClick={this.props.closePopup}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Form>
            </div>
        );
    };

    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    {this.FormPage()}
                </div>
            </div>
        );
    }
}

export default TransferPopUp;
