/**
 * Photograph credits. Every photo on the public site comes from Wikimedia
 * Commons under the licence shown; CC BY and CC BY-SA require this
 * attribution. Photos were resized and converted to WebP (a change the
 * licences ask us to state). Add a row whenever a photo is added.
 */
export type Credit = {
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
};

export const IMAGE_CREDITS: Credit[] = [
  {
    file: "/img/dal.webp",
    title: "Dal Lake Hazratbal Srinagar.jpg",
    author: "Suhail Skindar Sofi",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File%3ADal_Lake_Hazratbal_Srinagar.jpg",
  },
  {
    file: "/img/gulmarg.webp",
    title: "Gulmarg - Jannat on Earth.jpg",
    author: "Vikas Panwar",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File%3AGulmarg_-_Jannat_on_Earth.jpg",
  },
  {
    file: "/img/pahalgam.webp",
    title: "Pahalgam Valley.jpg",
    author: "KennyOMG",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File%3APahalgam_Valley.jpg",
  },
  {
    file: "/img/sonamarg.webp",
    title: "Sonmarg - Paradise.jpg",
    author: "Mohammad Iliyas khanday",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File%3ASonmarg_-_Paradise.jpg",
  },
  {
    file: "/img/doodhpathri.webp",
    title: "Doodhpathri southwest Jammu Kashmir India (2).jpg",
    author: "Ankur P from Pune, India",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    source: "https://commons.wikimedia.org/wiki/File%3ADoodhpathri_southwest_Jammu_Kashmir_India_%282%29.jpg",
  },
  {
    file: "/img/gurez.webp",
    title: "Gurez Valley 01.jpg",
    author: "Journo Mohsin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File%3AGurez_Valley_01.jpg",
  },
  {
    file: "/img/ladakh.webp",
    title: "Late afternoon at the Pangong Tso (10035239163).jpg",
    author: "Fulvio Spada from Torino, Italy",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    source: "https://commons.wikimedia.org/wiki/File%3ALate_afternoon_at_the_Pangong_Tso_%2810035239163%29.jpg",
  },
  {
    file: "/img/goldentriangle.webp",
    title: "Aks The Reflection Taj Mahal.jpg",
    author: "Antrix3",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File%3AAks_The_Reflection_Taj_Mahal.jpg",
  },
  {
    file: "/img/pilgrim.webp",
    title: "Amaranth Cave.jpg",
    author: "Spsarvana",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File%3AAmaranth_Cave.jpg",
  },
];
