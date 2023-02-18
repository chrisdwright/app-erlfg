export class Constants {

  public static GUEST_SECONDS_TO_EXPIRY = 604800;

  public static PATH_TO_SHARED = "../../../../../xampp/htdocs/shared/farmsim/";

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