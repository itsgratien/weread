import React, { FC } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logout, RootState } from '../../redux';
import { styles } from './styles';
import { wereadBlack } from '../../assets';

interface Props {
  logout: typeof logout;
}

const sampleImage =
  'https://lh3.googleusercontent.com/a-/AOh14GhRhFDnwC9iQVpcePYJD5KOexy2gXMAEorkX6CYcw';
const Header: FC<Props> = (props) => {
  const { logout } = props;
  return (
    <Layout style={styles.headerView}>
      <Image source={{ uri: sampleImage }} style={styles.avatar} />
      <Image source={wereadBlack} style={styles.logo} />
      <TouchableOpacity style={styles.logout} onPress={() => logout()}>
        <Ionicons name='ios-power' size={30} color='black' />
      </TouchableOpacity>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const {} = state.Auth;
  return {};
};
export default connect(mapStateToProps, { logout })(Header);
