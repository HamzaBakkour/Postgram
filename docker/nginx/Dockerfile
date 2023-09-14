# The first stage
# Build React static files
FROM mhart/alpine-node:latest AS build

WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./

RUN npm ci
# RUN yarn install
COPY ./frontend/ ./
RUN npm run build
# RUN yarn run build


# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
