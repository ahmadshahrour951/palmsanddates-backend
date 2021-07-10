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
ENV NODE_ENV production
RUN yarn run db:migrate:prod
FROM base AS release

COPY --from=builder /app/node_modules_production ./node_modules
COPY --from=builder /app/dist ./dist

USER node

CMD ["node", "./dist/server.js"]