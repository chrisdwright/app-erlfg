import { EventListener } from "./EventListener";

export class EventManager {

  public network_connected = new EventListener();
  public network_signedIn = new EventListener();

  public data_updatedPlatform = new EventListener();
  public data_updatedMarkerId = new EventListener();

  public request_receivedList = new EventListener();
  public request_addedRequest = new EventListener();
  public request_removedRequest = new EventListener();

  public map_clickedMap = new EventListener();
  public map_clickedMarker = new EventListener();

  public menu_clickedTab = new EventListener();

}