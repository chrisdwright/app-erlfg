import { App } from "../../app";

export class UserRecord {

  private app: App;

  public _id: number;

  constructor(app: App) {
    this.app = app;
  }

  public insert(hash: string, callback: CallableFunction) {
    /*
      this.serialize();

      var db = this.app.dbManager.getPool();
      db.query(
          `INSERT INTO user (ua_type, ua_timestampCreated, ua_timestampExpires, ua_login, ua_hash, ua_displayName, ua_cosmetics, ua_lastWorldId) ` +
          `VALUES ('${this._type}', ${this._timestampCreated}, ${this._timestampExpires}, '${this._login}', '${hash}', '${this._displayName}', '${this._cosmetics}', 0)`,
          (err: any, result: any, fields: any) => {
              if (err) throw new Error(err);

              this._id = result.insertId;
              callback(this._id);
          }
      );
      */
  }

  public load(userId: number, callback: CallableFunction) {
    /*
      var db = this.app.dbManager.getPool();
      db.query(
          `SELECT * FROM user_account WHERE ua_id = '${userId}'`,
          (err: any, result: any, fields: any) => {
              if (err) throw new Error(err);
              var result = result[0];

              this._id = result.ua_id;
              this._type = result.ua_type;

              this._timestampCreated = result.ua_timestampCreated;
              this._timestampExpires = result.ua_timestampExpires;

              this._login = result.ua_login;
              this._displayName = result.ua_displayName;
              this._cosmetics = result.ua_cosmetics;
              this._lastWorldId = result.ua_lastWorldId;

              this.parse();

              // update guest expiry
              if (this._type == "guest") {
                  db.query(
                      `UPDATE user_account SET ua_timestampExpires = ${this._timestampExpires} WHERE ua_id = ${this._id}`,
                      (err: any, result: any, fields: any) => {
                          if (err) throw new Error(err);
                          console.log(`${this._login}: updated expiry...`);
                      }
                  );
              }

              callback();
          }
      );
    */
  }

  public update(callback?: CallableFunction) {
    /*
      this.serialize();

      var db = this.app.dbManager.getPool();
      db.query(
          `UPDATE user ` +
          `SET ua_type = '${this._type}', ua_displayName = ?, ua_cosmetics = '${this._cosmetics}', ua_lastWorldId = ${this._lastWorldId} ` +
          `WHERE ua_id = ${this._id}`,
          [this._displayName],
          (err: any, result: any, fields: any) => {
              if (err) throw new Error(err);

              if (callback)
                  callback();
          }
      );
    */
  }

  private serialize() {

  }

  private deserialize() {

  }

}