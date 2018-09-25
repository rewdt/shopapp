import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import StaffItem from '../components/StaffItem';
import { Hamburger, PlusIcon } from '../components/imageUrls';

import { getStaffsFromApi } from '../actions/staffs';

class StaffsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Nhân viên',
    headerLeft: (
      <TouchableOpacity>
        <Image
          style={{ width: 16, height: 16, marginLeft: 16 }}
          source={Hamburger}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateStaff', { user: {}, isEdit: false })}>
        <Image
          style={{ width: 16, height: 16, marginRight: 16 }}
          source={PlusIcon}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getStaffsFromApi();
  }

  onItemPress = (staff) => {
    this.props.navigation.navigate('StaffDetail', { userId: staff.id });
  }

  renderStaffItem = ({ item }) => (
    <StaffItem onItemPress={this.onItemPress} staff={item} />
  )

  keyExtractor = (item) => `staff-${item.id}`;

  onRefresh = () => {
    this.props.getStaffsFromApi();
  }

  render() {
    const { loading, error, staffs } = this.props;

    return (
      <View style={styles.container}>
        <SearchBar placeholder="Tìm kiếm" />
        <FlatList
          data={staffs}
          renderItem={this.renderStaffItem}
          keyExtractor={this.keyExtractor}
          style={styles.list}
          ItemSeparatorComponent={Divider}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    )
  }
}

const Divider = () => (
  <View style={styles.divider} />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 27,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginTop: 10,
    marginBottom: 10,
  }
})

const mapStateToProps = (state) => ({
  loading: state.Staffs.loading,
  error: state.Staffs.loading,
  staffs: state.Staffs.data,
});

const mapDispatchToProps = {
  getStaffsFromApi,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StaffsScreen);