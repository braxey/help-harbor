# Use the official Node.js image as a base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY dist ./dist

# Expose the port on which your Express app will run
EXPOSE 5000

# Command to run your app
CMD ["node", "dist/server.js"]
