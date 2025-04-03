import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  text-align: center;
  
  .ant-card-body {
    padding: 40px;
  }
  
  h1 {
    color: #333;
    margin-bottom: 24px;
    font-size: 28px;
  }
  
  p {
    color: #666;
    margin-bottom: 32px;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <StyledCard>
        <h1>Bem-vindo ao Sistema de Gestão de Funcionários</h1>
        <p>
          Este sistema permite que você gerencie facilmente seus funcionários em poucos passos.
          Clique no botão abaixo para começar.
        </p>
        <Button 
          type="primary" 
          size="large"
          onClick={() => navigate('/steps')}
        >
          Iniciar Gestão de Funcionários
        </Button>
      </StyledCard>
    </Container>
  );
};

export default Home; 