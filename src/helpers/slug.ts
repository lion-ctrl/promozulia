export const slug = (str: string) => {
  return str
    .replaceAll(" ", "-")
    .replaceAll(",", "")
    .replace(/á|é|í|ó|ú/gi, (letter: string) => {
      if (letter === "á") return "a";
      if (letter === "é") return "e";
      if (letter === "í") return "i";
      if (letter === "ó") return "o";
      if (letter === "ú") return "u";
      return "";
    })
    .toLowerCase();
};
