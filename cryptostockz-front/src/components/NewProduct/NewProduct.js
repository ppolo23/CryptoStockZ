import React from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";
import { withCookies } from 'react-cookie';
import { CreateNewProduct, GetManufacturers } from "../../services/BackendService";

class NewProduct extends React.Component {

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      name: "",
      ean: "",
      sku: "",
      manufacturer: "",
      isManufacturer: false,
      token: cookies.get('x-access-token'),
      roles: cookies.get('roles'),
      username: cookies.get('username'),
      manufacturers: []
    };
  }

  clearFields() {
    this.setState({ name: "" });
    this.setState({ ean: "" });
    this.setState({ sku: "" });
  }

  checkData() {
    if (this.state.isManufacturer) {
      this.setState({ manufacturer: this.state.username });
      return (this.state.name === "" || this.state.ean === "" || this.state.sku === "");
    } else {
      return (this.state.name === "" || this.state.ean === "" || this.state.sku === "" || this.state.manufacturer === "");
    }
  }

  registerNewProduct(event) {
    event.preventDefault();

    if (this.checkData()) {
      alert("Complete all fields");
    } else {
      CreateNewProduct(
        this.state.token,
        this.state.name,
        this.state.ean,
        this.state.sku,
        this.state.manufacturer)
        .then(function (response) {
          this.clearFields()
          alert("Successful! New product created!")
          // NotificationManager.success('New product created!', 'Successful!', 2000);
        }.bind(this))
        .catch(error => {
          alert("Error creating a new product!")
          // NotificationManager.error('Error creating new book!', 'Error!', 2000);
        });
    }
  }

  handleChange(e) {
    if (e.target.id === "formBasicName") {
      this.setState({ name: e.target.value });
    } else if (e.target.id === "formBasicEan") {
      this.setState({ ean: e.target.value });
    } else if (e.target.id === "formBasicSku") {
      this.setState({ sku: e.target.value });
    } else if (/*this.state.isManufacturer && */ e.target.id === "selectManu") {
      this.setState({ manufacturer: e.target.value });
    }
  }

  componentDidMount() {
    if (this.state.roles === "ROLE_MANUFACTURER") {
      this.setState({
        isManufacturer: true
      });
    }

    // TODO: Debemos crear una petición en el back que devuelva todos los manufacturers
    GetManufacturers(this.state.token)
      .then(function (response) {
        let manufacturersFromApi = response.data.users.map(manufacturer => {
          return { value: manufacturer.id, display: manufacturer.name }
        });
        this.setState({
          manufacturers: [{ value: '', display: 'Select your manufacturer' }].concat(manufacturersFromApi)
        });
      }.bind(this));
  }

  render() {
    const isEnabled = this.state.name.length > 0 && this.state.ean.length > 0 && this.state.sku.length > 0 && this.state.manufacturer.length > 0;
    // const isEnabledUsers = this.state.name.length > 0 && this.state.ean.length > 0 && this.state.sku.length > 0;
    return (
      <div className="Newproduct">
        <Form.Group controlId="formBasicName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="input" placeholder="Product name" onChange={(e) => this.handleChange(e)} value={this.state.name}/>
        </Form.Group>
        <Form.Group controlId="formBasicEan">
          <Form.Label>EAN</Form.Label>
          <Form.Control type="input" placeholder="Product Ean" onChange={(e) => this.handleChange(e)} value={this.state.ean}/>
        </Form.Group>
        <Form.Group controlId="formBasicSku">
          <Form.Label>SKU</Form.Label>
          <Form.Control type="input" placeholder="Product Sku" onChange={(e) => this.handleChange(e)} value={this.state.sku}/>
        </Form.Group>
        <Form.Group controlId="selectManu">
          <Form.Label>Manufacturer</Form.Label>
          <Form.Control as="select" onChange={(e) => this.handleChange(e)}>
            {this.state.manufacturers.map((manufacturer) => <option key={manufacturer.value} value={manufacturer.value}>{manufacturer.display}</option>)}
          </Form.Control>
        </Form.Group>
        {this.state.isManufacturer ?
          <Button variant="primary" type="submit" onClick={e => this.registerNewProduct(e)} disabled={!isEnabled}>Register</Button> 
          :
          <Button variant="primary" type="submit" onClick={e => this.registerNewProduct(e)} disabled={!isEnabled}>Apply register</Button>
        }
      </div>
    );
  }
}

export default withCookies(NewProduct);