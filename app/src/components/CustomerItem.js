import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from 'react-native';
import Swipeout from 'react-native-swipeout';
import TouchableView from './TouchableView';
import CustomImage from './CustomImage'
import { TrashWhite, ProductHolder } from './imageUrls';
import { formatMoney } from '../utils/helpers';

/* Component ==================================================================== */
class CustomerItem extends React.PureComponent {

  onPress = () => {
    const { item, onItemClick } = this.props;
    onItemClick(item)
  }

  onDelete = () => {
    const { item, onDelete } = this.props;
    onDelete(item);
  }

  render(){
    const { item } = this.props;
    const { customerName, quantity, total, products } = item;

    const hasProducts = products && products.length > 0;

    const swipeoutBtns = [
      {
        component : (<RemoveButton />),
        onPress: this.onDelete,
        backgroundColor: 'transparent',
      }
    ]

    return (
      <Swipeout disabled={!hasProducts} autoClose backgroundColor={'#FFF'} right={swipeoutBtns}>
        <TouchableView onPress={this.onPress}>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.name}>{customerName}</Text>
              <Text style={styles.product}>{`${quantity} sản phẩm - ${formatMoney(total)} VNĐ`}</Text>
            </View>
            <View style={styles.imageWrap}>
              { hasProducts && (
                <CustomImage holder={ProductHolder} resizeMode="contain" source={{ uri: products[0].images[0] }} style={styles.image} />
              ) }
            </View>
          </View>
        </TouchableView>
      </Swipeout>
    )
  }
};

const RemoveButton = (props) => {
  return (
    <View style={styles.removeContent}>
      <Image resizeMode="contain" source={TrashWhite} style={styles.removeIcon} />
    </View>
  )
}
 
CustomerItem.propTypes = {
  item: PropTypes.object,
  onItemClick: PropTypes.func,
  onDelete: PropTypes.func,
};
CustomerItem.defaultProps = {
  item: {
    customerName: '',
    quantity: 0,
    total: 0,
  }
};
CustomerItem.componentName = 'CustomerItem';

/* Style */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    lineHeight: 19,
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#4c4c4c"
  },
  product: {
    lineHeight: 18,
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#8c8c8c"
  },
  imageWrap: {
    width: 48,
    height: 48,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeContent: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E96C9A'
  },
  removeIcon: {
    width: 24,
    height: 24,
  }

});
 
/* Export Component ==================================================================== */
export default CustomerItem;