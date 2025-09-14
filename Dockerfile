# Usar a imagem oficial do Node.js como base
# Versão LTS (Long Term Support) para estabilidade
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
# Todos os comandos subsequentes serão executados neste diretório
WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro
# Isso permite aproveitar o cache do Docker quando as dependências não mudam
COPY package*.json ./

# Instalar todas as dependências (produção + desenvolvimento)
# Necessário para compilar o TypeScript
RUN npm ci --frozen-lockfile

# Copiar todos os arquivos necessários (exceto node_modules via .dockerignore)
COPY . .

# Gerar o cliente Prisma
# Necessário para que o Prisma funcione corretamente
RUN npx prisma generate

# Executar as migrações do banco de dados
# Cria as tabelas no SQLite se não existirem
RUN npx prisma migrate deploy

# Compilar o código TypeScript para JavaScript
# Gera os arquivos na pasta dist/
RUN npm run build

# Remover dependências de desenvolvimento para reduzir o tamanho da imagem
# Manter apenas as dependências de produção
RUN npm ci --only=production --frozen-lockfile && npm cache clean --force

# Expor a porta que a aplicação usa
# Por padrão, a aplicação NestJS roda na porta 3000
EXPOSE 3000

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production

# Comando para iniciar a aplicação
# Executa o arquivo JavaScript compilado
CMD ["node", "dist/main"]