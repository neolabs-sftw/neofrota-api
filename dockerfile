# Etapa 1: Dependências de produção (otimizada para cache)
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia apenas arquivos necessários para instalar deps (melhor cache)
COPY package.json pnpm-lock.yaml ./

# Instala apenas dependências de produção (mais leve na imagem final)
RUN pnpm fetch --prod

# Instala offline as deps de produção
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile --offline

# Etapa 2: Build completo (inclui devDependencies para compilar)
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia cache de deps de produção da etapa anterior (economiza tempo)
COPY --from=deps /app/node_modules ./node_modules

# Copia arquivos de configuração
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY prisma ./prisma

# Instala todas as dependências (inclui dev para tsc e prisma)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm fetch && pnpm install --frozen-lockfile --offline

# Copia o código fonte
COPY . .

# Gera o client Prisma e compila TypeScript
RUN pnpm prisma generate \
    && pnpm build

# Etapa 3: Imagem final de produção (leve)
FROM node:22-alpine AS runner

WORKDIR /app

# Cria usuário não-root por segurança
RUN addgroup --gid 1001 nodejs && \
    adduser --uid 1001 --ingroup nodejs --disabled-password --gecos "" nextjs
USER nextjs

# Copia apenas o necessário da build
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Variáveis de ambiente recomendadas
ENV NODE_ENV=production \
    PORT=4000

EXPOSE 4000

# Comando para iniciar a API
CMD ["node", "dist/index.js"]