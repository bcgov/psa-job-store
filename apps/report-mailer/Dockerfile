# Use the Node.js 20 image
FROM node:20

ARG SMTP_HOST
ARG SMTP_PORT
ARG EMAIL_FROM
ARG EMAIL_TO

ENV SMTP_HOST $SMTP_HOST
ENV SMTP_PORT $SMTP_PORT
ENV EMAIL_FROM $EMAIL_FROM
ENV EMAIL_TO $EMAIL_TO

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json tsconfig.json ./

# Install dependencies
ENV NODE_ENV=development
RUN npm install

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Remove devDependencies
RUN npm prune --omit=dev

# Set NODE_ENV to production
ENV NODE_ENV=production

# Create queries directory
RUN mkdir -p /app/queries

# Change ownership and permissions
RUN chown -R node:node /app
RUN chmod -R 755 /app

# Switch to non-root user
USER node

# Run the application
CMD ["node", "dist/index.js"]
