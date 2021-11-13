import "./styles/styles.scss";
import { images } from "./media";
import { Gallery } from "./scripts/gallery.js";
// const images = importAll(
//   require.context("./media/", true, /\.(png|svg|jpg|jpeg|gif)$/i)
// );
// const sounds = importAll(require.context("./media/", true, /\.(mp3)$/i));
// const videos = importAll(require.context("./media/", true, /\.(mp4)$/i));
const content = document.querySelector(".wrapper__content .container");
const gallery = new Gallery("Галерея");
gallery.addItems(...images);

content.insertAdjacentElement("afterbegin", gallery.getElement());
