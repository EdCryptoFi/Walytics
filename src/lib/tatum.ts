const TATUM_API_KEY = process.env.TATUM_API_KEY || ""
const SUI_RPC_URL = "https://sui-mainnet.gateway.tatum.io"
const REQUEST_TIMEOUT_MS = 10_000

export async function tatumRpcCall<T>(method: string, params: unknown[] = []): Promise<T> {
  if (!TATUM_API_KEY) {
    throw new Error("TATUM_API_KEY is not configured")
  }

  const res = await fetch(SUI_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": TATUM_API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (!res.ok) {
    throw new Error(`Tatum RPC error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  if (data.error) {
    throw new Error(`Tatum RPC error: ${data.error.message}`)
  }

  return data.result as T
}
