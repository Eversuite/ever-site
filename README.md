# Ever Site
Working name, suggestions are welcome

This project is dedicated to creating a website to display various data for the game [Evercore Heroes](https://evercoreheroes.com/)

## Running locally
The project requires Node 18+ and an active internet connection

Create a `.env` file in the root folder and add the following credentials

```
PUBLIC_SUPABASE_URL=https://eyytjuzrswmcsmzmrlsh.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eXRqdXpyc3dtY3Ntem1ybHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzODc0NTMsImV4cCI6MTk4Njk2MzQ1M30.bXXqWnczsxG42A2YqY182XQvz-855J2YAV_OUB0_Lu4
```
To get the project up and running:

```bash
#Install dependencies
npm install

#Start the dev server
npm run dev

#Start the dev server and open it in a new browser tab
npm run dev -- --open
```