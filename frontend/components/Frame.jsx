import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

import useUser from '../lib/useUser';
import Logout from './Logout';

const { Footer, Header, Content } = Layout;

const Frame = ({ children }) => {
  const user = useUser();

  return (
    <Layout>
      <Header>
        <div className="logo">
          <img className="logo__image" title="haBits logo" alt="haBits logo" src="/static/habits_small.png" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['habits']}>
          <Menu.Item key="habits">
            <Link href="/">HABITS</Link>
          </Menu.Item>
          {user
            ? (
              <Menu.Item key="logout">
                <Logout />
              </Menu.Item>
            )
            : (
              <Menu.Item key="login">
                <Link href="/login">LOG IN 👋</Link>
              </Menu.Item>
            )}
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <span role="img" aria-label="checkmark">✅ </span>
        <a href="https://github.com/ztratify/habits" target="_blank" rel="noreferrer">haBits — building habits, bit by bit.</a>
      </Footer>
    </Layout>
  );
};

export default Frame;
