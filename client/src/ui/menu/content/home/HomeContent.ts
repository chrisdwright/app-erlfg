import { App } from "../../../../App";
import { ContentType } from "../../../../constants/Constants";
import { RD_Request } from "../../../../data/RequestData";
import { RequestBox } from "../../components/RequestBox";
import { TitleBox } from "../../components/TitleBox";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class HomeContent extends BaseContent {

  public requestsDiv: HTMLDivElement;
  public requestBoxes: RequestBox[] = [];

  constructor(app: App, parent: Content) {
    super(app, parent, ContentType.HOME);

    app.event.request_receivedList.register(this.request_receivedList.bind(this));
    app.event.request_addedRequest.register(this.request_addedRequest.bind(this));
    app.event.request_removedRequest.register(this.request_removedRequest.bind(this));

    this.init();
  }

  private init() {
    new TitleBox(this.app, this.containerDiv, "Latest Requests");

    this.requestsDiv = document.createElement("div");
    this.requestsDiv.style.paddingBottom = "10px"
    this.requestsDiv.style.display = "flex";
    this.requestsDiv.style.flexDirection = "column";
    this.requestsDiv.style.flexGrow = "1";
    this.requestsDiv.style.alignItems = "center";
    this.requestsDiv.style.overflowY = "auto";
    this.containerDiv.appendChild(this.requestsDiv);

    //const debug = new RD_Request([25, 111, 0, 0, 1677481081863, "calmzebra3843"]);
    //for (let i = 0; i < 20; i++)
    //  new RequestBox(this.app, this.requestsDiv, debug);
  }

  private request_receivedList() {
    const requests = this.app.data.requests.requests.slice().sort((a, b) => { return a.timestamp - b.timestamp });
    for (let i = 0; i < requests.length; i++)
      this.requestBoxes.push(new RequestBox(this.app, this.requestsDiv, requests[i]));
  }

  private request_addedRequest(request: RD_Request) {
    this.requestBoxes.push(new RequestBox(this.app, this.requestsDiv, request));
  }

  private request_removedRequest(requestId: number) {
    for (let i = 0; i < this.requestBoxes.length; i++)
      if (this.requestBoxes[i].isRequest(requestId))
        this.requestBoxes[i].destroy();
  }

}
