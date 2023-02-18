import * as L from "leaflet";
import { App } from "../App";
import { MapLayer } from "../constants/CMap";
import { Icons } from "./Icons";
import { Marker } from "./Marker";

export class MapManager {

  private app: App;

  public icons: Icons;
  public map: L.Map;
  public aboveLayer: L.Layer;
  public belowLayer: L.Layer;

  public active: L.LayerGroup;
  public aboveIdle: L.LayerGroup;
  public belowIdle: L.LayerGroup;
  public markers: Marker[] = [];

  public layer: MapLayer = MapLayer.ABOVE_GROUND;

  constructor(app: App) {
    this.app = app;
    this.icons = new Icons();

    this.app.event.request_receivedList.register(this.request_receivedList.bind(this));
    this.app.event.request_addedRequest.register(this.request_addedRequest.bind(this));
    this.app.event.request_removedRequest.register(this.request_removedRequest.bind(this));

    this.createMap();
    //this.createMarkers();
  }

  public setLayer(layer: MapLayer) {
    if (this.layer == layer) return;
    this.layer = layer;

    switch (this.layer) {
      case MapLayer.ABOVE_GROUND:
        this.belowLayer.removeFrom(this.map);
        this.aboveLayer.addTo(this.map);
        break;
      case MapLayer.BELOW_GROUND:
        this.aboveLayer.removeFrom(this.map);
        this.belowLayer.addTo(this.map);
        break;
    }
    this.app.event.map_changedLayer.emit();
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
      console.log(this.map.getZoom());
      const zoom = this.map.getZoom();

      // TODO: Change visible markers based on zoom level
      // All markers visible above "4"?
      // Active markers visible at any level
    });

    // translate bounds from pixel to latlng
    var sw = this.map.unproject([2200, 14184], 6);
    var ne = this.map.unproject([14184, 2200], 6);
    var bounds = new L.LatLngBounds(sw, ne);
    this.map.setMaxBounds(bounds)

    this.aboveLayer = L.tileLayer("images/map/above/{z}/{x}/{y}.jpg", {
      minZoom: 2,
      maxZoom: 6,
      noWrap: true,
      bounds: bounds
    }).addTo(this.map);

    this.belowLayer = L.tileLayer("images/map/below/{z}/{x}/{y}.jpg", {
      minZoom: 2,
      maxZoom: 6,
      noWrap: true,
      bounds: bounds
    });

  }

  private createMarkers() {
    var markerData = this.app.data.markers;
    for (var i = 0; i < markerData.length; i++) {
      var newMarker = new Marker(this.app, markerData[i], this.map, this.icons);
      this.markers.push(newMarker);
    }
  }

  private refresh() {

  }

  private request_receivedList() {
    this.refresh();
  }

  private request_addedRequest() {
    this.refresh();
  }

  private request_removedRequest() {
    this.refresh();
  }

}