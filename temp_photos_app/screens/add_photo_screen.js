import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // Icon,
  Image,
  // ImageBackground,
  // PermissionsAndroid,
  // NetInfo,
  // Button,
  // Picker,
  // ProgressBarAndroid
} from 'react-native';

import { Button, Icon, Input } from 'react-native-elements';
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { NavigationActions, withNavigation } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
// import NetInfo from "@react-native-community/netinfo";

// import GPSState from 'react-native-gps-state';


// // Permissions
// async function requestLocationPermission() {

//   try {

//     // const granted = await PermissionsAndroid.request(
//     const granted = await PermissionsAndroid.requestMultiple(

//       [

//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         // {
//         //   'title': 'Permiso para localización',
//         //   'message': 'Para entregarte el mejor servicio, necesitas darnos el permiso para acceder a tu posición actual'
//         // },

//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         // {
//         //   'title': 'Cool Photo App Camera Permission',
//         //   'message': 'Cool Photo App needs access to your camera '
//         // }

//       ]

//     )

//   } catch (err) {
//     console.warn(err)
//   }
// }

// ask for permissions
// requestLocationPermission();

class Add_Video extends Component {

  // hide nav bar
  static navigationOptions = {

    header: null,

  }

  //Constructor
  constructor(props) {

    super(props);

    // const location = this.props.navigation.state.params.location;

    // Alert.alert(String(this.props.navigation.state.params.location.id));

    // initial state
    this.state = {

      photo: null,

      // Default values
      delta_time: 3,
      name: 'default name',

    };

    this.add_video = this.add_video.bind(this);
    // Add select photo method
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  
  }

  // Select photo taped
  selectPhotoTapped() {

    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    // Take image
    // ImagePicker.showImagePicker(options, (response) => {
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        // Take image
        let source = response;

        // Set state
        this.setState({

          // Set state to photo
          photo: source,

        });
      }
    });
  }

  // manage click on button 
  add_video(){

    // Alert.alert(String(this.state.location.id));

    // // Update to real API
    const url_API = 'https://tempphoto.pythonanywhere.com/photos/';

    // // Crete form for post
    const form = new FormData();

    // // Add state
    form.append('delta_time', this.state.delta_time);
    form.append('name', this.state.name);

    // Get link
    const photo = this.state.photo ;

    // Flag variable
    var send = false;

    if(photo != null){

      send = true;

      // Add photo
      form.append('photo', {

          uri: this.state.photo.uri,
          type: this.state.photo.type,
          name: this.state.photo.fileName,
          data: this.state.photo.data,
          // danger_state: 'sin_control',

      });

    }

    // If link is null
    else{

      Alert.alert('You must to add a photo!');

    }

    // If send data
    if(send){

      // Send data to API
      fetch(url_API, {

          method: 'POST',

          body: form

        }).then((response) =>

          {
            Alert.alert('¡Your photo has been uploading successfuly!', 'Remember it will be removed in ' + this.state.delta_time + ' days!');

            // Go back to location details
            this.props.navigation.push("Home");

          })

        .catch((error) => {
          Alert.alert('Ups, we had an error, try it later!');
          console.error(String(error));
          // Alert.alert('get videos variable: ' + String(this.state.get_videos));
        }); 

    }

  }

  // Render method
  render() {

    return (

      <View style = {styles.container}>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

          <View
            style={[
              styles.avatar,
              styles.avatarContainer,
              { marginBottom: 20 },
            ]}
          >
            {

              this.state.photo === null 

              ? 

              (
                
                <Text style = {{textAlign: 'center', height: 100, backgroundColor: 'gray', color: 'white', fontSize: 30}}>

                  Subir foto

                </Text>

              ) 

              : 

              (
                <Image style={styles.avatar} source={this.state.photo} />
              )
            }

          </View>

        </TouchableOpacity>

        <Input
          maxLength={1000}
          onChangeText={(text) => this.setState({name: text})}
          placeholder='Agrega algún título'
        />

        <Input
          maxLength = {1000}
          onChangeText={(text) => this.setState({delta_time: text})}
          placeholder='Tiempo que durará la foto'
        />

        

        <Button

          // raised

          // title="Subir mi propio video"
          title = 'Subir mi foto'

          onPress = {this.add_video}

          buttonStyle={styles.buttonStyle}

          icon={
            <Icon
              name="camera"
              size={20}
              color="white"
              type = "font-awesome"
              iconStyle = {{margin: 10}}
            />
          }

          iconRight
          // buttonStyle = {{

          //   backgroundColor: "#3f5fe0",
          //   width: 300,
          //   height: 45,
          //   borderColor: "transparent",
          //   borderWidth: 0,
          //   margin: 30,
          //   borderRadius: 100

          // }}
        />

      </View>

    );

  }

}
const styles = StyleSheet.create({
  //  container_flex : {

  //   flex:1 ,
  //   justifyContent: 'center', 
  //   alignItems: 'center'
  // },
  avatarContainer: {
    borderColor: '#9B9B9B',
    // borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 50,
  },

  avatar: {
    borderRadius: 30,
    width: 300,
    height: 300,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  video: {
    marginTop: 50,
    maxHeight: 220,
    width: 320,
    flex: 1
  },
  buttonStyle: {
    backgroundColor: "blue",
    width: 300,
    height: 45,
    elevation: 10,
    // fontSize: 20,
    // borderColor: "transparent",
    // borderWidth: 0,
    borderRadius: 100,
    margin: 3,
    // borderColor: "red",

  },

});


export default withNavigation(Add_Video);