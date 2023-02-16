import { App } from "../../App";
import { PlatformType } from "../../constants/PlatformType";
import { Button } from "./Button";

export class Platform {

  private app: App;

  public containerDiv: HTMLDivElement;
  public buttons: Button[] = [];

  constructor(app: App) {
    this.app = app;

    this.app.event.data_updatedPlatform.register(this.data_onUpdatedPlatform.bind(this));

    this.init();
  }

  public selectPlatform(platform: PlatformType) {
    this.app.net.selectPlatform(platform);
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = "160px";
    this.containerDiv.style.height = "60px";
    this.containerDiv.style.position = "absolute";
    this.containerDiv.style.padding = "0px 12px";
    this.containerDiv.style.left = "10px";
    this.containerDiv.style.top = "10px";
    this.containerDiv.style.zIndex = "1000";
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.alignItems = "center";
    this.containerDiv.style.justifyContent = "space-around";
    this.containerDiv.style.backgroundImage = "url('images/platform/bg.jpg')";
    document.getElementById("wrapper").appendChild(this.containerDiv);

    this.buttons.push(new Button(this, PlatformType.PC));
    this.buttons.push(new Button(this, PlatformType.PLAYSTATION));
    this.buttons.push(new Button(this, PlatformType.XBOX));
  }

  private data_onUpdatedPlatform() {
    // updating buttons
    const platform = this.app.data.platform;
    for (let i = 0; i < this.buttons.length; i++)
      this.buttons[i].toggleSelected(this.buttons[i].type == platform);

    // adding platform panel first time
    const cont = document.getElementById("wrapper");
    if (!cont.contains(this.containerDiv))
      cont.appendChild(this.containerDiv);
  }

}