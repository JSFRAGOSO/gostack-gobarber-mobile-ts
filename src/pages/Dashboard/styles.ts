import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  line-height: 28px;
`;
export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;
export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const Content = styled.View`
  padding: 0px 24px;
`;
export const ContentTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 25px;
  font-weight: 500;
  line-height: 33px;
  margin-top: 32px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)``;

export const ProviderContainer = styled.TouchableOpacity`
  background-color: #3e3b47;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  border-radius: 10px;
  padding: 20px 16px;
`;

export const ProviderAvatar = styled.Image`
  height: 72px;
  width: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 10px;
`;
export const ProviderName = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;
  margin-bottom: 12px;
`;
export const ProviderSchedule = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ProviderScheduleInfo = styled.Text`
  color: #999591;
  margin-left: 12px;
  margin-top: 6px;
  font-family: 'RobotoSlab-Regular';
`;
