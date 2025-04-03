import React from 'react';
import { Card, Switch, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  
  .ant-card-body {
    padding: 16px;
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const InfoText = styled.div`
  h4 {
    margin: 0;
    color: #333;
    font-size: 16px;
  }
  
  p {
    margin: 4px 0 0;
    color: #666;
    font-size: 14px;
  }
`;

interface EmployeeCardProps {
  employee: {
    id: number;
    name: string;
    role: string;
    active: boolean;
  };
  onToggleActive: (id: number, active: boolean) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onToggleActive }) => {
  return (
    <StyledCard>
      <CardContent>
        <EmployeeInfo>
          <Avatar size={40} icon={<UserOutlined />} />
          <InfoText>
            <h4>{employee.name}</h4>
            <p>{employee.role}</p>
          </InfoText>
        </EmployeeInfo>
        <Switch
          checked={employee.active}
          onChange={(checked) => onToggleActive(employee.id, checked)}
        />
      </CardContent>
    </StyledCard>
  );
};

export default EmployeeCard; 