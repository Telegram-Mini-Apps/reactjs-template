# OpenFreeMap Bot Backend

This is the Telegram bot backend for the OpenFreeMap Mini App. It provides API endpoints for managing users and locations, and runs a simple Telegram bot that launches the web app.

## Features

- **Telegram Bot**: Launches the mini app with a clean interface
- **REST API**: Handles users and locations data  
- **Supabase Integration**: Stores data in PostgreSQL database
- **Easy Deployment**: Ready for Railway, Heroku, or any Node.js host

## Quick Start

### 1. Install Dependencies

```bash
cd bot-backend
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
BOT_TOKEN=your_telegram_bot_token_here
FRONTEND_URL=https://your-frontend-url.vercel.app
BACKEND_URL=https://your-backend-url.railway.app
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

### 3. Database Setup

Make sure your Supabase database has these tables:

**Users Table:**
```sql
create table public.users (
  id serial not null,
  telegram_id character varying(64) not null,
  nickname character varying(64) not null,
  avatar_url text null,
  role character varying(16) null default 'user'::character varying,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  constraint users_pkey primary key (id),
  constraint users_telegram_id_key unique (telegram_id)
) TABLESPACE pg_default;
```

**Locations Table:**
```sql
create table public.locations (
  id serial not null,
  user_id integer null,
  name character varying(128) not null,
  description text null,
  latitude double precision not null,
  longitude double precision not null,
  type character varying(16) not null,
  category character varying(32) not null,
  is_approved boolean null default false,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  constraint locations_pkey primary key (id),
  constraint locations_user_id_fkey foreign KEY (user_id) references users (id) on delete set null,
  constraint locations_category_check check (
    (category)::text = any (
      (array['grocery'::character varying, 'restaurant-bar'::character varying, 'other'::character varying])::text[]
    )
  ),
  constraint locations_type_check check (
    (type)::text = any (
      (array['permanent'::character varying, 'temporary'::character varying])::text[]
    )
  )
) TABLESPACE pg_default;
```

### 4. Run Locally

```bash
npm run dev
```

The bot will start and the API will be available at `http://localhost:3000`

## Deployment

### Vercel (Recommended)

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set the **Root Directory** to `bot-backend`
4. Add environment variables in Vercel dashboard:
   - `BOT_TOKEN`
   - `FRONTEND_URL`
   - `BACKEND_URL` (your Vercel app URL)
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Deploy!
6. After deployment, set the webhook:
   ```bash
   npm run set-webhook
   ```

### Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard
4. Deploy!

### Heroku

1. Create a new app on [Heroku](https://heroku.com)
2. Connect your GitHub repository
3. Add environment variables in Heroku settings
4. Deploy from GitHub

### Environment Variables for Production

Make sure to set these in your hosting platform:

- `BOT_TOKEN` - Your Telegram bot token from [@BotFather](https://t.me/botfather)
- `FRONTEND_URL` - Your deployed frontend URL (e.g., Vercel app)
- `BACKEND_URL` - Your deployed backend URL (Railway, Heroku, etc.)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `PORT` - Port number (Railway/Heroku set this automatically)

## API Endpoints

### Users
- `GET /api/users/:telegramId` - Get user by Telegram ID
- `POST /api/users` - Create new user
- `PUT /api/users/update/:id` - Update user profile

### Locations
- `GET /api/locations` - Get all approved locations
- `POST /api/locations` - Create new location (requires approval)

### Health Check
- `GET /health` - Health check endpoint

### Bot Webhook
- `POST /webhook` - Telegram webhook endpoint (Vercel only)

## Bot Commands

The bot supports these interactions:

- `/start` - Welcome message with web app button
- `/help` - Show help information
- `/map` - Open the web app directly

## Development

### File Structure

```
bot-backend/
├── api/                  # Vercel serverless functions
│   ├── health.js        # Health check endpoint
│   ├── users/           # User management endpoints
│   └── locations/       # Location management endpoints
├── lib/
│   └── supabase.js      # Supabase client configuration
├── scripts/
│   └── set-webhook.js   # Webhook setup script
├── src/
│   └── index.js         # Main bot and API server (Railway/Heroku)
├── bot.js               # Telegram bot webhook handler (Vercel)
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies and scripts
├── .env.example         # Environment template
└── README.md           # This file
```

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start with file watching
- `npm run build` - No build step needed for Node.js

## Troubleshooting

### Bot Not Responding
- Check if `BOT_TOKEN` is correct
- Verify bot is not already running elsewhere
- Make sure webhook is not set (use `/deleteWebhook`)

### Database Errors
- Verify Supabase credentials
- Check if tables exist with correct schema
- Ensure Row Level Security (RLS) is configured properly

### API Errors
- Check `CORS` settings if frontend can't connect
- Verify `BACKEND_URL` matches your deployment
- Check logs for specific error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details