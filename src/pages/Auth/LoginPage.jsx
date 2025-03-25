import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.css';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const sanitizeInput = (input) => input.replace(/[<>"/=]/g, '');

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Sanitize inputs before sending to the backend
      const sanitizedUsername = sanitizeInput(values.username);
      const sanitizedPassword = sanitizeInput(values.password);

      const response = await axios.post(`${API_URL}/login`, {
        username: sanitizedUsername,
        password: sanitizedPassword,
      });

      // MFA handling logic here
      if (response.data.mfa_required) {
        setMfaRequired(true);
        setMfaToken(response.data.mfa_token);
        message.info('MFA required, please check your authenticator app.');
      } else if (response.data.token) {
        handleLoginSuccess(response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 419) {
        message.error('Session expired. Please log in again.');
      } else {
        message.error(error.response?.data?.message || 'Login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

    // Handle successful login (save token and navigate)
    const handleLoginSuccess = (data) => {
      localStorage.setItem('token', data.token); // Save token to localStorage
      localStorage.setItem('userId', data.user.id); // Save user ID
      localStorage.setItem('userRole', data.user.role); // Save user role
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Set header for future requests
  
      // Navigate based on user role
      if (data.user.role === 'employee') {
        navigate('/lead');
      } else {
        message.error('Access denied: Invalid role.');
      }
    };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Employee Login</h2>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username" // Use 'username' here
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="auth-button" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
