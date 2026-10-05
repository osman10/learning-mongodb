# my-api

Express + TypeScript + Mongoose (ESM, tsx watch mode).

## Setup
```bash
npm install
# edit .env if needed (MONGO_URI, PORT)
npm run dev      # dev with auto-reload
npm run build    # compile to dist/
npm start        # run compiled build
```

## Test
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
curl http://localhost:5000/api/users
```
