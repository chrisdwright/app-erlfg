import { App } from "../../../App";
import { ContentType } from "../../../constants/Constants";
import { Menu } from "../Menu";
import { AccountContent } from "./account/AccountContent";
import { BaseContent } from "./BaseContent";
import { ChatContent } from "./chat/ChatContent";
import { FeedbackContent } from "./feedback/FeedbackContent";
import { GraceContent } from "./grace/GraceContent";
import { HomeContent } from "./home/HomeContent";

enum ContentState {
  OPENING, OPEN, CLOSING, CLOSED
}

export class Content {

  private app: App;
  private menu: Menu;
  private state: ContentState = ContentState.CLOSED;

  public containerDiv: HTMLDivElement;
  public contents: BaseContent[] = [];
  public current: BaseContent;

  constructor(app: App, menu: Menu) {
    this.app = app;
    this.menu = menu;

    this.init();
    this.setContent(ContentType.HOME);
  }

  public open() {
    if (this.state != ContentState.CLOSED) return;
    this.state = ContentState.OPENING;
    this.containerDiv.style.width = "392px";
  }

  public close() {
    if (this.state != ContentState.OPEN) return;
    this.state = ContentState.CLOSING;
    this.containerDiv.style.width = "0px";
  }

  public setContent(type: ContentType) {
    if (this.current && this.current.type == type) return;
    if (this.current && this.current.type != type)
      this.current.remove();

    this.current = this.getContentByType(type);
    this.current.refresh();
    this.current.append();
  }

  public getCurrentContentType() {
    return this.current.type;
  }

  public isOpen() {
    return this.state == ContentState.OPEN;
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.width = "0px";
    this.containerDiv.style.height = "100%";
    //this.containerDiv.style.backgroundColor = "black";
    this.containerDiv.style.transition = "width 0.5s";
    this.containerDiv.style.pointerEvents = "auto";
    this.containerDiv.style.overflow = "hidden";
    this.containerDiv.style.backgroundImage = "url('images/menu/bg.jpg')";
    this.menu.containerDiv.appendChild(this.containerDiv);

    this.contents.push(new HomeContent(this.app, this));
    this.contents.push(new GraceContent(this.app, this));
    this.contents.push(new ChatContent(this.app, this));
    this.contents.push(new FeedbackContent(this.app, this));
    this.contents.push(new AccountContent(this.app, this));

    this.containerDiv.addEventListener("transitionend", () => {
      if (this.state == ContentState.OPENING)
        this.state = ContentState.OPEN;
      if (this.state == ContentState.CLOSING)
        this.state = ContentState.CLOSED;
    });
  }

  private getContentByType(type: ContentType) {
    for (var i = 0; i < this.contents.length; i++)
      if (this.contents[i].type == type)
        return this.contents[i];
    return null;
  }

}