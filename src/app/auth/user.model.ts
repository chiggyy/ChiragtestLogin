export class UserModel {
  constructor(
    public email: string,
    public id: string,
    // tslint:disable-next-line: variable-name
    private _token: string,
    // tslint:disable-next-line: variable-name
    private _tokenExpirationDate: Date
    ) {}


    get Token() {
      if (!this._tokenExpirationDate ||  new Date() > this._tokenExpirationDate) {
        return;
      }
      return this._token;
    }
}
