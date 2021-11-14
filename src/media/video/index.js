import { importAll } from "../../scripts";

const sources = importAll(require.context("./", true, /\.(mp4)$/i));

const createVideo = (sources) => {
  return sources.map((src) => {
    const video = document.createElement("video");
    video.src = src;
    video.setAttribute("controls", "controls");
    return { element: video };
  });
};

export const videoFiles = createVideo(sources);

videoFiles[0].description = "Never gonna give you up";
videoFiles[1].description = "Морской прибой";
