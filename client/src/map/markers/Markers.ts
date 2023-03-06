import * as L from "leaflet";
import { App } from "../../App";
import { MapLayer } from "../../constants/Constants";
import { MapManager } from "../MapManager";
import { Marker } from "./Marker";

export class Markers {

    private app: App;
    private manager: MapManager;

    public active: L.LayerGroup;
    public aboveIdle: L.LayerGroup;
    public belowIdle: L.LayerGroup;
    public aboveAdded: boolean = false;
    public belowAdded: boolean = false;
    public markers: Marker[] = [];


    constructor(app: App, manager: MapManager) {
        this.app = app;
        this.manager = manager;

        this.app.event.request_receivedList.register(this.request_receivedList.bind(this));
        this.app.event.request_addedRequest.register(this.request_addedRequest.bind(this));
        this.app.event.request_removedRequest.register(this.request_removedRequest.bind(this));
        this.app.event.map_changedLayer.register(this.map_changedLayer.bind(this));
        this.app.event.map_changedZoom.register(this.map_changedZoom.bind(this));

        this.init();
    }

    private init() {
        this.active = new L.LayerGroup().addTo(this.manager.map);
        this.aboveIdle = new L.LayerGroup();
        this.belowIdle = new L.LayerGroup();

        var markerData = this.app.data.markers.markers;
        for (let i = 0; i < markerData.length; i++) {
            const newMarker = new Marker(this.app, this.manager, this, markerData[i]);
            this.markers.push(newMarker);
        }
    }

    //#region === Marker Layers ===

    private refreshLayers() {
        const zoom = this.manager.map.getZoom();
        if (zoom >= 4) {
            // above layer
            const aboveVisible = (this.app.map.layers.layer == MapLayer.ABOVE_GROUND);
            if (aboveVisible && !this.aboveAdded) {
                this.aboveIdle.addTo(this.manager.map);
                this.aboveAdded = true;
            } else if (!aboveVisible && this.aboveAdded) {
                this.aboveIdle.removeFrom(this.manager.map);
                this.aboveAdded = false;
            }

            // below layer
            const belowVisible = (this.app.map.layers.layer == MapLayer.BELOW_GROUND);
            if (belowVisible && !this.belowAdded) {
                this.belowIdle.addTo(this.manager.map);
                this.belowAdded = true;
            } else if (!belowVisible && this.belowAdded) {
                this.belowIdle.removeFrom(this.manager.map);
                this.belowAdded = false;
            }
        } else {
            // above layer
            if (this.aboveAdded) {
                this.aboveIdle.removeFrom(this.manager.map);
                this.aboveAdded = false;
            }

            // below layer
            if (this.belowAdded) {
                this.belowIdle.removeFrom(this.manager.map);
                this.belowAdded = false;
            }
        }
    }

    //#endregion

    //#region === Markers ===

    private refreshMarkers() {
        for (let i = 0; i < this.markers.length; i++)
            this.markers[i].refresh();
    }

    //#endregion

    //#region === Event Listeners ===

    private request_receivedList() {
        this.refreshMarkers();
    }

    private request_addedRequest() {
        this.refreshMarkers();
    }

    private request_removedRequest() {
        this.refreshMarkers();
    }

    private map_changedLayer() {
        this.refreshLayers();
    }

    private map_changedZoom() {
        this.refreshLayers();
    }

    //#endregions

}