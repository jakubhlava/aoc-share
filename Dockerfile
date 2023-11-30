ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-slim as base
RUN apt-get update -y && apt-get install -y openssl

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY package.json .
COPY package-lock.json .
RUN npm install --production=false

COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
COPY --from=build /src/prisma /src/prisma
COPY --from=build /src/node_modules/.prisma/client /src/node_modules/.prisma/client
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
