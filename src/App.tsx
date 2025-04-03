import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { store, persistor } from './store';
import Home from './components/Home';
import Steps from './components/Steps';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout className="layout">
            <Content className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/steps" element={<Steps />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Content>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App; 