import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
`;

export const DescriptionContainer = styled.View`
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;
export const Description = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

export const OkButton = styled.TouchableOpacity`
  background-color: #ff9000;
  width: 100px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 40px;
`;
export const OkButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
`;
