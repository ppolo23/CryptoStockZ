import React from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";
import { withCookies } from 'react-cookie';
import Select from 'react-select';

import { CreateDigitalProduct, GetBaseProducts } from "../../services/BackendService";
import { CreateProduct } from '../../services/ContractService';


class NewDigitalProduct extends React.Component {

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      idBaseProduct: "",
      productAddress: "0x0000000000",
      owner_address: "0x973AEe0C82633edaf13B56536762Cbc766F44ee3", // account0
      dna: "1234",
      level: 1,
      uniqueId: "",
      isManufacturer: false,
      token: cookies.get('x-access-token'),
      roles: cookies.get('roles'),
      username: cookies.get('username'),
      productsName: []
    };
  }

  componentDidMount() {
    if (this.state.roles === "ROLE_MANUFACTURER") {
      this.setState({
        isManufacturer: true
      });
    }

    GetBaseProducts(this.state.token)
      .then(function (response) {
        response.data.baseProducts.map(baseProductName => {
          this.state.productsName.push({ label: baseProductName.name, value: baseProductName.id })
        });
        this.setState({ productsName: this.state.productsName })
      }.bind(this));
  }

  createDigitalProduct(event) {

// TODO -> poner _dna en vez de dna cuando recompiles el contrato

    event.preventDefault();
    CreateProduct(this.state.idBaseProduct.toString(), this.state.uniqueId.toString())
      .then((response) => {
        let newProduct = response.events.createProductEvent.returnValues;
        console.log(newProduct);
        CreateDigitalProduct(
          this.state.token,
          newProduct._baseId,
          newProduct._productAddress,
          newProduct._owner,
          newProduct._level,
          newProduct._dna,
          newProduct._uniqueId
        )
          .then(function (response) {
            //this.clearFields()
            console.log(response);
            alert("Successful! New product created!");
          })
          .catch(error => {
            console.log(error)
            alert("Error creating a new product!")
            //revert
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(e) {
    if (e.target.id === "selectUniqueId") {
      this.setState({ uniqueId: e.target.value });
    }
  }

  handleBaseProduct(e) {
    this.setState({ idBaseProduct: e.value });
  }

  render() {
    // const isEnabled = this.state.name.length > 0 && this.state.ean.length > 0 && this.state.sku.length > 0 && this.state.manufacturer.length > 0;
    // const isEnabledUsers = this.state.name.length > 0 && this.state.ean.length > 0 && this.state.sku.length > 0;
    const isEnabled = true;
    return (
      <div className="NewDigitalProduct">
        <Form.Group controlId="selectBaseProduct">
          <Form.Label>Base Product</Form.Label>
          <Select options={this.state.productsName} onChange={(e) => this.handleBaseProduct(e)} />
        </Form.Group>
        <Form.Group controlId="selectUniqueId">
          <Form.Label>Unique Id</Form.Label>
          <Form.Control type="input" placeholder="Product Unique Id" onChange={(e) => this.handleChange(e)} value={this.state.uniqueId} />
        </Form.Group>
        {this.state.isManufacturer ?
          <Button variant="primary" type="submit" onClick={e => this.createDigitalProduct(e)} disabled={!isEnabled}>Register</Button>
          :
          <Button variant="primary" type="submit" onClick={e => this.createDigitalProduct(e)} disabled={!isEnabled}>Apply register</Button>
        }
      </div>
    );
  }
}

export default withCookies(NewDigitalProduct);