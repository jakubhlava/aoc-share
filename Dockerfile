ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY package.json .
COPY package-lock.json .
RUN npm install --production=false

COPY . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

RUN apt-get update -y && apt-get install -y openssl

COPY --from=build /src/.output /src/.output
COPY --from=build /src/prisma /src/prisma
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]