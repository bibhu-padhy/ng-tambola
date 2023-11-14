# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Define environment variable
ENV NAME Angular

# Run ng serve when the container launches
CMD ["npm", "start"]
