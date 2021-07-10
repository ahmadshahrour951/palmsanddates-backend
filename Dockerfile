# ---------- Base ----------
FROM node:12-alpine AS base

WORKDIR /app

# ---------- Builder ----------
FROM base AS builder

COPY package.json yarn.lock .babelrc .sequelizerc ./
RUN yarn install --production
RUN cp -R node_modules node_modules_production
RUN yarn install
COPY ./src ./src
RUN yarn run build


# ---------- Tests ----------
# FROM builder AS tests

# RUN yarn run test

# ---------- Release ----------
ARG NODE_ENV=${NODE_ENV}
ARG PORT=${PORT}

ARG DB_HOST=${DB_HOST}
ARG DB_USER=${DB_USER}
ARG DB_PASSWORD=${DB_PASSWORD}
ARG DB_PORT=${DB_PORT}

RUN yarn run db:migrate:prod

FROM base AS release

COPY --from=builder /app/node_modules_production ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 80 

USER node

CMD ["node", "./dist/server.js"]