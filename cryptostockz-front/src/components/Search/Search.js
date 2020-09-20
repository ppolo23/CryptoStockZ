import React from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import BaseProductCard from '../BaseProductCard/BaseProductCard';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { GetManufacturers, GetBaseProducts, SearchInBack } from "../../services/BackendService";

import { withCookies } from 'react-cookie';

class Search extends React.Component {

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      val: '',
      manufacturer: "",
      manufacturers: [],
      baseProduct: "",
      baseProducts: [],
      products: [],
      token: cookies.get('x-access-token'),
      roles: cookies.get('roles'),
      username: cookies.get('username')
    };
  }

  updateSearchValue(event) {
    this.setState({
      val: event.target.value
    });
    console.log(event.target.value);
  }

  search(event) {

    SearchInBack(this.state.token, this.state.baseProduct, this.state.manufacturer)
      .then(response => {
        console.log(response);
        this.setState({
          products: response.data.message
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    GetManufacturers(this.state.token)
      .then(function (response) {
        response.data.users.map(manufacturer => {
          this.state.manufacturers.push({ label: manufacturer.name, value: manufacturer.id })
        });
        this.setState({ manufacturers: this.state.manufacturers })
      }.bind(this));

    GetBaseProducts(this.state.token)
      .then(function (response) {
        response.data.baseProducts.map(baseProduct => {
          this.state.baseProducts.push({ label: baseProduct.name, value: baseProduct.id })
        });
        this.setState({ baseProducts: this.state.baseProducts })
      }.bind(this));
  }

  handleManufacturers(e) {
    this.setState({ manufacturer: e.value });
  }

  handleBaseProducts(e) {
    this.setState({ baseProduct: e.value });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="mx-auto text-center">Search</h3>
          <div>
            <Form.Group as={Row}>
              <Col>
                <Form.Text className="text-muted">
                  Choose your manufacturer
                </Form.Text>
                <Form.Group controlId="selectManufacturer">
                  <Select options={this.state.manufacturers} onChange={(e) => this.handleManufacturers(e)} />
                </Form.Group>
              </Col>
                  {this.state.manufacturer !== "" ?
                <Col>
                  <Form.Text className="text-muted">
                    Choose your product
                  </Form.Text>
                  <Form.Group controlId="selectBaseProduct">
                    <Select options={this.state.baseProducts} onChange={(e) => this.handleBaseProducts(e)} />
                  </Form.Group>
                </Col>
                : (
                  <Col>
                    <Form.Text className="text-muted">&nbsp;</Form.Text>
                    <Form.Group controlId="selectBaseProduct">&nbsp;</Form.Group>
                  </Col>
                )
              }
              <Col>
                <Form.Text className="text-muted">&nbsp;</Form.Text>
                <InputGroup.Append>
                  <Button variant="secondary" onClick={e => this.search(e)}>Browse</Button>
                </InputGroup.Append>
              </Col>
            </Form.Group>
          </div>
        </div>
        <div className="container">
          {this.state.products.length === 0 ? (
            <Grid align="center" container spacing={5}>
              <span>There are no products</span>
            </Grid>
          ) : (
              <Grid align="center" container spacing={5}>
                {this.state.products.map((product) => {
                  return (
                    <Grid item xs={6} key={product.id} >
                      <BaseProductCard productInfo={product} key={product.id} />
                    </Grid>
                  )
                })}
              </Grid>
            )}
        </div>
      </div>
    )
  }
}

export default withCookies(Search);