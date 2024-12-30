import { NativeModules, Platform } from "react-native";
import { AndroidColors, ImageColorResult } from "./types";

const { RNDominantColor } = NativeModules;

export const getColorFromURL: (url: string) => Promise<ImageColorResult> = (
  url
) => {
  if (Platform.OS == "ios") {
    return new Promise<ImageColorResult>((resolve, reject) => {
      RNDominantColor.getColorFromURL(
        url,
        (
          primary: string,
          secondary: string,
          background: string,
          detail: string
        ) => {
          resolve({
            primary,
            secondary,
            background,
            detail,
          });
        }
      );
    });
  }

  return new Promise<ImageColorResult>((resolve, reject) => {
    RNDominantColor.colorsFromUrl(url)
      .then((colors: AndroidColors) => {
        resolve({
          primary: colors.dominantColor,
          secondary: colors.averageColor,
          background: colors.lightVibrantColor,
          detail: colors.vibrantColor,
        });
      })
      .catch((err: unknown) => {
        reject({
          primary: "#00000000",
          secondary: "#00000000",
          background: "#00000000",
          detail: "#00000000",
        });
      });
  });
};
