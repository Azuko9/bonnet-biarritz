# Utilise une image Node.js légère basée sur Alpine
FROM node:18-alpine

# Définit le répertoire de travail dans le container
WORKDIR /app

# Copie les fichiers de configuration et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie l'ensemble du projet dans le container
COPY . .

# Construit l'application Next.js pour la production
RUN npm run build

# Expose le port par défaut utilisé par Next.js
EXPOSE 3000

# Démarre l'application en mode production
CMD ["npm", "start"]
