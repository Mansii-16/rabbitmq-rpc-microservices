# 1️⃣ Use lightweight Node.js image
FROM node:18-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files first
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy source code
COPY . .

# 6️⃣ Compile TypeScript
RUN npm run build

# 7️⃣ Run server service
CMD ["node", "dist/rpcServer.js"]
