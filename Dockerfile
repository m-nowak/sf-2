# Stage 1: Install dependencies and build the application
FROM node:20.12.2 AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Set npm timeout and retry options
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the final image
FROM node:20.12.2 AS runner

WORKDIR /app

# Copy only the build output from the builder stage
COPY --from=builder /app ./

# Expose the port that the app runs on
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Command to run the application
CMD ["npm", "start"]