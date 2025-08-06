# 🧪 Cypress E2E - Sauce Demo

Projeto de testes automatizados End-to-End utilizando Cypress para o site Sauce Demo.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

## 🚀 Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd cypress-e2e-saucedemo

# Instalar dependências
npm install
```

## 🏃‍♂️ Execução dos Testes

### Comandos Básicos
```bash
# Abrir Cypress em modo interativo (recomendado para desenvolvimento)
npm run cy:open

# Executar todos os testes em modo headless
npm run cy:run
npm test

# Executar testes com navegador visível
npm run cy:run:headed

# Executar testes no Chrome
npm run cy:run:chrome
```

### Comandos Avançados
```bash
# Executar teste específico
npx cypress run --spec "cypress/e2e/login.cy.js"

# Executar múltiplos testes específicos
npx cypress run --spec "cypress/e2e/{login,inventory}.cy.js"

# Executar testes por padrão de nome
npx cypress run --spec "cypress/e2e/**/cart*"

# Executar testes com configurações específicas
npx cypress run --browser firefox --headed
npx cypress run --viewport 1280,720

# Executar testes com variáveis de ambiente
npx cypress run --env baseUrl=https://staging.saucedemo.com

# Executar testes em modo debug
npx cypress run --headed --no-exit
```

## 📊 Relatórios e Evidências

```bash
# Gerar relatórios customizados
npx cypress run --reporter spec
npx cypress run --reporter json --reporter-options "toConsole=true"

# Capturar videos e screenshots
npx cypress run --record --key <record-key>
```

## 🧩 Estrutura do Projeto

```
cypress/
├── e2e/                    # Arquivos de teste
│   ├── login.cy.js
│   ├── inventory.cy.js
│   ├── cart.cy.js
│   └── checkout.cy.js
├── pages/                  # Pages Objects (POM)
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── support/                # Comandos customizados e configurações
│   ├── commands.js
│   └── e2e.js
├── fixtures/               # Dados de teste
│   └── users.json
├── videos/                 # Videos das execuções
└── screenshots/            # Screenshots em caso de falha
```

## 🔧 Configurações Customizadas

### Executar com diferentes usuários
```bash
# Usando usuário padrão
npm run cy:run

# Executar com usuário específico via fixture
npx cypress run --env user=lockedUser
```

### Executar por tags/grupos
```bash
# Executar apenas testes de smoke
npx cypress run --env grepTags="@smoke"

# Executar testes críticos
npx cypress run --env grepTags="@critical"
```

## 🚀 CI/CD

### GitHub Actions
O projeto inclui configuração para GitHub Actions que executa automaticamente em:
- Push para branches main/develop
- Pull Requests
- Artefatos são salvos em caso de falha

### Bitbucket Pipelines
Configuração alternativa para Bitbucket com suporte a múltiplos browsers.

## 📈 Melhores Práticas Implementadas

- ✅ Page Object Model (POM)
- ✅ Custom Commands reutilizáveis
- ✅ Session management para otimização
- ✅ Esperas dinâmicas e assertions robustas
- ✅ Tratamento de erros e retry logic
- ✅ Seletores com data-test attributes
- ✅ Estrutura modular e escalável

## 🐛 Troubleshooting

### Problemas Comuns
```bash
# Limpar cache do Cypress
npx cypress cache clear
npx cypress cache path

# Verificar instalação
npx cypress verify

# Debug mode para investigar falhas
npx cypress run --headed --no-exit --spec "cypress/e2e/login.cy.js"

# Executar com logs detalhados
DEBUG=cypress:* npx cypress run
```

### Variáveis de Ambiente
```bash
# Definir URL base diferente
export CYPRESS_baseUrl=https://staging.saucedemo.com

# Definir timeouts customizados
export CYPRESS_defaultCommandTimeout=15000
```

## 📝 Comandos Úteis para Desenvolvimento

```bash
# Executar apenas um teste específico durante desenvolvimento
npx cypress open --spec "cypress/e2e/login.cy.js"

# Executar testes sem video para economizar espaço
npx cypress run --config video=false

# Executar testes com screenshot apenas em falhas
npx cypress run --config screenshotOnRunFailure=true

# Validar sintaxe dos testes
npx cypress run --dry-run
```

## 🔍 Análise de Resultados

Os resultados dos testes incluem:
- ✅ Status de cada teste (pass/fail)
- ⏱️ Tempo de execução
- 📹 Videos das execuções (quando habilitado)
- 📸 Screenshots de falhas
- 📊 Relatórios detalhados no terminal

---

**Autor:** Dimitri Barros  
**Versão:** 1.0.0  
**Cypress:** 14.x+
