/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Form, Input, Button, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from './graphql/users';

const Card = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background: rgb(29,29,29);
`;

export default function SignIn() {
  const [form] = Form.useForm();

  const [signin, { loading }] = useMutation(SIGNIN_MUTATION, {
    // refectch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const router = useRouter();

  const onFinish = async (values) => {
    const res = await signin({ variables: values });

    form.resetFields(['password']);

    const { message: error, item: user } = res?.data?.authenticateUserWithPassword;

    if (user) {
      message.success(`👋 Hey ${user.name}!`);
      router.push({ pathname: '/' });
    } else if (error) {
      message.error(`Oops! ${error}`);
    } else {
      message.error('Oops! Please try again...');
    }
  };

  return (
    <Card>
      <Form
        method="POST"
        form={form}
        name="login"
        onFinish={onFinish}
      >
        <h1>Log in 👋</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please provide a valid email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please provide a password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" disabled={loading}>
            Log in
          </Button>
        </Form.Item>

        <p>
          <Link href="/">Reset your password... 🤷</Link>
        </p>
      </Form>
    </Card>
  );
}
