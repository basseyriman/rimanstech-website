const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 30;

function rateLimitMemory(ip: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: MAX_REQUESTS - entry.count };
}

async function rateLimitUpstash(ip: string): Promise<{ success: boolean; remaining: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return rateLimitMemory(ip);
  }

  const key = `ratelimit:${ip}`;
  const windowSec = Math.floor(WINDOW_MS / 1000);

  try {
    const response = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, windowSec, "NX"],
        ["TTL", key],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      return rateLimitMemory(ip);
    }

    const results = (await response.json()) as Array<{ result: number }>;
    const count = results[0]?.result ?? 1;
    const remaining = Math.max(0, MAX_REQUESTS - count);

    return { success: count <= MAX_REQUESTS, remaining };
  } catch {
    return rateLimitMemory(ip);
  }
}

export async function rateLimit(ip: string): Promise<{ success: boolean; remaining: number }> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return rateLimitUpstash(ip);
  }
  return rateLimitMemory(ip);
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
