/* eslint-disable no-console */
import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Form, Input, Button, message,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Error from './ErrorMessage';
import { Card } from './styles/components';
import { RESET_REQUEST_MUTATION } from './graphql/users';

export default function ResetRequest() {
  const [form] = Form.useForm();

  const [resetRequestEmail, { loading, error }] = useMutation(
    RESET_REQUEST_MUTATION,
    {
      variables: form.getFieldsValue(),
    },
  );

  async function handleSubmit() {
    await resetRequestEmail()
      .then(() => {
        message.success('Success! 👌 Check your email...');
        form.resetFields();
      })
      .catch((err) => {
        message.error('Oh oh... Something went wrong 😬');
        console.error(err);
      });
  }

  return (
    <Card>
      <Form
        method="POST"
        form={form}
        name="request-reset"
        onFinish={handleSubmit}
      >
        <h1>Reset password?</h1>

        <Error error={error} />

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please provide a valid email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" disabled={loading}>
            Send email
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
