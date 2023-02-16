import { Constants } from "./constants/Constants";
import { PlatformType } from "./constants/PlatformType";
import { DataManager } from "./data/DataManager";
import { EventManager } from "./event/EventManager";
import { MapManager } from "./map/MapManager";
import { NetworkManager } from "./network/NetworkManager";
import { UIManager } from "./ui/UIManager";

export class App {

  public data: DataManager;
  public event: EventManager;
  public net: NetworkManager;
  public map: MapManager;
  public ui: UIManager;

  constructor() {
    this.data = new DataManager(this, () => {
      this.event = new EventManager();
      this.net = new NetworkManager(this);
      this.map = new MapManager(this);
      this.ui = new UIManager(this);

      this.event.network_connected.register(this.onConnected.bind(this));
      this.net.connectToServer();
    });
  }

  private onConnected() {
    //const lastAccountType = localStorage.getItem(Constants.LS_LAST_ACCOUNT_TYPE);
    const lastPlatform = localStorage.getItem(Constants.LS_LAST_PLATFORM);
    this.net.selectPlatform(lastPlatform ? parseInt(lastPlatform) : PlatformType.PC);

    //this.net.signIn(
    //  (lastAccountType ? parseInt(lastAccountType) : AccountType.GUEST),
    //  (lastPlatform ? parseInt(lastPlatform) : PlatformType.WINDOWS)
    //);
  }

}

export const app = new App();