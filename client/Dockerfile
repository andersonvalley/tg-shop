# Используем образ Node.js в качестве базового образа
FROM node:latest

# Устанавливаем директорию приложения внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта внутрь контейнера
COPY . .

RUN npm run build

# Указываем порт, который будет использоваться приложением
EXPOSE 3000

# Запускаем приложение с помощью команды npm start
CMD npm run start