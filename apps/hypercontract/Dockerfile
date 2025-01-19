FROM node:12 AS builder
WORKDIR /usr/src/app
# docker build is expected to be run with the root of the repository as the build context
COPY . ./
RUN npm ci
RUN npm run build -- hypercontract --prod

FROM node:12
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/package-lock.json .
COPY --from=builder /usr/src/app/dist/apps/hypercontract/ ./dist
RUN npm ci
EXPOSE 80
ENV PORT 80
ENV NODE_ENV production
CMD node ./dist/main.js
