type LogLevel = "info" | "warn" | "error" | "debug"

interface LogEntry {
  level: LogLevel
  message: string
  route?: string
  method?: string
  ip?: string
  duration?: number
  error?: string
  metadata?: Record<string, unknown>
  timestamp: string
}

function formatLog(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.level.toUpperCase()}]`,
    entry.message,
  ]

  if (entry.route) parts.push(`route=${entry.route}`)
  if (entry.method) parts.push(`method=${entry.method}`)
  if (entry.ip) parts.push(`ip=${entry.ip}`)
  if (entry.duration !== undefined) parts.push(`duration=${entry.duration}ms`)
  if (entry.error) parts.push(`error="${entry.error}"`)

  return parts.join(" ")
}

function createLogEntry(
  level: LogLevel,
  message: string,
  meta?: Partial<Omit<LogEntry, "level" | "message" | "timestamp">>
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  }
}

export const logger = {
  info: (message: string, meta?: Partial<Omit<LogEntry, "level" | "message" | "timestamp">>) =>
    console.log(formatLog(createLogEntry("info", message, meta))),

  warn: (message: string, meta?: Partial<Omit<LogEntry, "level" | "message" | "timestamp">>) =>
    console.warn(formatLog(createLogEntry("warn", message, meta))),

  error: (message: string, meta?: Partial<Omit<LogEntry, "level" | "message" | "timestamp">>) =>
    console.error(formatLog(createLogEntry("error", message, meta))),

  debug: (message: string, meta?: Partial<Omit<LogEntry, "level" | "message" | "timestamp">>) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(formatLog(createLogEntry("debug", message, meta)))
    }
  },
}
