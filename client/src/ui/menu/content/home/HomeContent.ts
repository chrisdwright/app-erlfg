import { App } from "../../../../App";
import { ContentType } from "../../../../constants/Constants";
import { RD_Request } from "../../../../data/RequestData";
import { Marker } from "../../../../map/markers/Marker";
import { RequestBox } from "../../components/RequestBox";
import { TitleBox } from "../../components/TitleBox";
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
    new TitleBox(this.app, this.containerDiv, "Latest Requests");

    const debug = new RD_Request([25, 111, 0, 0, 1677481081863, "calmzebra3843"]);
    new RequestBox(this.app, this.containerDiv, debug);
    new RequestBox(this.app, this.containerDiv, debug);
    new RequestBox(this.app, this.containerDiv, debug);
  }

}