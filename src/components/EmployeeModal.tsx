import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../store/reducers/stepsSlice';

const { Option } = Select;

interface EmployeeModalProps {
  visible: boolean;
  onCancel: () => void;
  employee?: {
    id: string;
    name: string;
    registration: string;
    status: 'Ativo' | 'Inativo';
    position: string;
  };
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  visible,
  onCancel,
  employee,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (employee) {
        dispatch(updateEmployee({ ...values, id: employee.id }));
      } else {
        dispatch(addEmployee(values));
      }
      form.resetFields();
      onCancel();
    });
  };

  React.useEffect(() => {
    if (visible && employee) {
      form.setFieldsValue(employee);
    } else {
      form.resetFields();
    }
  }, [visible, employee, form]);

  return (
    <Modal
      title={employee ? 'Editar Funcionário' : 'Adicionar Funcionário'}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {employee ? 'Salvar' : 'Adicionar'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'Ativo' }}
      >
        <Form.Item
          name="name"
          label="Nome Completo"
          rules={[{ required: true, message: 'Por favor, insira o nome' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="registration"
          label="Matrícula"
          rules={[{ required: true, message: 'Por favor, insira a matrícula' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Por favor, selecione o status' }]}
        >
          <Select>
            <Option value="Ativo">Ativo</Option>
            <Option value="Inativo">Inativo</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="position"
          label="Cargo"
          rules={[{ required: true, message: 'Por favor, selecione o cargo' }]}
        >
          <Select>
            <Option value="Cargo 1">Cargo 1</Option>
            <Option value="Cargo 2">Cargo 2</Option>
            <Option value="Cargo 3">Cargo 3</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeModal; 