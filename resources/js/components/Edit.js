import React, { Component } from 'react';
import { Spin } from 'antd';
import API from './../settings/ApiBaseUrl';
import ProductForm from './Form';


class EditProduct extends React.Component {

  state = {
    product: {},
    loading: true,
  }

  componentDidMount() {
    API.get(`products/${this.props.match.params.sku}/edit`)
      .then(res => {
        const product = res.data;
        const loading = false;
        this.setState({ product, loading });
      })
  }

  render() {
    const { title } = this.state.product;
    return(
      <React.Fragment>
        <Spin
        tip="Loading..."
        size="large"
        spinning={this.state.loading}>
          <h2>Edit ({title})</h2>
          <ProductForm product={this.state.product}/>
        </Spin>
      </React.Fragment>
    );
  }
}

export default EditProduct;
