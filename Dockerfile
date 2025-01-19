# Stage 1: Build Stage
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's cache for dependencies
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
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist /app/dist

# Copy the necessary production dependencies from the build stage
COPY --from=build /app/package.json /app/package-lock.json /app/

# Install only the production dependencies
RUN npm install --production --no-optional

# Expose the port for the frontend application
EXPOSE 5173

# Command to serve the production build
CMD ["npx", "vite", "preview", "--host", "0.0.0.0"]
