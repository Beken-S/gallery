import "./styles/index.scss";
import { images } from "./media";
import { audioFiles } from "./media";
import { videoFiles } from "./media";
import { Gallery } from "./scripts";

const content = document.querySelector(".content");
const gallery = new Gallery("Галерея");
gallery.addItems(...images, ...audioFiles, ...videoFiles);
content.insertAdjacentElement("afterbegin", gallery.getElement());
