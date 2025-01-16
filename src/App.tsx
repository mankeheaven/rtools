import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { KeyOutlined, BarcodeOutlined } from '@ant-design/icons';
import PasswordPage from './pages/password';
import BinaryPage from './pages/binary';

const { Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      key: '/pw',
      icon: <KeyOutlined />,
      label: '密码生成'
    },
    {
      key: '/bin',
      icon: <BarcodeOutlined />,
      label: '进制转换'
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Content style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/pw" replace />} />
          <Route path="/pw" element={<PasswordPage />} />
          <Route path="/bin" element={<BinaryPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
