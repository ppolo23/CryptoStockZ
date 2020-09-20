import React from 'react';
import { Container, Row, Col, Image, Button, ListGroup, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import './ProductView.css';

import { withCookies } from 'react-cookie';
import { GetProductInfo, GetUserInfo } from '../../services/BackendService';

import mergeImages from 'merge-images';
import TransferPopUp from '../TrasferForm/TransferPopUp';
import WishButton from '../wishButton';

class ProductView extends React.Component {

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            product: {

            },
            user: {

            },
            token: cookies.get('x-access-token'),
            roles: cookies.get('roles'),
            username: cookies.get('username'),
            images: [],
            mainImage: "",
            imageLoaded: false,
            showPopup: false
        };
    }

    componentDidMount() {

        GetProductInfo(this.state.token, this.props.match.params.productId)
            .then(function (response) {
                console.log(JSON.stringify(response));
                this.setState({
                    product: response.data.product,
                    images: response.data.images,
                    imageLoaded: true
                });
                this.combineImages();
            }.bind(this));

        GetUserInfo(this.state.token, this.state.username)
            .then(function (response) {
                console.log(JSON.stringify(response));
                this.setState({
                    user: response.data.user
                });
            }.bind(this));
    }

    //https://resizeimage.net/
    combineImages() {
        mergeImages([
            { src: `data:image/png;base64,${this.state.images[0]}`, x: 0, y: 10 },
            { src: `data:image/png;base64,${this.state.images[1]}`, x: 60, y: 25 },
            { src: `data:image/png;base64,${this.state.images[2]}`, x: 20, y: 20 },
            { src: `data:image/png;base64,${this.state.images[3]}`, x: 360, y: 200 }
        ])
            .then(b64 => {
                this.setState({ mainImage: b64 });
            });
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <Container className="product_container">
                <Row>
                    <Col sm={4} align="center">
                        <div className="product_img">
                            {this.state.imageLoaded ?
                                <Image src={this.state.mainImage} width="350px" rounded />
                                : null}
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="info">
                            <ListGroup>
                                <ListGroup.Item>Product Name: {this.state.product.name}</ListGroup.Item>
                                <ListGroup.Item>Address: {this.state.product.address}</ListGroup.Item>
                                <ListGroup.Item>DNA: {this.state.product.dna}</ListGroup.Item>
                                <ListGroup.Item>Owner: {this.state.product.owner_address}</ListGroup.Item>
                                <ListGroup.Item>Identificator: {this.state.product.uniqueIdentificator}</ListGroup.Item>
                                <ListGroup.Item>Level: {this.state.product.level}</ListGroup.Item>
                                <ListGroup.Item>Created at: {this.state.product.createdAt}</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="button_container">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2">
                                    {this.state.imageLoaded ?
                                        <WishButton token={this.state.token} productId={this.state.product.id} productAddress={this.state.product.address}></WishButton>
                                        : null}
                                </ButtonGroup>
                                <ButtonGroup className="mr-2">
                                    <Button className="button" onClick={this.togglePopup.bind(this)}>Transfer</Button>
                                    {this.state.showPopup ? <TransferPopUp show={this.state.showPopup} 
                                    address={this.state.product.address} 
                                    id={this.state.product.id}
                                    token={this.state.token}
                                    closePopup={this.togglePopup.bind(this)}/> : null}
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withCookies(ProductView);