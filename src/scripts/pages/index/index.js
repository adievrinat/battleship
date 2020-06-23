import header from "../../../blocks/header/template";

const generateIndexPage = () => {
  document.getElementById("root__index").innerHTML =
    header;
};

export default generateIndexPage;