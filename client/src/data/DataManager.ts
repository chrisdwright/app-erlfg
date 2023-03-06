import { App } from "../App";
import { Constants, ModeType, PlatformType } from "../constants/Constants";
import { BossData } from "./BossData";
import { ChatData } from "./ChatData";
import { MarkerData } from "./MarkerData";
import { RequestData } from "./RequestData";

export class DataManager {

  private app: App;

  public chats: ChatData = new ChatData();
  public requests: RequestData = new RequestData();
  public markers: MarkerData = new MarkerData();
  public bosses: BossData = new BossData();

  public platform: PlatformType;
  public mode: ModeType = ModeType.IDLE;

  constructor(app: App, callback: CallableFunction) {
    this.app = app;

    this.markers.load(() => {
      this.bosses.load(() => {
        callback();
      });
    });
  }

  public setPlatform(platform: PlatformType) {
    this.platform = platform;

    localStorage.setItem(Constants.LS_LAST_PLATFORM, platform.toString());
    this.app.event.data_updatedPlatform.emit();
  }

}