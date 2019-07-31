import React, { Component } from 'react';
import {
  Alert,
  // Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  // ImageBackground,
  // PermissionsAndroid,
  // NetInfo,
  // Button,
  // Picker,
  // ProgressBarAndroid,
  Linking,
  FlatList,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import ImageZoom from 'react-native-image-pan-zoom';

class Photo_Details extends Component {

  // hide nav bar
  static navigationOptions = {

    header: null,

  }

  //Constructor
  constructor(props) {

    super(props);

    this.state = {

      // place
      photo:this.props.navigation.state.params.photo,

    };
  
  }


  // Render method
  render() {

    return (

      <View>

        <Text style = {{fontSize: 30, textAlign: 'center'}}>

          {this.state.photo.name}

        </Text>

        <Text>
          Creation:  

          {this.state.photo.date}

        </Text>

        <Text>

          Delta time: 

          {this.state.photo.delta_time}

        </Text>

        <ImageZoom 
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={300}
          imageHeight={300}
        >

          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: this.state.photo.photo}}
          />

        </ImageZoom>

      </View>

    );

  }

}

const styles = StyleSheet.create({

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

})

export default withNavigation(Photo_Details);