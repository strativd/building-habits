import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useUser from './useUser';
import Logout from './Logout';

const { Footer, Header, Content } = Layout;

const Logo = styled.div`
    float: left;
    width: 100px;
    height: 100%;
    text-align: center;
`;

const LogoImage = styled.img`
      width: auto;
      height: 100%;
      vertical-align: top;
`;

const Frame = ({ children }) => {
  const user = useUser();
  const router = useRouter();

  return (
    <Layout>
      <Header className="site-header">
        <Logo>
          <LogoImage className="logo__image" title="haBits logo" alt="haBits logo" src="/static/habits_small.png" />
        </Logo>
        <Menu theme="dark" mode="horizontal" selectedKeys={[router.pathname]}>
          <Menu.Item key="/">
            <Link href="/">HABITS</Link>
          </Menu.Item>
          {user
            ? (
              <Menu.Item key="/logout">
                <Logout />
              </Menu.Item>
            )
            : (
              <Menu.Item key="/login">
                <Link href="/login">LOG IN 👋</Link>
              </Menu.Item>
            )}
        </Menu>
      </Header>
      <Content className="site-layout">
        <div className="site-layout__background">
          {children}
        </div>
      </Content>
      <Footer className="site-footer">
        <span role="img" aria-label="checkmark">✅ </span>
        <a href="https://github.com/ztratify/building-habits" target="_blank" rel="noreferrer">
          haBits — building habits, bit by bit.
        </a>
      </Footer>
    </Layout>
  );
};

export default Frame;
