# Stage 1: Build
FROM node:20 AS builder

# Set the working directory inside the Docker image
WORKDIR /tmp/build
COPY package*.json ./
COPY packages ./packages
# Copy the report-mailer package.json and package-lock.json (if you have one)
COPY apps/report-mailer/package*.json ./apps/report-mailer/

# Install dependencies for report-mailer
RUN npm install

# Copy the rest of the report-mailer code
COPY apps/report-mailer/ ./apps/report-mailer/
COPY tsconfig.json ./
COPY packages/tsconfig ./tsconfig/
# Build the report-mailer app
RUN npm -w report-mailer run build

# Stage 2: Production Image
FROM node:20-slim AS runner

# Set the working directory
WORKDIR /usr/src

# Copy built files and node_modules from the builder stage
COPY --from=builder /tmp/build ./

# Set the working directory to the report-mailer app
WORKDIR  /usr/src/apps/report-mailer

# Expose the port if necessary (e.g., if your app listens on a port)
# EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
