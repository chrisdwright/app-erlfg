import { PlatformType } from "../../constants/PlatformType";
import { Platform } from "./Platform";

export class Button {

  private platform: Platform;
  public type: PlatformType;

  public containerDiv: HTMLDivElement;
  public platformLogo: HTMLImageElement;

  public isAppended: boolean = false;

  constructor(platform: Platform, type: PlatformType) {
    this.platform = platform;
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
    switch (this.type) {
      case PlatformType.PC:
        filename = "pc.png";
        width = 30;
        height = 30;
        break;
      case PlatformType.PLAYSTATION:
        filename = "playstation.png";
        width = 39;
        height = 30;
        break;
      case PlatformType.XBOX:
        filename = "xbox.png";
        width = 30;
        height = 30;
        break;
    }

    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = width + "px";
    this.containerDiv.style.height = height + "px";
    this.containerDiv.style.cursor = "pointer";
    this.containerDiv.style.backgroundImage = "url('images/platform/" + filename + "')";
    this.platform.containerDiv.appendChild(this.containerDiv);

    this.containerDiv.addEventListener("pointerdown", (ev) => {
      this.platform.selectPlatform(this.type);
    });
  }

}