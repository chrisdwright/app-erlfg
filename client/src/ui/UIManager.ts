import { App } from "../App";
import { Menu } from "./menu/Menu";
import { Toolbar } from "./toolbar/Toolbar";

export class UIManager {

  private app: App;

  public toolbar: Toolbar;
  public menu: Menu;

  constructor(app: App) {
    this.toolbar = new Toolbar(app);
    this.menu = new Menu(app);
  }

}