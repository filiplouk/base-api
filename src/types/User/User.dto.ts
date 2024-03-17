//Login Req Body
export type LoginUser = {
  username: string;
  password: string;
};

//Register Req Body
export type RegisterUser = {
  username: string;
  password: string;
  confirm: string;
  acceptTerms: boolean;
};

//Login,Register response to router
export type AuthenticateRes = {
  authenticated: boolean;
  message?: string;
  userId?: number;
};
