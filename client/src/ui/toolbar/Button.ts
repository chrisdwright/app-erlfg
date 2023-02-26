import { App } from "../../App";
import { MapLayer, PlatformType } from "../../constants/Constants";
import { Toolbar } from "./Toolbar";

export enum Type {
  PC, PLAYSTATION, XBOX, ABOVE, BELOW
}

export class Button {

  private app: App;
  private toolbar: Toolbar;
  public type: Type;

  public containerDiv: HTMLDivElement;
  public platformLogo: HTMLImageElement;

  constructor(app: App, toolbar: Toolbar, type: Type) {
    this.app = app;
    this.toolbar = toolbar;
    this.type = type;

    this.init();
  }

  public toggleSelected(isSelected: boolean) {
    this.containerDiv.style.opacity = isSelected ? "1" : "0.5";
  }

  private init() {
    let filename: string;
    let width: number;
    let height: number;
    let left: number = 150;
    switch (this.type) {
      case Type.PC:
        filename = "pc.png";
        width = 30;
        height = 30;
        left = 20;
        break;
      case Type.PLAYSTATION:
        filename = "playstation.png";
        width = 39;
        height = 30;
        left = 60;
        break;
      case Type.XBOX:
        filename = "xbox.png";
        width = 30;
        height = 30;
        left = 110;
        break;
      case Type.ABOVE:
        filename = "above.png";
        width = 30;
        height = 30;
        left = 173;
        break;
      case Type.BELOW:
        filename = "below.png";
        width = 30;
        height = 30;
        left = 217;
        break;
    }

    this.containerDiv = document.createElement("div");
    this.containerDiv.style.position = "absolute";
    this.containerDiv.style.left = left + "px";
    this.containerDiv.style.width = width + "px";
    this.containerDiv.style.height = height + "px";
    this.containerDiv.style.cursor = "pointer";
    this.containerDiv.style.backgroundImage = "url('images/toolbar/" + filename + "')";
    this.toolbar.containerDiv.appendChild(this.containerDiv);

    this.containerDiv.addEventListener("pointerdown", (ev) => {
      switch (this.type) {
        case Type.PC: this.app.net.network.selectPlatform(PlatformType.PC); break;
        case Type.PLAYSTATION: this.app.net.network.selectPlatform(PlatformType.PLAYSTATION); break;
        case Type.XBOX: this.app.net.network.selectPlatform(PlatformType.XBOX); break;
        case Type.ABOVE: this.app.map.layers.setLayer(MapLayer.ABOVE_GROUND); break;
        case Type.BELOW: this.app.map.layers.setLayer(MapLayer.BELOW_GROUND); break;
      }
    });
  }

}