from fastapi import FastAPI, HTTPException, Header
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv
import sys

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv()

app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Authorization"],
)

# ✅ TrueLayer Config
TRL_CLIENT_ID = os.getenv("TRL_CLIENT_ID")
TRL_CLIENT_SECRET = os.getenv("TRL_CLIENT_SECRET")
TRL_REDIRECT_URI = os.getenv("TRL_REDIRECT_URI", "http://localhost:8000/callback")

TRL_AUTH_URL = "https://auth.truelayer-sandbox.com"
TRL_API_URL = "https://api.truelayer-sandbox.com"

@app.get("/")
def home():
    return {"message": "TrueLayer FastAPI Backend Running ✅"}

# ✅ STEP 1 – REDIRECT TO TRUE LAYER
@app.get("/login")
def login():
    if not TRL_CLIENT_ID or not TRL_REDIRECT_URI:
        print("⚠️ Missing environment variables. Check .env file.")

    auth_url = (
        f"{TRL_AUTH_URL}/?response_type=code"
        f"&client_id={TRL_CLIENT_ID}"
        f"&redirect_uri={TRL_REDIRECT_URI}"
        f"&scope=info accounts balance transactions offline_access"
        f"&providers=mock"
    )
    print("✅ Redirecting user to:", auth_url)
    return RedirectResponse(url=auth_url)

# ✅ STEP 2 – CALLBACK (EXCHANGE CODE FOR TOKEN)
@app.get("/callback")
async def callback(code: str):
    if not code:
        return RedirectResponse(url="http://localhost:5173/bank/callback?error=no_code")

    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            f"{TRL_AUTH_URL}/connect/token",
            data={
                "grant_type": "authorization_code",
                "client_id": TRL_CLIENT_ID,
                "client_secret": TRL_CLIENT_SECRET,
                "redirect_uri": TRL_REDIRECT_URI,
                "code": code,
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )

        if token_response.status_code != 200:
            return RedirectResponse(url="http://localhost:5173/bank/callback?error=token_failed")

        token_data = token_response.json()
        access_token = token_data.get("access_token")

        if not access_token:
            return RedirectResponse(url="http://localhost:5173/bank/callback?error=no_token")

        # ✅ ✅ IMPORTANT CHANGE HERE
        print("✅ Access token generated:", access_token[:20], "...")
        return RedirectResponse(url=f"http://localhost:5173/bank/callback?token={access_token}")

# ✅ STEP 3 – FETCH ACCOUNT DATA
@app.get("/fetch-data")
async def fetch_data(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        print("❌ No Authorization header received")
        raise HTTPException(status_code=401, detail="Missing or invalid token")

    token = authorization.replace("Bearer ", "")
    print("✅ Token received:", token[:20], "...")

    try:
        async with httpx.AsyncClient() as client:
            accounts_response = await client.get(
                f"{TRL_API_URL}/data/v1/accounts",
                headers={"Authorization": f"Bearer {token}"}
            )

            if accounts_response.status_code != 200:
                raise HTTPException(status_code=accounts_response.status_code, detail="Could not fetch accounts")

            accounts_data = accounts_response.json().get("results", [])
            enriched_accounts = []

            for account in accounts_data:
                acc_id = account.get("account_id")

                balance_resp = await client.get(
                    f"{TRL_API_URL}/data/v1/accounts/{acc_id}/balance",
                    headers={"Authorization": f"Bearer {token}"}
                )

                transactions_resp = await client.get(
                    f"{TRL_API_URL}/data/v1/accounts/{acc_id}/transactions",
                    headers={"Authorization": f"Bearer {token}"}
                )

                enriched_accounts.append({
                    "account_id": acc_id,
                    "account_name": account.get("display_name", "Unnamed Account"),
                    "account_number": account.get("account_number", {}).get("number", "N/A"),
                    "sort_code": account.get("account_number", {}).get("sort_code", "N/A"),
                    "iban": account.get("account_number", {}).get("iban", "N/A"),
                    "available_balance": balance_resp.json().get("results", [{}])[0].get("available", 0),
                    "current_balance": balance_resp.json().get("results", [{}])[0].get("current", 0),
                    "currency": account.get("currency", "GBP"),
                    "transactions": transactions_resp.json().get("results", [])[:3],
                })

            return {"accounts": enriched_accounts}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
