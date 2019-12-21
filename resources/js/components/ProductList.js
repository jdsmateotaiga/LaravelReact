import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import API from '../settings/ApiBaseUrl';
import { Link } from "react-router-dom";

const deleteProduct = (e, id) => {
  e.preventDefault();
  alert(id);
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: id => {id},
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Stocks (qty)',
    key: 'stocks',
    dataIndex: 'stocks'
  },
  {
    title: 'Description',
    key: 'body',
    dataIndex: 'body'
  },
  {
    title: 'Action',
    key: 'action',
    render: (item) => (
      <span>
        <Link to={{
          pathname: `/edit/${item.sku}`,
          state: {item: item }
        }}>Edit</Link>
        <Divider type="vertical" />
        <a href="#" onClick={(e) => deleteProduct(e, item.id)}>Delete</a>
      </span>
    ),
  },
];

class ProductList extends React.Component {

  state = {
    products: [],
    loading: true,
  }

  componentDidMount() {
    API.get(`products`)
    .then(res => {
      const products = res.data;
      const loading = false;
      this.setState({ products, loading });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div id="products-table">
          <h1>Product List</h1>
          <Link to="/create" className="btn-style ant-btn ant-btn-primary">Create Product</Link>
          <Table
            columns={columns}
            dataSource={this.state.products}
            rowKey="id"
            locale={{ emptyText: 'No record available' }}
            loading={this.state.loading}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default ProductList;
