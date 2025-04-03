# Sistema de Gerenciamento de Funcionários

Interface de gerenciamento de funcionários construída com React, TypeScript e Ant Design.

## 💻 Tecnologias

- React 18 + TypeScript
- Redux Toolkit + Redux Persist
- Ant Design + Styled Components
- JSON Server (Mock API)

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn

### Instalação

```bash
# Clone o projeto
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Inicie o projeto (front-end + back-end)
npm run dev
```

O projeto estará disponível em:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## 📋 Funcionalidades

- Listagem de funcionários
- Filtro por status (Ativo/Inativo)
- Gerenciamento de etapas
- Persistência de dados
- Interface responsiva

## 🔧 Comandos

```bash
npm run dev      # Inicia front-end e back-end
npm start        # Inicia apenas o front-end
npm run server   # Inicia apenas o back-end
```

## ⚠️ Solução de Problemas

### Erro de Permissão (PowerShell)
```powershell
Set-ExecutionPolicy RemoteSigned
```

### Módulos não encontrados
```bash
npm install
```

### Funcionários não carregam
- Verifique se o servidor está rodando na porta 3001
- Confirme se o arquivo db.json existe na raiz
- Verifique o console do navegador

## 📁 Estrutura

```
src/
  ├── components/  # Componentes React
  ├── services/    # Serviços e APIs
  ├── store/       # Redux
  └── App.tsx      # Componente principal
```

## 📝 Notas

- Alterações são salvas automaticamente no db.json
- Portas 3000 e 3001 devem estar disponíveis
- Em caso de erros: `npm cache clean --force` 