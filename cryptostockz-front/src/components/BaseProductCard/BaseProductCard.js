import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { VerifyProduct } from '../../services/BackendService';


class BaseProductCard extends React.Component {

    constructor(props) {
        super(props);
    }

    verifyProduct(e){
        VerifyProduct(this.props.token,this.props.productInfo.id)
        .then(response => {
            alert(response.data);
            window.location.reload(true);
        })
        .catch(error => {
            console.log(error);
        })
    }


    render() {
        return (
            <div align="center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://www.marshall.edu/it/files/question-mark-circle-icon.png" />
                    <Card.Body>
                        <Card.Title>{this.props.productInfo.name} - Base</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Manufacturer: {this.props.productInfo.fk_manufacturer}</ListGroup.Item>
                            <ListGroup.Item>Ean: {this.props.productInfo.ean}</ListGroup.Item>
                            <ListGroup.Item>Sku: {this.props.productInfo.sku}</ListGroup.Item>
                            {this.props.productInfo.original ?
                                <ListGroup.Item>Verified</ListGroup.Item>
                                : (
                                    <ListGroup.Item>Not Verified</ListGroup.Item>
                                )
                            }
                        </ListGroup>
                        {!this.props.productInfo.original ?
                            <div>
                                <br></br>
                                <Button variant="success" onClick={(e) => this.verifyProduct(e)}>Verify</Button>
                            </div>
                            : null
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default BaseProductCard;