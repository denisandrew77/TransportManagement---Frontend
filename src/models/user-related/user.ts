export interface userDetails{
  userName: string,
  password: string,
}

export interface userState extends userDetails{
  userName: string,
  password: string,
  loggedIn: boolean,
  admin: boolean,
}
