# Development

Steps to set up the app on development mode

1. Install the node dependencies `npm install`

2. Run the database

```
docker compose up -d
```

3. Create a copy of the .env.template file and rename it to .env

4. Replace the env variables

5. Do the prisma setup

6. Execute the SEED for data generation

```
http://localhost:3000/api/seed
```

### Note: Default User
```
email: test@test.com
password: 123456
```

# Prisma Setup

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```