import {
  BusinessIdea,
  Chemistry,
  CityHall,
  Cow,
  Cultivation,
  Education,
  Electricity,
  Handshake,
  Health,
  Hierarchy,
  Island,
  MagnifyingGlass,
  MagnifyingGlassWithTwoArrows,
  PCWithGraphics,
  SellCompany,
} from "components/Icons";

export const autoCarouselData = {
  backgroundImages: [
    "/assets/img/bridge.jpg",
    "/assets/img/pumping-unit.jpg",
    "/assets/img/cattle.jpg",
    "/assets/img/electric-pole.jpg",
  ],
  content: [
    { title: `PROMOZULIA`, type: "h1" },
    {
      type: "h3",
      title: `Apoyamos el impulso al sector petrolero, promoviendo iniciativas desde el
            sector educación.`,
      text: `Promovemos la generación de nuevas y renovadas
            oportunidades de estudio medio y avanzado, con el fin de aumentar la oferta
            de mano de obra calificada, necesaria para el crecimiento del sector.`,
    },
    {
      type: "h3",
      title: `Impulsamos el uso de tecnologías emergentes de primer orden.`,
      text: `Con el fin de dar a conocer las oportunidades de uso en el sector agroindustrial. Drones, IoT,
            Big Data, son solo algunas de estas tecnologías que al corto plazo serán
            necesarias en el sector agroindustrial.`,
    },
    {
      type: "h3",
      title: `Ante la crisis energética.`,
      text: `Impulsamos proyectos relacionados con energías
            alternativas, con las cuales aportamos soluciones viables para el sector
            eléctrico, a su vez que generamos conciencia en el uso de la energía.`,
    },
  ],
};

export const cardInfo = [
  {
    Icon: MagnifyingGlass,
    content: "Análisis",
  },
  {
    Icon: MagnifyingGlassWithTwoArrows,
    content: "Determinación",
  },
  {
    Icon: Hierarchy,
    content: "Construción",
  },
  {
    Icon: Handshake,
    content: "Terminos de contrato",
  },
];

export const sectorsData = [
  {
    Icon: SellCompany,
    content: "Exploración y producción",
    viewBox: "0 0 256 256",
  },
  {
    Icon: PCWithGraphics,
    content: "Tecnologia e Información",
    viewBox: "0 0 30 30",
  },
  {
    Icon: CityHall,
    content: "Gobierno electrónico",
    viewBox: "0 0 50 50",
  },
  {
    Icon: Education,
    content: "Educación",
    viewBox: "0 0 50 50",
  },
  {
    Icon: Island,
    content: "Turismo",
    viewBox: "0 0 500 500",
  },
  {
    Icon: Health,
    content: "Salud",
    viewBox: "0 0 35 35",
  },
  {
    Icon: Chemistry,
    content: "Petroquímca",
    viewBox: "0 0 247.038 247.038",
  },
  {
    Icon: Cow,
    content: "Agronomía",
    viewBox: "0 0 511.999 511.999",
  },
  {
    Icon: Cultivation,
    content: "Refinación",
    viewBox: "0 0 165.878 165.878",
  },
  {
    Icon: Electricity,
    content: "Hídricas y Electricidad",
    viewBox: "0 0 50 50",
  },
  {
    Icon: BusinessIdea,
    content: "Modernización empresarial",
    viewBox: "0 0 500 500",
  },
];
