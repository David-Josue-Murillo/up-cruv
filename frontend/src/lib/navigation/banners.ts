import carousel01 from "@/assets/images/carousel_01.webp";
import bannerImg from "@/assets/images/banner.webp";
import admisionImg from "@/assets/images/admision.webp";
import type { Banner } from "../../types/types";

export const banners: Banner[] = [
  {
    id: "1",
    image: carousel01.src,
    title: "Bienvenido al Centro Regional Universitario de Veraguas",
    description: "Formando profesionales con excelencia académica desde 1984",
    link: "/nosotros/historia",
  },
  {
    id: "2",
    image: bannerImg.src,
    title: "Admisión 2026 Abierta",
    description: "Inscríbete ahora y sé parte de la Universidad de Panamá",
    link: "/admision",
  },
  {
    id: "3",
    image: admisionImg.src,
    title: "Programas de Postgrado",
    description: "Especializaciones y maestrías para tu desarrollo profesional",
    link: "/oferta-academica/postgrado",
  },
];
