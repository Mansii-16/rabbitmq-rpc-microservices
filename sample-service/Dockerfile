#  Use lightweight Node.js image
FROM node:18-alpine

#  Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

#  Install dependencies
RUN npm install

# Copy source code
COPY . .

#  Compile TypeScript
RUN npm run build

#  Run server service
CMD ["node", "dist/index.js"]
