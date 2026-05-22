const TATUM_API_KEY = process.env.TATUM_API_KEY || ""
const SUI_RPC_URL = "https://sui-mainnet.gateway.tatum.io"

interface TatumRpcRequest {
  jsonrpc: "2.0"
  id: number
  method: string
  params: unknown[]
}

export async function tatumRpcCall<T>(method: string, params: unknown[] = []): Promise<T> {
  const body: TatumRpcRequest = {
    jsonrpc: "2.0",
    id: 1,
    method,
    params,
  }

  const res = await fetch(SUI_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": TATUM_API_KEY,
    },
    body: JSON.stringify(body),
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

export function getWalrusPackageId(): string {
  return "0x...walrus-package-id..."
}
