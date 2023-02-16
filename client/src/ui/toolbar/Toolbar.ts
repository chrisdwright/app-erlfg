import { App } from "../../App";
import { MapLayer } from "../../constants/CMap";
import { PlatformType } from "../../constants/PlatformType";
import { Button, Type } from "./Button";

export class Toolbar {

    private app: App;

    public containerDiv: HTMLDivElement;
    public buttons: Button[] = [];

    constructor(app: App) {
        this.app = app;

        this.app.event.data_updatedPlatform.register(this.data_updatedPlatform.bind(this));
        this.app.event.map_changedLayer.register(this.map_changedLayer.bind(this));

        this.init();
    }

    private init() {
        this.containerDiv = document.createElement("div");
        this.containerDiv.style.width = "260px";
        this.containerDiv.style.height = "60px";
        this.containerDiv.style.position = "absolute";
        this.containerDiv.style.padding = "0px 12px";
        this.containerDiv.style.left = "10px";
        this.containerDiv.style.top = "10px";
        this.containerDiv.style.zIndex = "1000";
        this.containerDiv.style.display = "flex";
        this.containerDiv.style.alignItems = "center";
        this.containerDiv.style.justifyContent = "space-around";
        this.containerDiv.style.backgroundImage = "url('images/toolbar/bg.jpg')";
        document.getElementById("wrapper").appendChild(this.containerDiv);

        this.buttons.push(new Button(this.app, this, Type.PC));
        this.buttons.push(new Button(this.app, this, Type.PLAYSTATION));
        this.buttons.push(new Button(this.app, this, Type.XBOX));
        this.buttons.push(new Button(this.app, this, Type.ABOVE));
        this.buttons.push(new Button(this.app, this, Type.BELOW));
    }

    private refresh() {
        const currentPlatform = this.app.data.platform;
        const currentLayer = this.app.map.layer;
        for (let i = 0; i < this.buttons.length; i++) {
            switch (this.buttons[i].type) {
                case Type.PC: this.buttons[i].toggleSelected(currentPlatform == PlatformType.PC); break;
                case Type.PLAYSTATION: this.buttons[i].toggleSelected(currentPlatform == PlatformType.PLAYSTATION); break;
                case Type.XBOX: this.buttons[i].toggleSelected(currentPlatform == PlatformType.XBOX); break;
                case Type.ABOVE: this.buttons[i].toggleSelected(currentLayer == MapLayer.ABOVE_GROUND); break;
                case Type.BELOW: this.buttons[i].toggleSelected(currentLayer == MapLayer.BELOW_GROUND); break;
            }
        }
    }

    private data_updatedPlatform() {
        this.refresh();
    }

    private map_changedLayer() {
        this.refresh();
    }

}