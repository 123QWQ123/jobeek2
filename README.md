# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm i
npm run build
pm2 restart JobeekOnline
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Alerts:
```bash
# Toast example
1)  useNuxtApp().$toast.info(message, {autoClose: 3000})
2)  import { toast } from "vue3-toastify";
    toast.info(resData.message, { autoClose: 3000 });
    
# Swal example
    Swal.fire({
       title: "Title!",
       text: message,
       icon: "error | success | warning | info | question",
       confirmButtonText: "ОК",
    });
```
[Sweetalert2 Documentation](https://sweetalert2.github.io)

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
