import * as L from "leaflet";
import { App } from "../App";
import { MarkerData } from "../data/MarkerData";
import { Icons } from "./Icons";

export class Marker {

  private app: App;
  public data: MarkerData;

  private asset: L.Marker;

  constructor(app: App, data: MarkerData, map: L.Map, icons: Icons) {
    this.app = app;
    this.data = data;

    this.asset = L.marker([this.data.y, this.data.x], {
      icon: icons.get(0, 0),
      title: this.data.name
    }).addTo(map);

    this.asset.on("click", () => {
      this.app.event.map_clickedMarker.emit(this);
    });
  }

}