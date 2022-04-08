import oceanicHorizonImage from '../../public/img/experiments/oceanichorizon.png';
import cosmicplatformImage from '../../public/img/experiments/cosmicplatform.png';
import chaossphereImage from '../../public/img/experiments/chaossphere.png';
import placeholderImage from '@/img/icon.png';

export default function getData() {
  return [
    {
      name: 'Chaos Sphere',
      page: 'ChaosSphere',
      image: chaossphereImage.src,
      hudColor: '#ffffff',
      themeColor: '#6633aa',
    },
    {
      name: 'Oceanic Horizon',
      page: 'OceanicHorizon',
      image: oceanicHorizonImage.src,
      hudColor: '#000000',
      themeColor: '#ffffff',
    },
    {
      name: 'Cosmic Platform',
      page: 'CosmicPlatform',
      image: cosmicplatformImage.src,
      hudColor: '#ffffff',
      themeColor: '#ff8888',
    },
  ];
}
