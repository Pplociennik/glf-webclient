export interface UserSession {
  /** The unique identifier for the user's session. */
  id: string;
  /** The IP address from which the user accessed this session. */
  ipAddress: string;

  /** The timestamp (in milliseconds) marking the start of the session. */
  start: number;

  /** The timestamp (in milliseconds) representing the last time the session was accessed. */
  lastAccess: number;

  /** The approximate geographical location of the user during the session (if available). */
  location?: string;

  /** The type or identification of the device used to interact with the application during the session. */
  device?: string;
}
