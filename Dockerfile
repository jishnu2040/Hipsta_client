
### Frontend Dockerfile

# Stage 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies (remove --legacy-peer-deps if unnecessary)
RUN npm install --no-optional

# Copy the rest of the application code
COPY . .

# Increase memory for Node.js builds if needed
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the production code
RUN npm run build

# Stage 2: Production Stage
FROM nginx:1.23.4-alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Copy the built frontend code from the build stage to nginx's default location
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
