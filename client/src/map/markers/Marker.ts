import * as L from "leaflet";
import { App } from "../../App";
import { MarkerLayer } from "../../constants/Constants";
import { MarkerData } from "../../data/MarkerData";
import { MapManager } from "../MapManager";
import { Markers } from "./Markers";

export class Marker {

  private app: App;
  private manager: MapManager;
  private markers: Markers;
  private data: MarkerData;

  public asset: L.Marker;
  public layer: MarkerLayer = MarkerLayer.NONE;

  constructor(app: App, manager: MapManager, markers: Markers, data: MarkerData) {
    this.app = app;
    this.manager = manager;
    this.markers = markers;
    this.data = data;

    this.asset = L.marker([this.data.y, this.data.x], {
      icon: app.icons.get(0, 0),
      title: this.data.name
    }); //.addTo(this.manager.map);

    this.asset.on("click", () => {
      this.app.event.map_clickedMarker.emit(this.data.id);
    });
  }

  public refresh() {
    const requests = this.app.data.requests.getByMarkerId(this.data.id);
    if (requests.length > 0) {
      if (this.layer == MarkerLayer.ACTIVE) return;
      this.addTo(MarkerLayer.ACTIVE);

      // TODO: set proper icon once duels are implemented
      this.asset.setIcon(this.app.icons.get(1, 0));
    } else {
      const layer = this.data.id < 277 ? MarkerLayer.ABOVE_IDLE : MarkerLayer.BELOW_IDLE;
      if (this.layer == layer) return;
      this.addTo(layer);
      this.asset.setIcon(this.app.icons.get(0, 0));
    }
  }

  private addTo(layer: MarkerLayer) {
    // remove from old layer
    if (this.layer != MarkerLayer.NONE) {
      switch (this.layer) {
        case MarkerLayer.ACTIVE: this.markers.active.removeLayer(this.asset); break;
        case MarkerLayer.ABOVE_IDLE: this.markers.aboveIdle.removeLayer(this.asset); break;
        case MarkerLayer.BELOW_IDLE: this.markers.belowIdle.removeLayer(this.asset); break;
      }
    }

    // add to new layer
    switch (layer) {
      case MarkerLayer.ACTIVE:
        this.markers.active.addLayer(this.asset);
        this.layer = MarkerLayer.ACTIVE;
        break;
      case MarkerLayer.ABOVE_IDLE:
        this.markers.aboveIdle.addLayer(this.asset);
        this.layer = MarkerLayer.ABOVE_IDLE;
        break;
      case MarkerLayer.BELOW_IDLE:
        this.markers.belowIdle.addLayer(this.asset);
        this.layer = MarkerLayer.BELOW_IDLE
        break;
    }
  }

}