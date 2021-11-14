import { importAll } from "../../scripts";

const sources = importAll(
  require.context("./", true, /\.(png|svg|jpg|jpeg|gif)$/i)
);

const createImages = (sources) => {
  return sources.map((src) => {
    const img = new Image();
    img.src = src;
    return { element: img };
  });
};

export const images = createImages(sources);

images[0].description = "Мельница у реки";
images[1].description = "Горы осенью";
images[2].description = "Деревня летом";
images[3].description = "Анимированный котик";
