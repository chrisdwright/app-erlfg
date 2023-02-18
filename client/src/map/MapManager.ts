import * as L from "leaflet";
import { App } from "../App";
import { Layers } from "./Layers";
import { Markers } from "./markers/Markers";

export class MapManager {

  private app: App;

  public map: L.Map;

  public layers: Layers;
  public markers: Markers;

  constructor(app: App) {
    this.app = app;

    this.init();
  }

  private init() {
    this.map = L.map("map", {
      crs: L.CRS.Simple,
      bounceAtZoomLimits: false,
      maxBoundsViscosity: 1,
      zoomSnap: 0.25,
      zoomDelta: 0.25,
      attributionControl: false
    }).setView([-128, 128], 3);
    this.map.zoomControl.setPosition("bottomleft");

    // map event listeners
    this.map.on("click", (ev: any) => {
      //var pos = ev.latlng;
      //console.log('"x": ' + pos.lng.toFixed(1) + ', "y": ' + pos.lat.toFixed(1) + ',');
      this.app.event.map_clickedMap.emit();
    });

    this.map.on("zoomend", (ev: any) => {
      this.app.event.map_changedZoom.emit();
    });

    // translate bounds from pixel to latlng
    var sw = this.map.unproject([2200, 14184], 6);
    var ne = this.map.unproject([14184, 2200], 6);
    var bounds = new L.LatLngBounds(sw, ne);
    this.map.setMaxBounds(bounds)

    this.layers = new Layers(this.app, this, bounds);
    this.markers = new Markers(this.app, this);
  }

}