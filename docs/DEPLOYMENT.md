# Deployment Guide

This guide covers how to deploy the Telegram Location Review Bot to various platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Railway Deployment](#railway-deployment)
- [Heroku Deployment](#heroku-deployment)
- [Docker Deployment](#docker-deployment)
- [Manual VPS Deployment](#manual-vps-deployment)
- [Database Setup](#database-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:
- Node.js 16+ locally for building
- Telegram Bot Token from [@BotFather](https://t.me/botfather)
- Supabase or PostgreSQL database
- Domain name (optional but recommended)

## Environment Variables

Create the following environment variables for each component:

### Backend Environment Variables
```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
BOT_TOKEN=your_telegram_bot_token
NODE_ENV=production
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_TELEGRAM_BOT_USERNAME=your_bot_username
```

### Bot Environment Variables
```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
API_BASE_URL=https://your-backend-domain.com
NODE_ENV=production
```

## Vercel Deployment (Recommended)

Vercel provides excellent support for React frontends and Node.js serverless functions.

### Deploy Backend

1. **Prepare Backend for Serverless**
   - Backend is already configured with Vercel functions in `/api` directory
   - `vercel.json` is configured for proper routing

2. **Deploy to Vercel**
   ```bash
   cd backend
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel dashboard > Your project > Settings > Environment Variables
   - Add all backend environment variables

### Deploy Frontend

1. **Build and Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

2. **Configure Environment Variables**
   - Add frontend environment variables in Vercel dashboard
   - Ensure `REACT_APP_API_URL` points to your backend domain

### Deploy Bot (Alternative Platforms)

Since Vercel is optimized for web applications, deploy the bot on a platform that supports long-running processes:

**Railway (Recommended for Bot)**
```bash
cd bot
npm install -g @railway/cli
railway login
railway deploy
```

**Or use Heroku, DigitalOcean, etc.**

## Railway Deployment

Railway is excellent for full-stack applications with persistent connections.

### Deploy All Components to Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   railway deploy
   ```

3. **Deploy Frontend**
   ```bash
   cd frontend
   npm run build
   railway deploy
   ```

4. **Deploy Bot**
   ```bash
   cd bot
   railway deploy
   ```

5. **Configure Environment Variables**
   - Use Railway dashboard or CLI to set environment variables
   - Link services to each other using Railway's internal networking

## Heroku Deployment

### Deploy Backend to Heroku

1. **Prepare Backend**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name-backend
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_ANON_KEY=your_key
   heroku config:set BOT_TOKEN=your_token
   git push heroku main
   ```

### Deploy Frontend to Heroku

1. **Prepare Frontend**
   ```bash
   cd frontend
   echo 'web: npx serve -s build -l $PORT' > Procfile
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name-frontend
   heroku buildpacks:set https://github.com/mars/create-react-app-buildpack
   heroku config:set REACT_APP_API_URL=https://your-backend.herokuapp.com
   git push heroku main
   ```

### Deploy Bot to Heroku

1. **Prepare Bot**
   ```bash
   cd bot
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name-bot
   heroku config:set TELEGRAM_BOT_TOKEN=your_token
   heroku config:set API_BASE_URL=https://your-backend.herokuapp.com
   git push heroku main
   ```

## Docker Deployment

Use Docker for containerized deployment across any platform.

### Create Docker Files

**Backend Dockerfile:**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Bot Dockerfile:**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]
```

### Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - BOT_TOKEN=${BOT_TOKEN}
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000

  bot:
    build: ./bot
    environment:
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - API_BASE_URL=http://backend:5000
    depends_on:
      - backend

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=telegram_bot
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy with Docker

```bash
# Create .env file with your variables
cp .env.example .env

# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f
```

## Manual VPS Deployment

For deployment on Ubuntu/Debian VPS:

### Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 16+
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo apt install nginx
```

### Deploy Backend

```bash
# Clone repository
git clone <your-repo> /var/www/telegram-bot
cd /var/www/telegram-bot/backend

# Install dependencies
npm ci --production

# Set up environment variables
sudo nano /etc/environment
# Add your environment variables

# Start with PM2
pm2 start ecosystem.config.js --name telegram-bot-backend
pm2 save
pm2 startup
```

### Deploy Frontend

```bash
cd /var/www/telegram-bot/frontend

# Build production version
npm ci
npm run build

# Serve with Nginx
sudo cp -r build/* /var/www/html/
```

### Configure Nginx

```nginx
# /etc/nginx/sites-available/telegram-bot
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/telegram-bot /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### Deploy Bot

```bash
cd /var/www/telegram-bot/bot

# Install dependencies
npm ci --production

# Start with PM2
pm2 start ecosystem.config.js --name telegram-bot
pm2 save
```

## Database Setup

### Supabase (Recommended)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and anon key

2. **Run Database Schema**
   - Go to SQL Editor in Supabase dashboard
   - Copy and run content from `backend/db/schema.sql`

### Self-hosted PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE telegram_bot;
CREATE USER bot_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE telegram_bot TO bot_user;
\q

# Run schema
psql -U bot_user -d telegram_bot -f backend/db/schema.sql
```

## SSL Certificate (Production)

### Using Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (add to crontab)
0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### PM2 Monitoring

```bash
# View processes
pm2 list

# View logs
pm2 logs

# Monitor in real-time
pm2 monit

# Restart services
pm2 restart all
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is added to backend CORS configuration
   - Check environment variables are correctly set

2. **Database Connection Errors**
   - Verify Supabase URL and key are correct
   - Check database schema is properly applied

3. **Telegram Bot Not Responding**
   - Verify bot token is correct
   - Check bot server is running and accessible
   - Ensure webhook URL is properly set (if using webhooks)

4. **Build Failures**
   - Clear node_modules and package-lock.json, reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set

### Health Checks

Add these endpoints to monitor your deployment:

```javascript
// Backend health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Performance Optimization

1. **Enable Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Static File Caching**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Database Indexing**
   ```sql
   CREATE INDEX idx_locations_approved ON locations(is_approved);
   CREATE INDEX idx_locations_category ON locations(category);
   CREATE INDEX idx_comments_location ON comments(location_id);
   ```

## Backup Strategy

### Database Backup

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U bot_user telegram_bot > backup_$DATE.sql
# Upload to cloud storage (AWS S3, Google Cloud, etc.)
```

### Application Backup

```bash
# Backup application files
tar -czf app_backup_$(date +%Y%m%d).tar.gz /var/www/telegram-bot
```

## Scaling Considerations

### Horizontal Scaling

- Use load balancers (Nginx, HAProxy)
- Deploy multiple backend instances
- Use Redis for session storage
- Consider microservices architecture

### Database Scaling

- Enable read replicas
- Implement connection pooling
- Use database caching (Redis)
- Consider sharding for large datasets

This deployment guide covers the most common scenarios. Choose the deployment method that best fits your infrastructure and requirements.