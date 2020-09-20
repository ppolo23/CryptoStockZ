import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';
import { withCookies } from 'react-cookie';

import { Spinner } from 'react-bootstrap';

import { GetAllProducts } from '../../services/BackendService';


class Catalog extends React.Component {

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            products: [],
            loaded: false,
            token: cookies.get('x-access-token'),
            roles: cookies.get('roles'),
            username: cookies.get('username')
        };
    }

    componentDidMount() {
        GetAllProducts(this.state.token)
            .then(function (response) {
                console.log(JSON.stringify(response));
                this.setState({
                    products: response.data.products,
                    loaded: true
                });
            }.bind(this));
    }

    render() {
        return (
            <div className="container">
                <h3 className="mx-auto text-center">Catalog</h3>
                {!this.state.loaded ? (
                    <div align="center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : [
                        (this.state.products === 0 ?
                            <Grid align="center" container spacing={5}>
                                <span>There are no products</span>
                            </Grid>
                            : (<Grid align="center" container spacing={3}>
                                {this.state.products.map((product) => {
                                    return (
                                        <Grid item xs={4} key={product.id}>
                                            <ProductCard productInfo={product} token={this.state.token} loaded={true} />
                                        </Grid>
                                    )
                                })}
                            </Grid>)
                        )
                    ]
                }
            </div>
        )
    }
}

export default withCookies(Catalog);