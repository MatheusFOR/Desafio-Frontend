import React, { useState } from 'react';
import { Form, Input, Radio, Select, Checkbox, Upload, Button, Card } from 'antd';
import { ArrowLeftOutlined, PaperClipOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { EmployeeFormData } from '../services/employeeService';

const HeaderContainer = styled.div`
  background: #5DA6CE;
  padding: 24px;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  gap: 16px;

  h2 {
    color: white;
    margin: 0;
    font-size: 20px;
    font-weight: 500;
  }

  .back-button {
    color: white;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const FormContainer = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: none;

  .ant-card-body {
    padding: 0;
  }
`;

const FormContent = styled.div`
  padding: 24px;
  background: white;
  border-radius: 0 0 8px 8px;

  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-input {
    border-radius: 4px;
    padding: 8px 12px;
  }

  .ant-select {
    width: 100%;
  }

  .upload-container {
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    padding: 16px;
    text-align: center;
    background: #fafafa;
    cursor: pointer;

    &:hover {
      border-color: #5DA6CE;
    }
  }

  .epi-section {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 16px;
    margin-top: 8px;
  }
`;

const StyledButton = styled(Button)`
  &.ant-btn-primary {
    background: #5DA6CE;
    border-color: #5DA6CE;

    &:hover {
      background: #4A8DAF;
      border-color: #4A8DAF;
    }
  }
`;

interface EmployeeFormProps {
  onBack: () => void;
  onSave: (data: EmployeeFormData) => void;
  initialData?: EmployeeFormData;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onBack, onSave, initialData }) => {
  const [form] = Form.useForm();
  const [useEPI, setUseEPI] = useState(!initialData?.noEPI);

  const handleSubmit = (values: any) => {
    onSave({
      ...values,
      noEPI: !useEPI,
    });
  };

  return (
    <FormContainer>
      <HeaderContainer>
        <button className="back-button" onClick={onBack}>
          <ArrowLeftOutlined />
        </button>
        <h2>Adicionar Funcionário</h2>
      </HeaderContainer>

      <FormContent>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialData}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="O trabalhador está ativo ou inativo?"
            name="status"
            initialValue="Ativo"
          >
            <Radio.Group>
              <Radio value="Ativo">Ativo</Radio>
              <Radio value="Inativo">Inativo</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira o nome' }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>

          <Form.Item
            label="Sexo"
            name="gender"
            rules={[{ required: true, message: 'Por favor, selecione o sexo' }]}
          >
            <Radio.Group>
              <Radio value="F">Feminino</Radio>
              <Radio value="M">Masculino</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            rules={[{ required: true, message: 'Por favor, insira o CPF' }]}
          >
            <Input placeholder="000.000.000-00" />
          </Form.Item>

          <Form.Item
            label="Data de Nascimento"
            name="birthDate"
            rules={[{ required: true, message: 'Por favor, insira a data de nascimento' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="RG"
            name="rg"
            rules={[{ required: true, message: 'Por favor, insira o RG' }]}
          >
            <Input placeholder="00.000.000-0" />
          </Form.Item>

          <Form.Item
            label="Cargo"
            name="position"
            rules={[{ required: true, message: 'Por favor, selecione o cargo' }]}
          >
            <Select placeholder="Selecione o cargo">
              <Select.Option value="Cargo 1">Cargo 1</Select.Option>
              <Select.Option value="Cargo 2">Cargo 2</Select.Option>
              <Select.Option value="Cargo 3">Cargo 3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Quais EPIs o trabalhador usa na atividade?">
            <Checkbox checked={!useEPI} onChange={(e) => setUseEPI(!e.target.checked)}>
              O trabalhador não usa EPI.
            </Checkbox>

            {useEPI && (
              <div className="epi-section">
                <Form.Item label="Selecione a atividade:">
                  <Select placeholder="Atividade 1">
                    <Select.Option value="1">Atividade 1</Select.Option>
                    <Select.Option value="2">Atividade 2</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Selecione o EPI:">
                  <Select placeholder="Selecione o EPI">
                    <Select.Option value="calcado">Calçado de segurança</Select.Option>
                    <Select.Option value="capacete">Capacete</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Informe o número do CA:">
                  <Input placeholder="0000" />
                </Form.Item>

                <StyledButton type="primary">
                  Adicionar EPI
                </StyledButton>
              </div>
            )}
          </Form.Item>

          <Form.Item label="Adicione Atestado de Saúde (opcional):">
            <Upload.Dragger multiple={false}>
              <p className="ant-upload-text">
                <PaperClipOutlined /> Selecionar arquivo
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit" size="large">
              Salvar
            </StyledButton>
          </Form.Item>
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default EmployeeForm; 