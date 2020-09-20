import React from 'react';
import { Container, Row, Col, Image, Tabs, Tab, ListGroup } from 'react-bootstrap';
import './UserProfile.css';

import UserProductList from '../UserProductList/UserProductsList';
import UserWishList from '../UserWishList/UserWishList';
import NewProduct from '../NewProduct/NewProduct';
import NewDigitalProduct from '../NewProduct/NewDigitalProduct';
import PendingProductList from '../PendingProductList/PendingProductList';

import { withCookies } from 'react-cookie';
import { GetUserInfo } from '../../services/BackendService';

class UserProfile extends React.Component {

    constructor(props){
        super(props);
        const {cookies} = props;
        this.state = {
            user: {
            },
            token: cookies.get('x-access-token'),
            roles: cookies.get('roles'),
            username: cookies.get('username')
        };
    }

    componentDidMount() {
        GetUserInfo(this.state.token, this.state.username)
        .then(function(response){
            console.log(JSON.stringify(response));
            this.setState({
                user: response.data.user
            });
        }.bind(this));
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <div className="user_img">
                            <Image src="https://www.w3schools.com/howto/img_avatar.png" width="250px" rounded />
                        </div>
                        <div className="user_information">
                            <ListGroup>
                                <ListGroup.Item>Username: <strong>{this.state.user.username}</strong></ListGroup.Item>
                                <ListGroup.Item>Email: <strong>{this.state.user.email}</strong></ListGroup.Item>
                                <ListGroup.Item>Level: <strong>{this.state.user.level}</strong></ListGroup.Item>
                                <ListGroup.Item>Sales: <strong>{this.state.user.sales}</strong></ListGroup.Item>
                                <ListGroup.Item>Purchases: <strong>{this.state.user.purchases}</strong></ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div>
                            <Tabs defaultActiveKey="products" unmountOnExit id="noanim-tab-example">
                                <Tab eventKey="products" title="Products">
                                    <div className="container">
                                        <UserProductList />
                                    </div>
                                </Tab>
                                <Tab eventKey="wish" title="Wish List">
                                    <div className="container">
                                        <UserWishList />
                                    </div>
                                </Tab>
                                {this.state.roles === "ROLE_MANUFACTURER" ? (
                                    <Tab eventKey="pending" title="Pending Products">
                                        <div className="container">
                                            <PendingProductList  />
                                        </div>
                                    </Tab>
                                ) : null}
                                <Tab eventKey="new" title="New Product">
                                    <div className="container">
                                        <NewProduct />
                                    </div>
                                </Tab>
                                {this.state.roles === "ROLE_MANUFACTURER" ? (
                                    <Tab eventKey="digital" title="New Digital Product">
                                        <div className="container">
                                            <NewDigitalProduct />
                                        </div>
                                    </Tab>
                                ) : null}
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withCookies(UserProfile);