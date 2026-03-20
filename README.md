# Udhaar Tracker (MVP)

Simple, mobile-first web app for small shopkeepers to track udhaar (credit), payments, and pending balances.

## 1) Project Structure

```text
shopkeepers/
  backend/
    .env.example
    package.json
    src/
      server.js
      config/
        db.js
      middleware/
        auth.js
      models/
        User.js
        Customer.js
        Transaction.js
      routes/
        auth.js
        customers.js
        transactions.js
        dashboard.js
  frontend/
    .env.example
    package.json
    index.html
    vite.config.js
    postcss.config.js
    tailwind.config.js
    src/
      main.jsx
      App.jsx
      index.css
      lib/
        api.js
        i18n.js
      components/
        AuthScreen.jsx
        Dashboard.jsx
        Forms.jsx
        CustomerDetails.jsx
```

## 2) MongoDB Schema (Simple Models)

### User
- `name` (String, required)
- `phone` (String, required, unique)
- `password` (String, required, hashed)

### Customer
- `user` (ObjectId -> User, required)
- `name` (String, required)
- `phone` (String, optional)

### Transaction
- `user` (ObjectId -> User, required)
- `customer` (ObjectId -> Customer, required)
- `type` (`UDHAAR` or `PAYMENT`)
- `amount` (Number, required)
- `note` (String, optional; used for udhaar items)
- `date` (Date, default now)

## 3) Backend API Routes

Base URL: `http://localhost:5000/api`

### Auth
- `POST /auth/register`
  - body: `{ "name": "Ali", "phone": "03001234567", "password": "123456" }`
- `POST /auth/login`
  - body: `{ "phone": "03001234567", "password": "123456" }`

### Customers
- `POST /customers` (auth)
  - body: `{ "name": "Ahmed", "phone": "03112223333" }`
- `GET /customers` (auth)
- `GET /customers/:id` (auth) -> customer with transactions + running balance

### Transactions
- `POST /transactions/udhaar` (auth)
  - body: `{ "customerId": "...", "amount": 500, "note": "atta", "date": "2026-03-20" }`
- `POST /transactions/payment` (auth)
  - body: `{ "customerId": "...", "amount": 200 }`

### Dashboard
- `GET /dashboard` (auth)
  - returns:
    - `totalUdhaarGiven`
    - `totalReceived`
    - `remainingBalance`
    - `customerPending[]`

## 4) Frontend Components (React)

- `AuthScreen` -> simple login/register
- `Dashboard` -> KPI cards + pending customers list
- `AddCustomerForm` -> add customer quickly
- `AddUdhaarForm` -> add udhaar with note/date
- `AddPaymentForm` -> record payment
- `CustomerDetails` -> transaction history + running balance + reminder buttons (Phase 2 placeholder)

## 5) Sample UI Layout (Tailwind, Mobile-First)

- Single column layout, max width `max-w-md`
- Large tap areas (`p-3`, rounded buttons/cards)
- High contrast action colors
- Minimal text and simple flow
- Urdu/English language toggle (`EN` / `UR`)

## 6) Step-by-Step: Run Locally

## Requirements
- Node.js 18+
- MongoDB running locally

### A) Start Backend
1. Open terminal:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
2. Backend runs at `http://localhost:5000`

### B) Start Frontend
1. Open another terminal:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
2. Frontend runs at `http://localhost:5173`

## Beginner Notes

- Keep forms short and clean.
- Use only essential fields in MVP.
- Reminder buttons are UI-ready; actual WhatsApp/SMS integration can be added in Phase 2.
- Internet slow? This setup is lightweight and fast for basic usage.
# shopkeeper
