import React, { useState, useEffect } from 'react';
import { Steps as AntSteps, Card, Switch, Button, Dropdown, Menu, message, Modal } from 'antd';
import type { StepsProps } from 'antd';
import { 
  BuildOutlined, 
  EditOutlined, 
  TeamOutlined,
  BellOutlined,
  UndoOutlined,
  UserOutlined,
  MoreOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setStepCompleted, setCurrentStep } from '../store/reducers/stepsSlice';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import EmployeeForm from './EmployeeForm';
import employeeService, { Employee, EmployeeFormData } from '../services/employeeService';

const { Step } = AntSteps;

const Container = styled.div`
  padding: 24px;
  background: #F5F5F5;
  min-height: 100vh;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StepsNavigation = styled(AntSteps)`
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .ant-steps-item {
    &-title {
      font-size: 14px;
      color: #666 !important;
      text-align: center;
      margin-top: 8px !important;
      padding-right: 0 !important;
    }

    &-description {
      color: #5DA6CE !important;
      font-size: 12px !important;
      margin-top: 4px;
    }

    &-icon {
      background: #5DA6CE !important;
      border-color: #5DA6CE !important;
    }

    &-finish {
      .ant-steps-item-icon {
        background: #5DA6CE !important;
        border-color: #5DA6CE !important;
      }
    }

    &-process {
      .ant-steps-item-icon {
        background: white !important;
        border-color: #5DA6CE !important;
        
        .ant-steps-icon {
          color: #5DA6CE !important;
        }
      }
    }

    &-tail::after {
      background-color: #5DA6CE !important;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const LeftPanel = styled.div`
  flex: 0 0 400px;
`;

const RightPanel = styled.div`
  flex: 1;
`;

const UserInfoCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const PlaceholderImage = styled.div`
  width: 200px;
  height: 200px;
  background: #E5E5E5;
  margin: 24px auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 64px;
`;

const LoremText = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 24px 0;
`;

const EmployeesCard = styled(Card)`
  border-radius: 8px;
  height: 100%;
  
  .ant-card-body {
    height: 100%;
    padding: 0;
  }
`;

const CardHeader = styled.div`
  background: #5DA6CE;
  padding: 16px 24px;
  border-radius: 8px 8px 0 0;
  
  h2 {
    color: white;
    margin: 0;
    font-size: 24px;
    font-weight: normal;
  }
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const AddEmployeeButton = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  background: white;
  color: #5DA6CE;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    background: #F5F5F5;
    border-color: #D9D9D9;
  }

  .anticon {
    font-size: 16px;
  }
`;

const FilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 12px;

  button {
    height: 36px;
    padding: 0 16px;
    border-radius: 4px;
    font-size: 14px;
    border: 1px solid #E5E5E5;
    background: white;
    color: #666;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: #F5F5F5;
      border-color: #D9D9D9;
    }
  }
`;

const ActiveCount = styled.div`
  color: #666;
  font-size: 14px;
`;

const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmployeeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F5F8FA;
  padding: 16px;
  border-radius: 4px;
`;

const EmployeeInfo = styled.div`
  flex: 1;
`;

const EmployeeName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const EmployeeDetails = styled.div`
  display: flex;
  gap: 8px;
  
  span {
    background: #5DA6CE;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    
    &.inactive {
      background: #999;
    }
  }
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E5E5E5;

  .ant-btn {
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const StepCompletion = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface NavigationContainerProps {
  showPrevious?: boolean;
}

const NavigationContainer = styled.div.attrs<NavigationContainerProps>(() => ({}))<NavigationContainerProps>`
  display: flex;
  justify-content: ${({ showPrevious }) => showPrevious ? 'space-between' : 'flex-end'};
  width: 100%;
  padding: 24px 0;
  margin-top: auto;

  .ant-btn {
    min-width: 140px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    border: none;
    color: white;
    box-shadow: none;
    
    &:first-child {
      background: #5DA6CE;
      &:hover {
        background: #4A8DAF;
      }
    }
    
    &:last-child {
      background: #5DA6CE;
      &:hover {
        background: #4A8DAF;
      }
      &:disabled {
        background: #E1E1E1 !important;
        color: white !important;
        cursor: not-allowed;
        opacity: 1;
      }
    }
  }
`;

const SideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background: #4A8DAF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-radius: 0 16px 16px 0;
`;

const MenuButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border: none;
  background: ${({ active }) => active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 8px 0;
`;

const Spacer = styled.div`
  flex: 1;
`;

const BuildingSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 19H17V21H15V19ZM11 19H13V21H11V19ZM7 19H9V21H7V19ZM15 15H17V17H15V15ZM11 15H13V17H11V15ZM7 15H9V17H7V15ZM15 11H17V13H15V11ZM11 11H13V13H11V11ZM7 11H9V13H7V11ZM15 7H17V9H15V7ZM11 7H13V9H11V7ZM7 7H9V9H7V7ZM3 3V21H5V5H19V3H3Z" 
    fill="currentColor"/>
  </svg>
);

const BuildingIcon = (props: any) => <Icon component={BuildingSvg} {...props} />;

// Add this type after the imports
interface EditingEmployee extends EmployeeFormData {
  id: string;
}

const SuccessModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .ant-modal-body {
    padding: 24px;
    text-align: center;
    font-size: 16px;
  }
  
  .ant-modal-footer {
    border-top: none;
    padding: 0 24px 24px;
    text-align: center;
    
    .ant-btn {
      border-radius: 4px;
      height: 40px;
      padding: 0 32px;
      font-size: 16px;
      
      &.ant-btn-primary {
        background: #5DA6CE;
        border-color: #5DA6CE;
        
        &:hover {
          background: #4A8DAF;
          border-color: #4A8DAF;
        }
      }
    }
  }
`;

const ComingSoonCard = styled(Card)`
  border-radius: 8px;
  background: #5DA6CE;
  margin-bottom: 24px;
  border: none;
  height: 48px;
  box-shadow: none;
  
  .ant-card-body {
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    color: white;
    margin: 0;
    font-size: 24px;
    font-weight: normal;
  }
`;

// Add this type definition after the imports
type StepStatus = 'wait' | 'process' | 'finish' | 'error';

// Add interface for step items
interface StepItem {
  title: string;
  status: StepsProps['status'];
  completed: boolean;
}

const Steps: React.FC = () => {
  const dispatch = useDispatch();
  const { steps, currentStep } = useSelector((state: RootState) => state.steps);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [activeMenu, setActiveMenu] = useState('edit');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EditingEmployee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (error) {
      message.error('Erro ao carregar funcionários');
    } finally {
      setLoading(false);
    }
  };

  const handleStepCompletion = (checked: boolean) => {
    setIsStepCompleted(checked);
    if (checked && !completedSteps.includes(currentStepIndex)) {
      setCompletedSteps([...completedSteps, currentStepIndex]);
    } else if (!checked) {
      setCompletedSteps(completedSteps.filter(step => step < currentStepIndex));
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
    setActiveMenu('edit');
  };

  const handleEditEmployee = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      const formData: EditingEmployee = {
        id: employee.id,
        name: employee.name,
        cpf: employee.cpf,
        rg: employee.rg,
        birthDate: employee.birthDate,
        gender: employee.gender,
        status: employee.status,
        position: employee.position,
        noEPI: employee.noEPI
      };
      setEditingEmployee(formData);
      setShowForm(true);
      setActiveMenu('edit');
    }
  };

  const showSuccessModal = (message: string) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await employeeService.delete(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      showSuccessModal('Usuário excluído com sucesso!');
    } catch (error) {
      Modal.error({
        title: 'Erro',
        content: 'Erro ao excluir funcionário'
      });
    }
  };

  const handleSaveEmployee = async (data: EmployeeFormData) => {
    try {
      if (editingEmployee) {
        const updatedEmployee = await employeeService.update(editingEmployee.id, {
          ...data,
          active: data.status === 'Ativo'
        });
        
        setEmployees(employees.map(emp => 
          emp.id === editingEmployee.id ? updatedEmployee : emp
        ));
        
        showSuccessModal('Funcionário atualizado com sucesso!');
      } else {
        const newEmployee = await employeeService.create({
          ...data,
          registration: '000.000.00-' + Math.floor(Math.random() * 100),
          active: data.status === 'Ativo'
        });
        
        setEmployees([...employees, newEmployee]);
        message.success('Funcionário adicionado com sucesso!');
      }
      
      setShowForm(false);
      setActiveMenu('edit');
    } catch (error) {
      Modal.error({
        title: 'Erro',
        content: 'Erro ao salvar funcionário'
      });
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setActiveMenu('edit');
  };

  const getEmployeeMenu = (id: string) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEditEmployee(id)} icon={<EditOutlined />}>
        Editar
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDeleteEmployee(id)} icon={<DeleteOutlined />}>
        Excluir
      </Menu.Item>
    </Menu>
  );

  const filteredEmployees = showOnlyActive
    ? employees.filter(emp => emp.status === 'Ativo')
    : employees;

  const activeEmployees = employees.filter(emp => emp.status === 'Ativo');

  const stepItems: StepItem[] = [
    { title: 'Item 1', status: completedSteps.includes(0) ? 'finish' : 'process', completed: completedSteps.includes(0) },
    { title: 'Item 2', status: completedSteps.includes(1) ? 'finish' : 'process', completed: completedSteps.includes(1) },
    { title: 'Item 3', status: completedSteps.includes(2) ? 'finish' : 'process', completed: completedSteps.includes(2) },
    { title: 'Item 4', status: completedSteps.includes(3) ? 'finish' : 'process', completed: completedSteps.includes(3) },
    { title: 'Item 5', status: completedSteps.includes(4) ? 'finish' : 'process', completed: completedSteps.includes(4) },
    { title: 'Item 6', status: completedSteps.includes(5) ? 'finish' : 'process', completed: completedSteps.includes(5) },
    { title: 'Item 7', status: completedSteps.includes(6) ? 'finish' : 'process', completed: completedSteps.includes(6) },
    { title: 'Item 8', status: completedSteps.includes(7) ? 'finish' : 'process', completed: completedSteps.includes(7) },
    { title: 'Item 9', status: completedSteps.includes(8) ? 'finish' : 'process', completed: completedSteps.includes(8) }
  ];

  const handleNextStep = () => {
    if (currentStepIndex < stepItems.length - 1) {
      if (!completedSteps.includes(currentStepIndex)) {
        setCompletedSteps([...completedSteps, currentStepIndex]);
      }
      setCurrentStepIndex(currentStepIndex + 1);
      setIsStepCompleted(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCompletedSteps(prevSteps => 
        prevSteps.filter(step => step === 0 || step < currentStepIndex - 1)
      );
      setCurrentStepIndex(currentStepIndex - 1);
      const isPreviousStepCompleted = completedSteps.includes(currentStepIndex - 1);
      setIsStepCompleted(isPreviousStepCompleted);
    }
  };

  const renderContent = () => {
    if (activeMenu === 'edit' && !showForm && currentStepIndex === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ContentContainer>
            <LeftPanel>
              <UserInfoCard>
                <LoremText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  In suscipit suscipit porttitor. Suspendisse ex lorem, 
                  rhoncus nec ante eu, venenatis aliquam turpis. Nulla 
                  facilisi. Curabitur nec mattis dolor. Nulla finibus 
                  bibendum ligula tempus vehicula. Ut at tristique libero, 
                  nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, 
                  tempus nec justo eget, luctus scelerisque velit. Nam 
                  sollicitudin purus urna, vitae ornare neque tincidunt vel. 
                  Proin ac lacinia erat, et commodo felis. Phasellus tempor 
                  tellus eu vulputate tempus.
                </LoremText>
                <PlaceholderImage>
                  <UserOutlined />
                </PlaceholderImage>
              </UserInfoCard>
            </LeftPanel>
            
            <RightPanel>
              <EmployeesCard>
                <CardHeader>
                  <h2>Funcionário(s)</h2>
                </CardHeader>
                <CardContent>
                  <AddEmployeeButton onClick={handleAddEmployee}>
                    <PlusOutlined />
                    Adicionar Funcionário
                  </AddEmployeeButton>
                  
                  <FilterActions>
                    <FilterButtons>
                      <button onClick={() => setShowOnlyActive(!showOnlyActive)}>
                        Ver apenas ativos
                      </button>
                      <button onClick={() => setShowOnlyActive(false)}>
                        Limpar filtros
                      </button>
                    </FilterButtons>
                    <ActiveCount>
                      Ativos {activeEmployees.length}/{employees.length}
                    </ActiveCount>
                  </FilterActions>
                  
                  <EmployeeList>
                    {filteredEmployees.map((employee) => (
                      <EmployeeItem key={employee.id}>
                        <EmployeeInfo>
                          <EmployeeName>{employee.name}</EmployeeName>
                          <EmployeeDetails>
                            <span>{employee.registration}</span>
                            <span className={employee.status === 'Ativo' ? '' : 'inactive'}>
                              {employee.status}
                            </span>
                            <span>{employee.position}</span>
                          </EmployeeDetails>
                        </EmployeeInfo>
                        <Dropdown 
                          overlay={getEmployeeMenu(employee.id)}
                          trigger={['click']}
                        >
                          <MoreOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                        </Dropdown>
                      </EmployeeItem>
                    ))}
                  </EmployeeList>
                  
                  <FooterSection>
                    <StepCompletion>
                      <span>A etapa está concluída?</span>
                      <Switch checked={isStepCompleted} onChange={handleStepCompletion} />
                      <span>{isStepCompleted ? 'Sim' : 'Não'}</span>
                    </StepCompletion>
                  </FooterSection>
                </CardContent>
              </EmployeesCard>
            </RightPanel>
          </ContentContainer>
          <NavigationContainer showPrevious={false}>
            <Button 
              type="primary"
              onClick={handleNextStep}
              disabled={!isStepCompleted}
            >
              Próximo passo
            </Button>
          </NavigationContainer>
        </div>
      );
    } else if (showForm) {
      return (
        <RightPanel>
          <EmployeesCard>
            <CardContent style={{ padding: 0 }}>
              <EmployeeForm 
                onSave={handleSaveEmployee}
                onBack={handleBack}
                initialData={editingEmployee ? {
                  name: editingEmployee.name,
                  cpf: editingEmployee.cpf,
                  rg: editingEmployee.rg,
                  birthDate: editingEmployee.birthDate,
                  gender: editingEmployee.gender,
                  status: editingEmployee.status,
                  position: editingEmployee.position,
                  noEPI: editingEmployee.noEPI
                } : undefined}
              />
            </CardContent>
          </EmployeesCard>
        </RightPanel>
      );
    } else if (activeMenu === 'edit') {
      return (
        <>
          <ComingSoonCard>
            <h2>Em breve</h2>
          </ComingSoonCard>
          <NavigationContainer showPrevious={true}>
            <Button onClick={handlePreviousStep}>
              Passo anterior
            </Button>
            <Button 
              type="primary"
              onClick={handleNextStep}
            >
              Próximo passo
            </Button>
          </NavigationContainer>
        </>
      );
    } else {
      return (
        <ComingSoonCard>
          <h2>Em breve</h2>
        </ComingSoonCard>
      );
    }
  };

  return (
    <>
      <SideMenu>
        <MenuButton active={activeMenu === 'build'} onClick={() => {
          setActiveMenu('build');
          setShowForm(false);
        }}>
          <BuildingIcon />
        </MenuButton>
        <MenuButton active={activeMenu === 'edit'} onClick={() => {
          setActiveMenu('edit');
          setShowForm(false);
        }}>
          <EditOutlined />
        </MenuButton>
        <MenuButton active={activeMenu === 'team'} onClick={() => {
          setActiveMenu('team');
          setShowForm(false);
        }}>
          <TeamOutlined />
        </MenuButton>
        <MenuButton active={activeMenu === 'bell'} onClick={() => {
          setActiveMenu('bell');
          setShowForm(false);
        }}>
          <BellOutlined />
        </MenuButton>
        <Divider />
        <MenuButton active={activeMenu === 'undo'} onClick={() => {
          setActiveMenu('undo');
          setShowForm(false);
        }}>
          <UndoOutlined />
        </MenuButton>
        <Spacer />
        <MenuButton active={activeMenu === 'user'} onClick={() => {
          setActiveMenu('user');
          setShowForm(false);
        }}>
          <UserOutlined />
        </MenuButton>
      </SideMenu>
      <Container>
        <MainContent>
          <StepsNavigation current={currentStepIndex}>
            {stepItems.map((step, index) => (
              <Step 
                key={index} 
                title={step.title}
                description={step.completed ? 'Concluído' : ''}
                icon={<BuildingIcon />}
                status={step.completed ? 'finish' : index === currentStepIndex ? 'process' : 'wait'}
              />
            ))}
          </StepsNavigation>

          {renderContent()}
        </MainContent>
      </Container>
      
      <SuccessModal
        visible={successModalVisible}
        closable={false}
        onOk={() => setSuccessModalVisible(false)}
        onCancel={() => setSuccessModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setSuccessModalVisible(false)}>
            OK
          </Button>
        ]}
      >
        {successMessage}
      </SuccessModal>
    </>
  );
};

export default Steps; 