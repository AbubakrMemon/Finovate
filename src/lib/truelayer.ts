// TrueLayer configuration and utilities (Sandbox)
// Add your TrueLayer CLIENT_ID here after creating your TrueLayer account
export const TRUELAYER_CONFIG = {
  CLIENT_ID: "YOUR_TRUELAYER_CLIENT_ID",
  REDIRECT_URI: `${window.location.origin}/bank/callback`,
  AUTH_URL: "https://auth.truelayer-sandbox.com",
  API_URL: "https://api.truelayer-sandbox.com",
};

export interface TrueLayerAccount {
  account_id: string;
  account_number: {
    number: string;
    sort_code: string;
  };
  account_type: string;
  currency: string;
  display_name: string;
  provider: {
    display_name: string;
    logo_uri: string;
    provider_id: string;
  };
}

export interface TrueLayerTransaction {
  transaction_id: string;
  timestamp: string;
  description: string;
  amount: number;
  currency: string;
  transaction_type: string;
  transaction_category: string;
}

export interface TrueLayerBalance {
  currency: string;
  available: number;
  current: number;
  overdraft: number;
}

/**
 * Initiates TrueLayer OAuth flow
 * Redirects user to TrueLayer login page
 */
export function initiateTrueLayerAuth() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: TRUELAYER_CONFIG.CLIENT_ID,
    redirect_uri: TRUELAYER_CONFIG.REDIRECT_URI,
    scope: "accounts balance transactions offline_access",
    providers: "uk-ob-all uk-oauth-all",
  });

  window.location.href = `${TRUELAYER_CONFIG.AUTH_URL}/?${params.toString()}`;
}

/**
 * Exchanges authorization code for access token
 * IMPORTANT: This MUST be done on your backend server to keep CLIENT_SECRET secure
 *
 * Your backend endpoint should:
 * 1. Receive the authorization code
 * 2. Exchange it for tokens using CLIENT_SECRET
 * 3. Store tokens securely
 * 4. Return success/failure
 */
export async function exchangeCodeForToken(
  code: string
): Promise<{ access_token: string }> {
  // Call FastAPI backend endpoint that handles token exchange
  const response = await fetch(
    "http://localhost:8000/api/truelayer/exchange-token",
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

/**
 * Fetches accounts from TrueLayer
 */
export async function getAccounts(
  accessToken: string
): Promise<TrueLayerAccount[]> {
  const response = await fetch(`${TRUELAYER_CONFIG.API_URL}/data/v1/accounts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  const data = await response.json();
  return data.results;
}

/**
 * Fetches account balance
 */
export async function getBalance(
  accessToken: string,
  accountId: string
): Promise<TrueLayerBalance> {
  const response = await fetch(
    `${TRUELAYER_CONFIG.API_URL}/data/v1/accounts/${accountId}/balance`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch balance");
  }

  const data = await response.json();
  return data.results[0];
}

/**
 * Fetches transactions for an account
 */
export async function getTransactions(
  accessToken: string,
  accountId: string,
  from?: string,
  to?: string
): Promise<TrueLayerTransaction[]> {
  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);

  const response = await fetch(
    `${
      TRUELAYER_CONFIG.API_URL
    }/data/v1/accounts/${accountId}/transactions?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data.results;
}
