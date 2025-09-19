import React from "react";
import Card from "antd/es/card/Card";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const onFinish = (values: string) => {
    console.log("Success:", values);
    // Here you can call your login API
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Card>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold items-center text-center pt-5">
          Login
        </h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ maxWidth: 300, margin: "0 auto", marginTop: "50px" }}
        >
          <Row justify="center" align={"middle"}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                type="text"
                placeholder="Enter Username"
                required={true}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  min: 4,
                  message: "Password must be minimum 4 characters",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Enter Your Password"
                required={true}
                maxLength={8}
                minLength={4}
              />
            </Form.Item>
            <Row justify="space-between" align="middle">
              <Col>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Row>
          <Row justify="center" align="middle" className="mt-4">
            <Form.Item>
              <Link to="/shop">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Link>
            </Form.Item>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default Login;
