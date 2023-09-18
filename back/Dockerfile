FROM node:14

WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code to the working directory
COPY . ./

# Expose the port that the Node.js app will run on
EXPOSE 3005

# Start the Node.js app
CMD ["npm", "start"]
