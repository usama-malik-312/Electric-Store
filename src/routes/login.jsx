import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Card } from "antd";

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950">
      <Card className="w-full max-w-sm" bordered={false}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>Login</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage; 