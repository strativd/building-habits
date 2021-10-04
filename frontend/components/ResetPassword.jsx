/* eslint-disable no-console */
import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Form, Input, Button, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Error from './ErrorMessage';
import Login from './Login';
import { Card } from './styles/components';
import { RESET_PASSWORD_MUTATION } from './graphql/users';
import ResetRequest from './ResetRequest';

export default function ResetPassword({ token }) {
  const [form] = Form.useForm();

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: {
        ...form.getFieldsValue(),
        token,
      },
    },
  );

  const resetSuccessful = data?.redeemUserPasswordResetToken === null;

  const validationError = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit() {
    await resetPassword()
      .then(() => {
        form.resetFields(['password']);
      })
      .catch((err) => {
        console.error(err);
        message.error('Oh oh... Something went wrong 😬');
      });
  }

  if (resetSuccessful) {
    message.success('Your password has been reset 🔑');

    return (
      <Login />
    );
  }

  return (
    <>
      <Card>
        <Form
          method="POST"
          form={form}
          name="reset-password"
          onFinish={handleSubmit}
        >
          <h1>Reset password!</h1>

          <Error error={error || validationError} />

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
              Save password
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {(validationError || error) && <ResetRequest />}
    </>
  );
}
