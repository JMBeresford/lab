import { Text } from '@react-three/drei';
import fontPath from '../../../fonts/MajorMonoDisplay.ttf';

const HeaderText = () => {
  return (
    <Text
      text='experiments'
      font={fontPath}
      position={[0, 3.25, -0.5]}
      color='black'
      fontSize={0.75}
    />
  );
};

export default HeaderText;
