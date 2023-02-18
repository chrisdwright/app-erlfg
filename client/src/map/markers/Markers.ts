import * as L from "leaflet";
import { App } from "../../App";
import { MapLayer, MarkerLayer } from "../../constants/Constants";
import { MapManager } from "../MapManager";
import { Marker } from "./Marker";

export class Markers {

    private app: App;
    private manager: MapManager;

    public active: L.LayerGroup;
    public aboveIdle: L.LayerGroup;
    public belowIdle: L.LayerGroup;
    public markers: Marker[] = [];

    public aboveAdded: boolean = false;
    public belowAdded: boolean = false;

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

        var markerData = this.app.data.markers;
        for (var i = 0; i < markerData.length; i++) {
            var newMarker = new Marker(this.app, this.manager, this, markerData[i]);
            this.markers.push(newMarker);
        }
    }

    private refresh() {
        // refresh layers
        const zoom = this.manager.map.getZoom();
        if (zoom >= 4) {
            const layer = this.manager.layers.layer;
            switch (layer) {
                case MapLayer.ABOVE_GROUND:
                    if (this.aboveAdded) return;
                    this.addLayer(MarkerLayer.ABOVE_IDLE);
                    break;

                case MapLayer.BELOW_GROUND:
                    if (this.belowAdded) return;
                    this.addLayer(MarkerLayer.BELOW_IDLE);
                    break;
            }
        } else {
            if (!this.aboveAdded && !this.belowAdded) return;
            this.removeLayers();
        }

        // refresh markers
        for (let i = 0; i < this.markers.length; i++)
            this.markers[i].refresh();
    }

    private removeLayers() {
        if (this.aboveAdded) {
            this.aboveIdle.removeFrom(this.manager.map);
            this.aboveAdded = false;
        }
        if (this.belowAdded) {
            this.belowIdle.removeFrom(this.manager.map);
            this.belowAdded = false;
        }
    }

    private addLayer(layer: MarkerLayer) {
        this.removeLayers();

        // add new layer
        switch (layer) {
            case MarkerLayer.ABOVE_IDLE:
                this.aboveIdle.addTo(this.manager.map);
                this.aboveAdded = true;
                break;

            case MarkerLayer.BELOW_IDLE:
                this.belowIdle.addTo(this.manager.map);
                this.belowAdded = true;
                break;
        }
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

    private map_changedLayer() {
        this.refresh();
    }

    private map_changedZoom() {
        this.refresh();
    }

}