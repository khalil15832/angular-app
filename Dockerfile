### STAGE 1: Build ###
FROM node:12.7-alpine AS build
#FROM node:latest AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
#FROM nginx:alpine
COPY --from=build /usr/src/app/dist/angular-app /usr/share/nginx/html
EXPOSE 4200
#CMD ["npm", "start"]
