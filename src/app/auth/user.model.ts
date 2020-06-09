export class User {
  constructor(
    public email: string,
    public uid: string,
    private _idToken: string,
    private _refreshToken: string,
    private _tokenExpirationDate: Date,
    public displayName?: string
  ) {

  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._idToken;
  }
  get refreshToken() {
    return this._refreshToken;
  }
  // get refreshToken() {
  //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //     return this._refreshToken;
  //   }
  //   return null;
  // }
}
