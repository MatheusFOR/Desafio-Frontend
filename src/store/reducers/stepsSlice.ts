import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  id: string;
  name: string;
  registration: string;
  status: 'Ativo' | 'Inativo';
  position: string;
}

interface StepsState {
  currentStep: number;
  steps: Array<{
    id: number;
    completed: boolean;
    enabled: boolean;
  }>;
  employees: Employee[];
}

const initialState: StepsState = {
  currentStep: 1,
  steps: Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    completed: false,
    enabled: i === 0, // Apenas a primeira etapa está habilitada inicialmente
  })),
  employees: [
    {
      id: '1',
      name: 'Daniel Alves da Silva',
      registration: '000.000.00-99',
      status: 'Ativo',
      position: 'Cargo 1',
    },
    {
      id: '2',
      name: 'Giselle Torres Lopes',
      registration: '000.000.00-88',
      status: 'Inativo',
      position: 'Cargo 2',
    },
    {
      id: '3',
      name: 'Ana Bispo dos Santos',
      registration: '000.000.00-99',
      status: 'Inativo',
      position: 'Cargo 1',
    },
    {
      id: '4',
      name: 'Regina Elisa Souza',
      registration: '000.000.00-99',
      status: 'Ativo',
      position: 'Cargo 3',
    },
  ],
};

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setStepCompleted: (state, action: PayloadAction<number>) => {
      const step = state.steps.find(s => s.id === action.payload);
      if (step) {
        step.completed = true;
        // Habilita a próxima etapa
        const nextStep = state.steps.find(s => s.id === action.payload + 1);
        if (nextStep) {
          nextStep.enabled = true;
        }
      }
    },
    enableStep: (state, action: PayloadAction<number>) => {
      const step = state.steps.find(s => s.id === action.payload);
      if (step) {
        step.enabled = true;
      }
    },
    addEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const newId = (state.employees.length + 1).toString();
      state.employees.push({
        ...action.payload,
        id: newId,
      });
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    toggleEmployeeStatus: (state, action: PayloadAction<string>) => {
      const employee = state.employees.find(emp => emp.id === action.payload);
      if (employee) {
        employee.status = employee.status === 'Ativo' ? 'Inativo' : 'Ativo';
      }
    },
  },
});

export const {
  setCurrentStep,
  setStepCompleted,
  enableStep,
  addEmployee,
  updateEmployee,
  toggleEmployeeStatus,
} = stepsSlice.actions;

export default stepsSlice.reducer; 