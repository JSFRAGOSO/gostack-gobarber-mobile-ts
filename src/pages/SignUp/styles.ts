import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 110px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const BackToLoginButton = styled.TouchableOpacity`
  position: absolute;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  left: 0;
  right: 0;
  bottom: 0;

  border-top-width: 1px;
  background: #312e38;
  border-color: #232129;
  padding: 16px 0;
`;

export const BackToLoginButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
