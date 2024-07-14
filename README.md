This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Create .env file in the project's root directory

NEXT_PUBLIC_LOCAL_STORAGE_KEY=local-storage-key-for-wallet-info

NEXT_PUBLIC_SESSION_STORAGE_KEY=session-storage-key-for-password

NEXT_PUBLIC_SESSION_STORAGE_ENCRYPTION_KEY=the-key-to-encrypt-password

NEXT_PUBLIC_JUP_PRICE_API_URL=https://price.jup.ag/v6

NEXT_PUBLIC_JUP_QUOTE_API_URL=https://quote-api.jup.ag/v6

### For example

NEXT_PUBLIC_LOCAL_STORAGE_KEY=local-cygnus-wallet-keypair

NEXT_PUBLIC_SESSION_STORAGE_KEY=cygnus-wallet-password

NEXT_PUBLIC_SESSION_STORAGE_ENCRYPTION_KEY=HiJ!3Ka7@

NEXT_PUBLIC_JUP_PRICE_API_URL=https://price.jup.ag/v6

NEXT_PUBLIC_JUP_QUOTE_API_URL=https://quote-api.jup.ag/v6

## Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
```


## Run the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Create new wallet

You can crate a new wallet by clicking 'Create new wallet' button. After that, you need to define a password and copy your phrases. You must save your phrases!

## Import an existing wallet

You can import your existing wallet by clicking 'Import an existing wallet' button. After that, you should enter your phrases.

## Deploy on Vercel

Vercel Url: https://cygnus-wallet.vercel.app/
