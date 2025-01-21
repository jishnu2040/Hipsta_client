# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --no-optional

# Copy the rest of the frontend code
COPY . .

# Set increased memory for Node.js during the build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the frontend for production
RUN npm run build

# Stage 2: Production Stage
FROM nginx:1.23-alpine

# Remove default Nginx configuration and add custom configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
