const API_URL = 'http://localhost:3001';

export interface EmployeeFormData {
  name: string;
  status: 'Ativo' | 'Inativo';
  position: string;
  gender: 'M' | 'F';
  cpf: string;
  birthDate: string;
  rg: string;
  noEPI: boolean;
}

export interface Employee extends EmployeeFormData {
  id: string;
  registration: string;
  active: boolean;
}

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    const response = await fetch(`${API_URL}/employees`);
    return response.json();
  },

  async create(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const response = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return response.json();
  },

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return response.json();
  },

  async delete(id: string): Promise<void> {
    await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
  },
};

export default employeeService; 