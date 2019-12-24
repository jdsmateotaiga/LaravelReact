import React, { Component } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  Upload,
  Spin,
  notification
} from 'antd';

import API from '../settings/ApiBaseUrl';
const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {

  state = {
    autoCompleteResult: [],
    products: {
      sku: '',
      title: '',
      amount: 0,
      images: '',
      stocks: 1,
      body: '',
    },
    loading: false
  };

  openNotification = title => {
    notification.info({
      message: `${title}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        API.post(`products`, values)
        .then(res => {
          const result = res.data;
          this.setState({ loading: false });
          this.props.form.resetFields();
          if(result.data === 'Success') {
            this.openNotification(values.title);
          } else {
            this.props.form.setFields({
              sku: {
                value: '',
                errors: [new Error(result.sku[0])],
              },
            })
          }
        });
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { sku, title,  amount, images, stocks, body } = this.state.products;

    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 10 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span>SKU</span>
          }
        >
          {getFieldDecorator('sku', {
            initialValue: sku,
            rules: [{ required: true, message: 'Please input product SKU!', whitespace: true }],
          })(<Input autoComplete="off" />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Title
              <Tooltip title="Please enter the complete product name.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [{ required: true, message: 'Please input your title!', whitespace: true }],
          })(<Input autoComplete="off"/>)}
        </Form.Item>

        <Form.Item
          label={
            <span>Amount</span>
          }
        >
          {getFieldDecorator('amount', {
            initialValue: amount,
            rules: [{ required: true, message: 'Please input product Amount!' }],
          })(<InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />)}
        </Form.Item>

        <Form.Item
          label={
            <span>Stocks</span>
          }
        >
          {getFieldDecorator('stocks', {
            initialValue: stocks,
            rules: [{ required: true, message: 'Please input product Stocks!' }],
          })(<InputNumber min={1} max={10} />)}
        </Form.Item>

        <Form.Item label="Dragger">
          {getFieldDecorator('images', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>,
          )}
        </Form.Item>

        <Form.Item
          label={
            <span>Description</span>
          }
        >
          {getFieldDecorator('body', {
            initialValue: body,
            rules: [{ required: true, message: 'Please input product Stocks!', whitespace: true }],
          })(<TextArea rows={4} />)}
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
            <Spin
              size="small"
              spinning={this.state.loading}>
              <Button type="primary" htmlType="submit">
                { this.props.type }
              </Button>
            </Spin>
        </Form.Item>

      </Form>
    );
  }
}

const ProductForm = Form.create({ name: 'register' })(RegistrationForm);
export default ProductForm;
