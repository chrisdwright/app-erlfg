import { PlatformType } from "../../constants/Constants";
import { User } from "./User";

export class UserManager {

  private users: User[] = [];

  public add(user: User) {
    this.users.push(user);
    this.debug();
  }

  public remove(user: User) {
    for (var i = 0; i < this.users.length; i++)
      if (this.users[i] == user)
        this.users.splice(i, 1);
    this.debug();
  }

  public sendAll(data: any) {
    for (let i = 0; i < this.users.length; i++)
      this.users[i].send(data);
  }

  public sendPlatform(data: any, platform: PlatformType) {
    for (let i = 0; i < this.users.length; i++)
      if (this.users[i].platform == platform)
        this.users[i].send(data);
  }

  private debug() {
    console.log(`There are ${this.users.length} users connected.`);
  }

}