export interface GetGeneralSettingsResponse {
  condominiumName: string;
  condominiumDescription: string;
  condominiumAddress: string;
  condominiumPhone: string;
  condominiumCoexistenceManualPath: string;
  homePageBackgroundImagePath: string;
}

export interface UpdateGeneralSettingsRequest {
  condominiumName: string;
  condominiumDescription: string;
  condominiumAddress: string;
  condominiumPhone: string;
}

export interface GeneralSettingsModel {
  condominiumName: string;
  condominiumDescription: string;
  condominiumAddress: string;
  condominiumPhone: string;
  condominiumCoexistenceManualPath?: string;
  homePageBackgroundImagePath?: string;
}
