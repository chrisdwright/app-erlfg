import { App } from "../../../../App";
import { ContentType } from "../../../../constants/ContentType";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class AccountContent extends BaseContent {

  constructor(app: App, parent: Content) {
    super(app, parent, ContentType.ACCOUNT);

    this.init();
  }

  private init() {
    //this.containerDiv.style.backgroundColor = "red";
  }

}