import * as $ from "jquery";
import { App } from "../App";
import { Constants, ModeType, PlatformType } from "../constants/Constants";
import { BossData } from "./BossData";
import { MarkerData } from "./MarkerData";
import { RequestData } from "./RequestData";

export class DataManager {

  private app: App;

  public requests: RequestData = new RequestData();

  public markers: MarkerData[] = [];
  public bosses: BossData[] = [];

  public platform: PlatformType;
  public markerId: number = -1;
  public mode: ModeType = ModeType.IDLE;

  constructor(app: App, callback: CallableFunction) {
    this.app = app;
    this.loadMarkers(() => {
      this.loadBosses(() => {
        callback();
      });
    });
  }

  public setPlatform(platform: PlatformType) {
    localStorage.setItem(Constants.LS_LAST_PLATFORM, platform.toString());
    this.platform = platform;
    this.app.event.data_updatedPlatform.emit();
  }

  /*
  public setMarkerId(id: number) {
    this.markerId = id;
    this.app.event.data_updatedMarkerId.emit(id);
  }
  */

  public getMarkerById(id: number) {
    for (var i = 0; i < this.markers.length; i++)
      if (this.markers[i].id == id)
        return this.markers[i];
    return null;
  }

  public getBossById(id: number) {
    for (var i = 0; i < this.bosses.length; i++)
      if (this.bosses[i].id == id)
        return this.bosses[i];
    return null;
  }

  private loadMarkers(callback: CallableFunction) {
    $.getJSON(Constants.PATH_TO_SHARED + "markers.json", (json: any) => {
      var nodes = json.markers;
      for (var i = 0; i < nodes.length; i++) {
        this.markers.push(
          new MarkerData(nodes[i])
        );
      }
      callback();
    });
  }

  private loadBosses(callback: CallableFunction) {
    $.getJSON(Constants.PATH_TO_SHARED + "bosses.json", (json: any) => {
      var nodes = json.bosses;
      for (var i = 0; i < nodes.length; i++) {
        this.bosses.push(
          new BossData(nodes[i])
        );
      }
      callback();
    });
  }

}