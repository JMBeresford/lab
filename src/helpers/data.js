import oceanicHorizonImage from "../../public/img/experiments/oceanichorizon.png";
import cosmicplatformImage from "../../public/img/experiments/cosmicplatform.png";
import chaossphereImage from "../../public/img/experiments/chaossphere.png";
import skywalkerImage from "../../public/img/experiments/skywalker.png";
import srankjutsuImage from "../../public/img/experiments/srankjutsu.png";
import extradimensionalinputformImage from "../../public/img/experiments/extradimensionalinputform.png";
import placeholderImage from "@/img/icon.png";

export default function getData() {
  return [
    {
      name: "Work From Home",
      page: "WorkFromHome",
      image: placeholderImage.src,
      hudColor: "#ccccca",
      themeColor: "#5e3e5e",
    },
    {
      name: "Extra Dimensional Input Form",
      page: "ExtraDimensionalInputForm",
      image: extradimensionalinputformImage.src,
      hudColor: "#33333a",
      themeColor: "#bbbbff",
    },
    {
      name: "S Rank Jutsu",
      page: "SRankJutsu",
      image: srankjutsuImage.src,
      hudColor: "#ffffff",
      themeColor: "#3e3e3e",
    },
    {
      name: "Skywalker",
      page: "Skywalker",
      image: skywalkerImage.src,
      hudColor: "#ffffff",
      themeColor: "#3e3e3e",
    },
    {
      name: "Chaos Sphere",
      page: "ChaosSphere",
      image: chaossphereImage.src,
      hudColor: "#ffffff",
      themeColor: "#3e3e3e",
    },
    {
      name: "Oceanic Horizon",
      page: "OceanicHorizon",
      image: oceanicHorizonImage.src,
      hudColor: "#000000",
      themeColor: "#ffffff",
    },
    {
      name: "Cosmic Platform",
      page: "CosmicPlatform",
      image: cosmicplatformImage.src,
      hudColor: "#ffffff",
      themeColor: "#ff8888",
    },
  ];
}
