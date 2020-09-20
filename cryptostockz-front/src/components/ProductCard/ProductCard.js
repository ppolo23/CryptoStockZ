import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mergeImages from 'merge-images';

import WishButton from '../wishButton';



class ProductCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainImage: ""
        }
    }

    componentDidMount() {
        if (this.props.loaded) {
            this.combineImages();
        }
    }

    combineImages() {
        mergeImages([
            { src: `data:image/png;base64,${this.props.productInfo.images[0]}`, x: 0, y: 0 },
            { src: `data:image/png;base64,${this.props.productInfo.images[1]}`, x: 60, y: 25 },
            { src: `data:image/png;base64,${this.props.productInfo.images[2]}`, x: 20, y: 0 },
            { src: `data:image/png;base64,${this.props.productInfo.images[3]}`, x: 360, y: 200 }
        ])
            .then(b64 => {
                this.setState({ mainImage: b64 });
            });
    }

    render() {
        return (
            <div align="center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.state.mainImage} />
                    <Card.Body>
                        <Card.Title>{this.props.productInfo.name} - Digital </Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Dna: {this.props.productInfo.dna}</ListGroup.Item>
                            <ListGroup.Item>Id: {this.props.productInfo.uniqueIdentificator}</ListGroup.Item>
                            <ListGroup.Item>Address: {this.props.productInfo.address}</ListGroup.Item>
                            <ListGroup.Item>Owner: {this.props.productInfo.owner_address}</ListGroup.Item>
                            <ListGroup.Item>Level: {this.props.productInfo.level}</ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Link to={`/products/${this.props.productInfo.id}`}>See</Link>
                        <br></br>
                        <WishButton token={this.props.token} productId={this.props.productInfo.id} productAddress={this.props.productInfo.address} />
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ProductCard;