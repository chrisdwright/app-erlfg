import { App } from "../../../../App";
import { ContentType } from "../../../../constants/Constants";
import { TitleBox } from "../../components/TitleBox";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class ChatContent extends BaseContent {

  constructor(app: App, parent: Content) {
    super(app, parent, ContentType.CHAT);

    this.init();
  }

  private init() {
    new TitleBox(this.app, this.containerDiv, "Communication");
  }

}