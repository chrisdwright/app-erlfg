import { App } from "../../../../App";
import { ContentType } from "../../../../constants/ContentType";
import { Marker } from "../../../../map/Marker";
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