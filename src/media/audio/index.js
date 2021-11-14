import { importAll } from "../../scripts";

const sources = importAll(require.context("./", true, /\.(mp3)$/i));

const createAudio = (sources) => {
  return sources.map((src) => {
    const audio = new Audio(src);
    audio.setAttribute("controls", "controls");
    return { element: audio };
  });
};

export const audioFiles = createAudio(sources);

audioFiles[0].description = "Птички летом";
audioFiles[1].description = "Ручеёк в ущелье";
audioFiles[2].description = "Закат в лесу";
