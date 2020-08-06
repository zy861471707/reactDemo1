import React, {Component} from 'react';
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons';
import { login } from '../../apis/user';
import Code from '../../components/code/index'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        // 创建一个 ref 来存储 textInput 的 DOM 元素
        this.textInput = React.createRef();
        this.state = {
            userName:''
        }
    }

    onFinish = values => {
        login().then(res=>{
            console.log(res.data)
        });
        console.log('Received values of form: ', values);
    };

    formInputChange = (changedValues, allValues) => {
        this.setState({
            userName:changedValues.username
        })
    };

    gotoFrom = () => {
        this.props.switch('register')
    };

    render() {
        return (
            <div className="form-type">
                <Row justify="center" className="form-title">
                    <Col span={16}>
                        <Row justify="space-between" align="bottom">
                            <Col>
                                <h1 className="title">登录</h1>
                            </Col>
                            <Col>
                                <h3 className="title" onClick={this.gotoFrom}>注册</h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Form name="normal_login" size="large" className="login-form" onFinish={this.onFinish} onValuesChange={this.formInputChange}>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="username" rules={[
                                    {required: true, message: '请输入邮箱!'},
                                    {type:'email', message: '请输入正确邮箱!'},
                                    // ({ getFieldValue }) => ({
                                    //     validator(rule, value) {
                                    //         const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
                                    //         if(reg.test(this.state.userName)){
                                    //             /**
                                    //              * 这里使用这种模式可以和验证码按钮的disable属性进行搭配操作
                                    //              */
                                    //             return Promise.resolve();
                                    //         }
                                    //         return Promise.reject('请输入正确邮箱!');
                                    //     },
                                    // })
                                ]}>
                                <Input allowClear ref={this.textInput} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入邮箱"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="password" rules={[{required: true, message: '请输入密码!'}]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" allowClear placeholder="请输入密码"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Form.Item name="code" rules={[{required: true, message: '请输入验证码!'},{type: 'string', len:6, message: '请输入六位验证码!'}]}>
                                        <Input prefix={<MobileOutlined className="site-form-item-icon"/>} maxLength={6} allowClear placeholder="请输入验证码"/>
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    {/*<Button type="primary" loading={ this.state.code_btn_loading } onClick={this.getCode} block className="login-form-button getCode">{ this.state.code_btn_text }</Button>*/}
                                    <Code userName={this.state.userName} userNameFocus={this.textInput}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>
                                <Button type="link" className="login-form-forgot" size="small">忘记密码</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item>
                                <Button type="primary" block htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

