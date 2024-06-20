# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install
RUN npm install typescript -g
RUN tsc
# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
# Expose port 80
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

# Command to run the app
CMD ["npm", "start"]