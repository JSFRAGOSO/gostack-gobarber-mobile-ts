import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 30px 110px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const GoBackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const LogoutButton = styled.TouchableOpacity``;

export const UserAvatarButton = styled.TouchableOpacity``;
export const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 32px;
  align-self: center;
`;
