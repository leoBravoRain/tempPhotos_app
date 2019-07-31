import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  // Image,
  ImageBackground,
  // PermissionsAndroid,
  // NetInfo,
  // Button,
  Picker,
  ProgressBarAndroid,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { Button } from 'react-native-elements';
import { NavigationActions, withNavigation } from 'react-navigation';
import { Card } from 'react-native-elements';

class Home extends Component {

  // hide nav bar
  static navigationOptions = {

    header: null,

  }

  //Constructor
  constructor(props) {

    super(props);

    // initial state
    this.state = {

      photos: [],

      // // initial place
      // place: null,

      // place_name: null,

      // Var for indicate if it gets places
      get_photos: false,
      // get_places: true,

    };
  
  }

  // Component did mount
  componentDidMount(){

    // get places from API
        // const url_server = "http://192.168.1.12:8000/place/";
        const url_server = 'https://tempphoto.pythonanywhere.com/photos/';
        fetch(url_server)
              .then((response) => response.json())
              .then((responseJson) => {

                // list of plcaes in JSON
                var photos_from_server = responseJson;

                // Alert.alert(places_from_server[0].name);

                // console.log(places_from_server);

                // console.log(places_from_server[0].id);


                // Update places 
                this.setState({

                  photos: photos_from_server,

                  // initial place
                  // place: places_from_server[0].id,
                  // place_name: places_from_server[0].name,
                  get_photos: true,

                });


              })
              .catch((error) => {
                console.error(error);
                Alert.alert('Error !');
              });

  }

  // // Manage danger map
  // dangers_map(){

  //   // Navitage to next page
  //   this.props.navigation.push("Map"); 

  // }

  // manage click on button 
  manage_click(){

    // Alert.alert('Go to next page');
    // Navitage to next page
    this.props.navigation.push("Add_Photo");  

  }

  // Render method
  render() {

    // // Get places names
    // const list_places_names = this.state.places.map((item) =>{

    //   return(item.name);

    // });

    return (

      <View style = {styles.container_flex}>
          
        <View style = {styles.container_flex}>

          {

            this.state.get_photos

            ? 

            <View>

              <FlatList

                data = {this.state.photos}

                renderItem={

                  ({item}) => 

                    <TouchableOpacity onPress = {() => this.props.navigation.push("Photo_Details", {photo: item})}>
                  
                      <Card
                        image = {{uri: item.photo}}
                      >

                        <Text style={{marginBottom: 10}}>

                          {item.name}

                        </Text>
                        
                      </Card>

                    </TouchableOpacity>

                    // <TouchableOpacity style = {styles.container_flex} onPress = {() => this.props.navigation.push("Place_Details", {place: item})}>

                    //   <Text style={styles.item}>

                    //     {item.name}

                    //   </Text>

                    //   <Image
                    //     style={{width: 100, height: 100}}
                    //     source={{uri: item.image}}
                    //   />

                    // </TouchableOpacity>

                }

                keyExtractor = { (item, index) => index.toString() }

              />

              <Button

                raised

                title = {"Add photo"}

                onPress = {()=> this.manage_click()}

                buttonStyle={styles.buttonStyle}

              />

            </View>

          :

          <ProgressBarAndroid/>
        }

        </View>

      </View>

    );

  }

}

const styles = StyleSheet.create({

  image_background: {

    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center'

  },

  container_flex : {

    flex:1 ,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  buttonStyle: {
    backgroundColor: "blue",
    width: 300,
    height: 80,
    elevation: 10,
    // fontSize: 20,
    // borderColor: "transparent",
    // borderWidth: 0,
    borderRadius: 100,
    margin: 2,
    // borderColor: "red",

  }

})

export default withNavigation(Home);