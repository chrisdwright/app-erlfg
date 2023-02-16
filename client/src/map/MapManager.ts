import * as L from "leaflet";
import { App } from "../App";
import { Icons } from "./Icons";
import { Marker } from "./Marker";

export class MapManager {

  private app: App;

  public icons: Icons;
  public map: L.Map;
  public markers: Marker[] = [];

  constructor(app: App) {
    this.app = app;
    this.icons = new Icons();

    this.createMap();
    this.createMarkers();
  }

  private createMap() {
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
      var pos = ev.latlng;
      console.log('"x": ' + pos.lng.toFixed(1) + ', "y": ' + pos.lat.toFixed(1) + ',');
      this.app.event.map_clickedMap.emit();
    });

    this.map.on("zoomend", (ev: any) => {
      //console.log(ev);
      // TODO: Change visible markers based on zoom level
      // All markers visible above "4"?
      // Active markers visible at any level
    });

    // translate bounds from pixel to latlng
    var sw = this.map.unproject([2200, 14184], 6);
    var ne = this.map.unproject([14184, 2200], 6);
    var bounds = new L.LatLngBounds(sw, ne);
    this.map.setMaxBounds(bounds)

    L.tileLayer("images/map/above/{z}/{x}/{y}.jpg", {
      minZoom: 2,
      maxZoom: 6,
      noWrap: true,
      bounds: bounds
    }).addTo(this.map);

  }

  private createMarkers() {
    var markerData = this.app.data.markers;
    for (var i = 0; i < markerData.length; i++) {
      var newMarker = new Marker(this.app, markerData[i], this.map, this.icons);
      this.markers.push(newMarker);
    }
  }

}