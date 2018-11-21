import React, {Component} from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import './login.css';
import {login} from '../../util/HttpAPIUtils';
const ACCESS_TOKEN = 'accessToken';


const FormItem = Form.Item;

class LoginForm extends Component {
    componentDidMount() {
        console.log(this.context);
    }
  
    handleChange = event => {
      this.setState({ 
        name: event.target.value, 
        password: event.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          
          login(values)
          .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.loginHandler(true);
          }).catch(error => {
            if(error.status === 401) {
                notification.error({
                    message: 'Oh No!',
                    description: 'Your Username or Password is incorrect. Please try again!'
                });                    
            } else {
                notification.error({
                    message: 'Oh No!',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });                                            
            }
        });
        }
      });
    }
    

      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h2>Login</h2>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" name="userName" onChange={this.handleChange} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" onChange={this.handleChange} placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
        );
      }
}

export const Login = Form.create()(LoginForm);
