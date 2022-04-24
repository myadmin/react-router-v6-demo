import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, MenuProps, Breadcrumb } from 'antd';
import { PieChartOutlined, DesktopOutlined, } from '@ant-design/icons';
import { Link, matchRoutes, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import router from '../../router';
import './index.css';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
}));

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items2: MenuItem[] = [
    getItem(<Link to={'/'}>首页</Link>, '/', <PieChartOutlined />),
    getItem(<Link to={'/user'}>用户管理</Link>, '/user', <DesktopOutlined />),

    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Option 7', '7'),
    //     getItem('Option 8', '8'),
    // ]),
];

const LayoutPage = () => {
    const { login } = useContext(MyContext);
    const [defaultSelectedKeys, setSelectKey] = useState<string[]>(['1']);
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>(['1']);
    const [initial, setInitial] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    console.log('login', login);
    useEffect(() => {
        if (!login) {
            return navigate('/login')
        }
    }, [login, navigate]);

    useEffect(() => {
        const routes = matchRoutes(router, { pathname: location.pathname });
        console.log('routes', routes, location.pathname);
        const pathArr: string[] = [];
        if (routes && routes.length) {
            routes.forEach(item => {
                const path = item.route.path;
                if (path === location.pathname) {
                    pathArr.push(path);
                }
            });
        }
        console.log('pathArr', pathArr);
        setSelectKey(pathArr);
        setDefaultOpenKeys(pathArr);
        setInitial(true);
    }, [location.pathname]);

    if (!initial) {
        return null;
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        defaultSelectedKeys={defaultSelectedKeys}
                        defaultOpenKeys={defaultOpenKeys}
                        mode="inline"
                        items={items2}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {/* @ts-ignore */}
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {/* @ts-ignore */}
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        {/* @ts-ignore */}
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        {/* @ts-ignore */}
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default LayoutPage;