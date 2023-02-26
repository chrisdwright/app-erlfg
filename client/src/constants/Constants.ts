export class Constants {

  public static PATH_TO_SHARED = "../../shared/";

  // local storage
  public static LS_LAST_PLATFORM = "lastPlatform";
  public static LS_LAST_ACCOUNT_TYPE = "lastAccountType";

}

export enum AccountType {
  GUEST, EMAIL, GOOGLE, FACEBOOK, TWITCH, APPLE, STEAM
}

export enum PlatformType {
  PC, PLAYSTATION, XBOX
}

export enum RequestType {
  AREA, BOSS, AREA_AND_BOSS, DUEL
}

export enum ModeType {
  IDLE, REQUEST, ASSIST
}

export enum MapLayer {
  ABOVE_GROUND, BELOW_GROUND
}

export enum MarkerLayer {
  NONE, ACTIVE, ABOVE_IDLE, BELOW_IDLE
}

export enum ContentType {
  HOME, GRACE, CHAT, FEEDBACK, ACCOUNT, ABOUT
}