import React, { Component } from 'react';
import ProductForm from './Form';

class CreateProduct extends React.Component {

  render() {
    return (
      <React.Fragment>
          <h1>Create Product</h1>
          <ProductForm type="create"/>
      </React.Fragment>
    );
  }
}

export default CreateProduct;
