import React, { Component } from 'react';
import ProductForm from './Form';

class CreateProduct extends React.Component {
  state = {
    product: { title: '' }
  }
  render() {
    return (
      <ProductForm product={this.state.product}/>
    );
  }
}

export default CreateProduct;
