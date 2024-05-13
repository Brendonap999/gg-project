# Use the official Node.js image to build the application
FROM node:16 AS build
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the remaining files and build the application
COPY . .
RUN npm run build

# Use the official Nginx image to serve the application
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the front end port
EXPOSE 80
