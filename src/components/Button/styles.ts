import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;
  margin-top: 20px;
  background-color: #ff9900;
  border: 0;
  border-radius: 10px;
  color: #312e38;
  font-weight: 500;
  padding: 0 16px;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;
