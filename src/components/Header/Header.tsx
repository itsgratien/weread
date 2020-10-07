import React, { FC } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logout, RootState } from '../../redux';
import { styles } from './styles';
import { wereadBlack, avatar } from '../../assets';
import { User } from '../../repos';
interface Props {
  logout: typeof logout;
  user?: User;
}

const Header: FC<Props> = (props) => {
  const { logout, user } = props;

  return (
    <Layout style={styles.headerView}>
      {user && user.profilePicture ? (
        <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
      ) : (
        <Image source={avatar} style={styles.avatar} />
      )}
      <Image source={wereadBlack} style={styles.logo} />
      <TouchableOpacity style={styles.logout} onPress={() => logout()}>
        <Ionicons name='ios-power' size={30} color='black' />
      </TouchableOpacity>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { user } = state.Auth;
  return { user };
};
export default connect(mapStateToProps, { logout })(Header);
