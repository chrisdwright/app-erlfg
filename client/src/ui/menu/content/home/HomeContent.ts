import { App } from "../../../../App";
import { ContentType } from "../../../../constants/Constants";
import { Marker } from "../../../../map/markers/Marker";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class HomeContent extends BaseContent {

  constructor(app: App, parent: Content) {
    super(app, parent, ContentType.HOME);

    this.init();
  }

  public setMarker(marker: Marker) {

  }

  private init() {
    //this.containerDiv.style.backgroundColor = "white";
  }

}