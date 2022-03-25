import oceanicHorizonImage from '@/img/experiments/oceanichorizon.png';
import cosmicplatformImage from '@/img/experiments/cosmicplatform.png';

export default function getData() {
  return [
    {
      name: 'Oceanic Horizon',
      page: 'OceanicHorizon',
      image: oceanicHorizonImage.src,
      hudColor: '#000000',
    },
    {
      name: 'Cosmic Platform',
      page: 'CosmicPlatform',
      image: cosmicplatformImage.src,
      hudColor: '#ffffff',
    },
  ];
}
