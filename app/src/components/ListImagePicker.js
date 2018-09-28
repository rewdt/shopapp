import React from 'react';
import PropTypes from 'prop-types';
import { ImagePicker, Permissions } from 'expo';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AvatarPicker from './AvatarPicker';
import RemovableImage from './RemovableImage';
import { PickAvatarIcon, EditIcon } from './imageUrls';

/* Component ==================================================================== */
class ListImagePicker extends React.PureComponent {
  
  constructor(props){
    super(props);
    this.state = {
      images: [],
    }
  }

  onPickedImage = (base64, uri) => {
    this.setState({
      images: [...this.state.images, ...[{
        id: new Date().getTime(),
        url: uri,
        base64,
      }]]
    }, () => {
      const imagesList = this.state.images.map(item => `data:image/jpeg;base64,${item.base64}`);
      this.props.onImagesChange(imagesList);
    })
  }

  onRemoveImage = (id) => {
    const newArray = this.state.images.filter(item => item.id !== id);
    this.setState({ images: newArray });
  }

  render(){
    return (
      <View style={styles.container}>
        {
          this.state.images.map((item) => (
            <RemovableImage onRemove={this.onRemoveImage} key={`image-${item.id}`} {...item} />
          ))
        }
        <AvatarPicker isAvatarPicker={false} onPickedImage={this.onPickedImage} />
      </View>
    )
  }
};
 
ListImagePicker.propTypes = {
};
ListImagePicker.defaultProps = {
  
};
ListImagePicker.componentName = 'ListImagePicker';

/* Style */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
});
 
/* Export Component ==================================================================== */
export default ListImagePicker;