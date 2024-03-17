import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    views?: number;
    isAuthenticated?: boolean;
  }
}
