import "./styles/index.scss";
import { images } from "./media";
import { audioFiles } from "./media";
import { Gallery } from "./scripts";
// const images = importAll(
//   require.context("./media/", true, /\.(png|svg|jpg|jpeg|gif)$/i)
// );
// const sounds = importAll(require.context("./media/", true, /\.(mp3)$/i));
// const videos = importAll(require.context("./media/", true, /\.(mp4)$/i));
const content = document.querySelector(".content");
const gallery = new Gallery("Галерея");
gallery.addItems(...images, ...audioFiles);

content.insertAdjacentElement("afterbegin", gallery.getElement());
