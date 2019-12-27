import React, { Component } from 'react';
import { Table, Divider, Tag, AutoComplete  } from 'antd';
import API from '../settings/ApiBaseUrl';
import { Link } from "react-router-dom";

class ProductList extends React.Component {

  state = {
      keyword: null,
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

  deleteProduct(e, id) {
    e.preventDefault();
    this.setState({ loading: true });
    let products = this.state.products.filter(item => {
      return item.id !== id;
    });
    API.delete(`products/${id}`)
    .then(res => {
        let result = res.data;
        (result.message === 'Success') ? this.setState({ products, loading: false }) : '';
    });

  }

  handleChange(keyword) {
    this.setState({ keyword });
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
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
            <a href="#" onClick={(e) => this.deleteProduct(e, item.id)}>Delete</a>
          </span>
        ),
      },
    ];
    let searchSuggestions = this.state.products.map(item => item.title);
    let newProducts = (this.state.keyword) ?

                        this.state.products.filter(item => {
                          const lc = item.title.toLowerCase();
                          const filter = this.state.keyword.toLowerCase();
                          return lc.includes(filter);
                        })

                      :
                       this.state.products;

    return (
      <React.Fragment>
        <div id="products-table">
          <h1>Product List</h1>
          <Link to="/create" className="btn-style ant-btn ant-btn-primary">Create Product</Link>
          <br />
          <AutoComplete
              style={{ width: '100%' }}
              dataSource={searchSuggestions}
              placeholder="Search bar"
              onChange={(keyword) => this.handleChange(keyword)}
              filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
          />
          <br />
          <br />
          <Table
            columns={columns}
            dataSource={newProducts}
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
