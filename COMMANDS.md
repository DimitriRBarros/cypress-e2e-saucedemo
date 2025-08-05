
# 📋 Guia de Comandos - Cypress E2E

Este arquivo contém todos os comandos disponíveis para execução dos testes automatizados.

## 🎯 Comandos Essenciais

### Instalação e Setup
```bash
npm install                          # Instalar todas as dependências
npx cypress install                  # Instalar binário do Cypress
npx cypress verify                   # Verificar instalação
```

### Execução Básica
```bash
npm run cy:open                      # Abrir interface gráfica do Cypress
npm run cy:run                       # Executar todos os testes (headless)
npm test                            # Alias para cy:run
```

### Execução com Navegadores
```bash
npm run cy:run:chrome               # Executar no Chrome
npm run cy:run:headed               # Executar com navegador visível
npx cypress run --browser firefox   # Executar no Firefox
npx cypress run --browser edge      # Executar no Edge
```

## 🎯 Execução Seletiva

### Por Arquivo Específico
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
npx cypress run --spec "cypress/e2e/inventory.cy.js"
npx cypress run --spec "cypress/e2e/cart.cy.js"
npx cypress run --spec "cypress/e2e/checkout.cy.js"
```

### Múltiplos Arquivos
```bash
npx cypress run --spec "cypress/e2e/{login,inventory}.cy.js"
npx cypress run --spec "cypress/e2e/**/*cart*"
```

### Por Padrão de Nome
```bash
npx cypress run --spec "**/login*"        # Todos os testes com "login" no nome
npx cypress run --spec "**/checkout*"     # Todos os testes com "checkout" no nome
```

## ⚙️ Configurações Avançadas

### Viewport e Resolução
```bash
npx cypress run --config viewportWidth=1920,viewportHeight=1080
npx cypress run --config viewportWidth=1366,viewportHeight=768
npx cypress run --viewport 1280,720
```

### Timeouts Customizados
```bash
npx cypress run --config defaultCommandTimeout=15000
npx cypress run --config requestTimeout=15000
npx cypress run --config responseTimeout=15000
```

### Variáveis de Ambiente
```bash
npx cypress run --env baseUrl=https://staging.saucedemo.com
npx cypress run --env user=standard_user,password=secret_sauce
npx cypress run --env retries=3
```

## 📊 Relatórios e Evidências

### Configurar Saídas
```bash
npx cypress run --config video=true                    # Habilitar videos
npx cypress run --config video=false                   # Desabilitar videos
npx cypress run --config screenshotOnRunFailure=true   # Screenshots apenas em falhas
npx cypress run --config screenshotOnRunFailure=false  # Sem screenshots
```

### Tipos de Relatórios
```bash
npx cypress run --reporter spec                        # Relatório detalhado no terminal
npx cypress run --reporter json                        # Saída em JSON
npx cypress run --reporter junit                       # Formato JUnit XML
npx cypress run --reporter mochawesome                 # Relatório HTML (requer plugin)
```

### Salvar Relatórios
```bash
npx cypress run --reporter json --reporter-options "toConsole=false,outputFile=results.json"
npx cypress run --reporter junit --reporter-options "mochaFile=results/test-results-[hash].xml"
```

## 🚀 Execução em Diferentes Ambientes

### Desenvolvimento Local
```bash
npm run cy:open                                 # Desenvolvimento interativo
npx cypress run --headed --no-exit             # Debug mode
DEBUG=cypress:* npx cypress run                # Logs detalhados
```

### Staging/QA
```bash
npx cypress run --env baseUrl=https://staging.saucedemo.com
npx cypress run --config retries=2             # Retry em ambiente instável
```

### Produção
```bash
npx cypress run --config retries=1 --reporter spec
npx cypress run --record --key <record-key>    # Cypress Dashboard
```

## 🔍 Debug e Troubleshooting

### Comandos de Debug
```bash
npx cypress run --headed --no-exit --spec "cypress/e2e/login.cy.js"
npx cypress open --spec "cypress/e2e/login.cy.js"
DEBUG=cypress:cli npx cypress run
DEBUG=cypress:server:* npx cypress run
```

### Limpeza e Manutenção
```bash
npx cypress cache clear                         # Limpar cache
npx cypress cache path                          # Ver localização do cache
npx cypress cache list                          # Listar versões instaladas
rm -rf cypress/videos cypress/screenshots      # Limpar evidências antigas
```

### Validação
```bash
npx cypress run --dry-run                       # Validar sintaxe sem executar
npx cypress run --config-file false             # Executar sem arquivo de config
```

## 🎯 Comandos para CI/CD

### GitHub Actions
```bash
npx cypress run --browser chrome --headless --record
npx cypress run --parallel --record --key $CYPRESS_RECORD_KEY
```

### Docker
```bash
docker run -it -v $PWD:/e2e -w /e2e cypress/included:latest
docker run -it -v $PWD:/e2e -w /e2e cypress/browsers:node-20.10.0-chrome-124.0
```

## 📈 Performance e Otimização

### Execução Rápida
```bash
npx cypress run --config video=false,screenshotOnRunFailure=false
npx cypress run --spec "cypress/e2e/login.cy.js" --config numTestsKeptInMemory=1
```

### Execução Paralela (Cypress Dashboard)
```bash
npx cypress run --record --parallel --ci-build-id $BUILD_ID
```