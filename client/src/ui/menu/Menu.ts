import { App } from "../../App";
import { ContentType } from "../../constants/ContentType";
import { Marker } from "../../map/Marker";
import { Content } from "./content/Content";
import { Tabs } from "./tabs/Tabs";

export class Menu {

  private app: App;

  public containerDiv: HTMLDivElement;
  public tabs: Tabs;
  public content: Content;

  constructor(app: App) {
    this.app = app;
    this.app.event.menu_clickedTab.register(this.menu_onClickedTab.bind(this));
    this.app.event.map_clickedMap.register(this.map_onClickedMap.bind(this));
    this.app.event.map_clickedMarker.register(this.map_onClickedMarker.bind(this));

    this.init();
  }

  private init() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.style.position = "absolute";
    this.containerDiv.style.right = "0px";
    this.containerDiv.style.top = "0px";
    this.containerDiv.style.bottom = "0px";
    this.containerDiv.style.zIndex = "1000";
    this.containerDiv.style.display = "flex";
    this.containerDiv.style.pointerEvents = "none";
    document.getElementById("wrapper").appendChild(this.containerDiv);

    this.tabs = new Tabs(this.app, this);
    this.content = new Content(this.app, this);
  }

  public menu_onClickedTab(type: ContentType) {
    var currentType = this.content.getCurrentContentType();

    this.tabs.setSelected(type);
    this.content.setContent(type);

    if (this.content.isOpen()) {
      if (type == currentType)
        this.content.close();
    } else {
      this.content.open();
    }
  }

  private map_onClickedMap() {
    this.content.close();
  }

  private map_onClickedMarker(marker: Marker) {
    this.tabs.setSelected(ContentType.GRACE);
    this.content.setContent(ContentType.GRACE);
    this.content.open();
  }

}