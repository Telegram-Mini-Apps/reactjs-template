# Используем официальный образ Node.js в качестве базового
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY ../package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы приложения
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Используем nginx для сервировки собранного приложения
FROM nginx:alpine

# Копируем собранное приложение из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx (при необходимости)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
