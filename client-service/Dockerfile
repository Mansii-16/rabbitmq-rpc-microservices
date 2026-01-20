# 1️⃣ Use lightweight Node.js image
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (for Docker cache)
COPY package*.json ./

# 4️⃣ Install dependencies (including @types)
RUN npm install

# 5️⃣ Copy remaining source code
COPY . .

# 6️⃣ Compile TypeScript → JavaScript
RUN npm run build

# 7️⃣ Run client service
CMD ["node", "dist/index.js"]
