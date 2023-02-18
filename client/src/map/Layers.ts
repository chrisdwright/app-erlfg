import * as L from "leaflet";
import { App } from "../App";
import { MapLayer } from "../constants/Constants";
import { MapManager } from "./MapManager";

export class Layers {

    private app: App;
    private manager: MapManager;
    private bounds: L.LatLngBounds;

    public layer: MapLayer = MapLayer.ABOVE_GROUND;
    public aboveLayer: L.Layer;
    public belowLayer: L.Layer;

    constructor(app: App, manager: MapManager, bounds: L.LatLngBounds) {
        this.app = app;
        this.manager = manager;
        this.bounds = bounds;

        this.init();
    }

    public setLayer(layer: MapLayer) {
        if (this.layer == layer) return;
        this.layer = layer;

        const map = this.manager.map;
        switch (this.layer) {
            case MapLayer.ABOVE_GROUND:
                this.belowLayer.removeFrom(map);
                this.aboveLayer.addTo(map);
                break;
            case MapLayer.BELOW_GROUND:
                this.aboveLayer.removeFrom(map);
                this.belowLayer.addTo(map);
                break;
        }
        this.app.event.map_changedLayer.emit();
    }

    private init() {
        this.aboveLayer = L.tileLayer("images/map/above/{z}/{x}/{y}.jpg", {
            minZoom: 2,
            maxZoom: 6,
            noWrap: true,
            bounds: this.bounds
        }).addTo(this.manager.map);

        this.belowLayer = L.tileLayer("images/map/below/{z}/{x}/{y}.jpg", {
            minZoom: 2,
            maxZoom: 6,
            noWrap: true,
            bounds: this.bounds
        });
    }

}