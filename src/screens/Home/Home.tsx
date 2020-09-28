import React, { FC, useEffect } from 'react';
import { Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { RootState, logout } from '../../redux';
import { connect } from 'react-redux';
import { Routes } from '../../utils/Routes';
import { Loading, Layout } from '../../components';

interface Props {
  isAuthenticated?: boolean;
  logout: typeof logout;
  loading?: boolean;
}
const Home: FC<Props> = (props) => {
  const { logout, isAuthenticated, loading } = props;

  const { navigate } = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.SocialAuth);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Text>Welcome home</Text>
      <Button onPress={() => logout()}>Logout</Button>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { isAuthenticated, loading } = state.Auth;

  return { isAuthenticated, loading };
};
export default connect(mapStateToProps, { logout })(Home);
