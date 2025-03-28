# Stage 1: Building the app
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your Next.js app
RUN npm run build

# Stage 2: Setting up the production environment
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the port your app runs on
EXPOSE 3000

# Start your app
CMD ["npm", "run", "start"]
