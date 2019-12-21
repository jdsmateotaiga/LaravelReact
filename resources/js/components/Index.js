import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter
} from "react-router-dom";

import ProductList from './ProductList';
import CreateProduct from './Create';
import EditProduct from './Edit';

export default class Index extends Component {
    render() {
        return (
          <div className="container">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={ProductList} />
                <Route exact path="/create" component={CreateProduct} />
                <Route exact path="/edit/:sku" component={EditProduct} />
              </Switch>
            </HashRouter>
          </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
