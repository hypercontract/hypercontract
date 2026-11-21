FROM node:26@sha256:e18c3ccdf7d71619990b0e85639f506e2028a95410999cab24cc373cbd10e0ac AS builder
WORKDIR /usr/src/app
# docker build is expected to be run with the root of the repository as the build context
COPY . ./
RUN npm ci
RUN npm run build:hypercontract

FROM node:26@sha256:e18c3ccdf7d71619990b0e85639f506e2028a95410999cab24cc373cbd10e0ac
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/apps/hypercontract/package.json ./apps/hypercontract/
COPY --from=builder /usr/src/app/apps/hypershop/package.json ./apps/hypershop/
COPY --from=builder /usr/src/app/libs/express/package.json ./libs/express/
COPY --from=builder /usr/src/app/libs/profile/package.json ./libs/profile/
RUN npm ci --omit=dev
COPY --from=builder /usr/src/app/apps/hypercontract/dist/ ./apps/hypercontract/dist/
COPY --from=builder /usr/src/app/libs/express/dist/ ./libs/express/dist/
COPY --from=builder /usr/src/app/libs/profile/dist/ ./libs/profile/dist/
EXPOSE 80
ENV PORT=80
ENV NODE_ENV=production
CMD ["node", "apps/hypercontract/dist/main.js"]
