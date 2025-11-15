# TrueLayer Integration Setup Guide

This guide will help you set up TrueLayer bank integration for your application.

## Prerequisites

1. Create a TrueLayer account at [https://console.truelayer.com/](https://console.truelayer.com/)
2. Set up your backend server (FastAPI, Node.js, etc.)

## Step 1: TrueLayer Console Setup

1. Go to [TrueLayer Console](https://console.truelayer.com/)
2. Create a new application
3. Note down your:
   - **Client ID** (public)
   - **Client Secret** (private - NEVER expose in frontend!)
4. Add your redirect URI: `http://localhost:YOUR_PORT/bank/callback` (development) or `https://yourdomain.com/bank/callback` (production)

## Step 2: Update Frontend Configuration

In `src/lib/truelayer.ts`, replace:

```typescript
CLIENT_ID: 'YOUR_TRUELAYER_CLIENT_ID',
```

With your actual Client ID from TrueLayer Console.

## Step 3: Backend Setup (REQUIRED)

You **MUST** create a backend endpoint to handle token exchange securely. The Client Secret should NEVER be exposed in frontend code.

### Example FastAPI Backend:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

app = FastAPI()

TRUELAYER_CLIENT_ID = os.getenv("TRUELAYER_CLIENT_ID")
TRUELAYER_CLIENT_SECRET = os.getenv("TRUELAYER_CLIENT_SECRET")
TRUELAYER_AUTH_URL = "https://auth.truelayer.com"

class TokenExchangeRequest(BaseModel):
    code: str

@app.post("/api/truelayer/exchange-token")
async def exchange_token(request: TokenExchangeRequest):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{TRUELAYER_AUTH_URL}/connect/token",
                data={
                    "grant_type": "authorization_code",
                    "client_id": TRUELAYER_CLIENT_ID,
                    "client_secret": TRUELAYER_CLIENT_SECRET,
                    "code": request.code,
                    "redirect_uri": "http://localhost:YOUR_PORT/bank/callback",
                },
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/truelayer/refresh-token")
async def refresh_token(refresh_token: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{TRUELAYER_AUTH_URL}/connect/token",
                data={
                    "grant_type": "refresh_token",
                    "client_id": TRUELAYER_CLIENT_ID,
                    "client_secret": TRUELAYER_CLIENT_SECRET,
                    "refresh_token": refresh_token,
                },
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(e))
```

### Example Node.js/Express Backend:

```javascript
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const TRUELAYER_CLIENT_ID = process.env.TRUELAYER_CLIENT_ID;
const TRUELAYER_CLIENT_SECRET = process.env.TRUELAYER_CLIENT_SECRET;
const TRUELAYER_AUTH_URL = "https://auth.truelayer.com";

app.post("/api/truelayer/exchange-token", async (req, res) => {
  try {
    const { code } = req.body;

    const response = await axios.post(`${TRUELAYER_AUTH_URL}/connect/token`, {
      grant_type: "authorization_code",
      client_id: TRUELAYER_CLIENT_ID,
      client_secret: TRUELAYER_CLIENT_SECRET,
      code: code,
      redirect_uri: "http://localhost:YOUR_PORT/bank/callback",
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Backend server running on port 3000");
});
```

## Step 4: Update Frontend API Endpoint

In `src/lib/truelayer.ts`, update the `exchangeCodeForToken` function to point to your backend:

```typescript
export async function exchangeCodeForToken(
  code: string
): Promise<{ access_token: string }> {
  const response = await fetch(
    "http://localhost:YOUR_BACKEND_PORT/api/truelayer/exchange-token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to exchange token");
  }

  return response.json();
}
```

## Step 5: Environment Variables

Create a `.env` file in your backend:

```
TRUELAYER_CLIENT_ID=your_client_id_here
TRUELAYER_CLIENT_SECRET=your_client_secret_here
```

**NEVER commit this file to version control!**

## Step 6: Test the Integration

1. Start your backend server
2. Start your frontend application
3. Navigate to the Bank page
4. Click "Connect Bank"
5. You'll be redirected to TrueLayer to select your bank
6. After authentication, you'll be redirected back with bank data

## Important Security Notes

⚠️ **NEVER** expose your Client Secret in frontend code
⚠️ **ALWAYS** handle token exchange on the backend
⚠️ **ALWAYS** use HTTPS in production
⚠️ Store access tokens securely (consider using httpOnly cookies)
⚠️ Implement proper token refresh logic for long-lived sessions

## Production Checklist

- [ ] Update redirect URI to production domain in TrueLayer Console
- [ ] Update all URLs from localhost to production URLs
- [ ] Enable HTTPS
- [ ] Implement proper token storage (database)
- [ ] Implement token refresh mechanism
- [ ] Add error logging and monitoring
- [ ] Add rate limiting to your backend endpoints
- [ ] Review TrueLayer's compliance requirements

## Documentation

- [TrueLayer API Documentation](https://docs.truelayer.com/)
- [TrueLayer OAuth Flow](https://docs.truelayer.com/docs/quickstart-oauth)
- [TrueLayer Data API](https://docs.truelayer.com/docs/retrieve-account-transaction-data)
