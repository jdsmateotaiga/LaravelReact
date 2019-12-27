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
    });
  }

  render() {
    const { title } = this.state.product;
    const product_items = (!this.state.loading) ?
      <div>
        <h1>Edit {title}</h1>
        <ProductForm product={this.state.product} type="edit"/>
      </div>
      :
      null;
    return(
      <React.Fragment>
        <div className="form-container">
        <Spin
        tip="Loading..."
        size="large"
        spinning={this.state.loading}>
          {product_items}
        </Spin>
        </div>
      </React.Fragment>
    );
  }
}

export default EditProduct;
