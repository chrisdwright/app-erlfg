import { App } from "../App";
import { Menu } from "./menu/Menu";
import { Platform } from "./platform/Platform";

export class UIManager {

  private app: App;

  public platform: Platform;
  public menu: Menu;

  constructor(app: App) {
    this.platform = new Platform(app);
    this.menu = new Menu(app);
  }

}