# flyPost (client)

The web browser client for the [flyPost server](https://github.com/tewson/flypost-prototype).

## Getting started

This project is based on the [Astro web framework](https://astro.build/) with React components.

### Environment variables

During development, set environment variables in `.env`.

| Name                  | Usage                                                                       |
| :-------------------- | :-------------------------------------------------------------------------- |
| `PUBLIC_API_BASE_URL` | Base URL for the flyPost server Strapi API, e.g. http://localhost:1337/api/ |

### Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Deployment

### Deploying to Fly.io

Set environment variables in `.env.production` and run `fly deploy`.
