import React from 'react';
import { 
  Text, 
  View,
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from "./screens/home_screen.js"
import Add_Photo from "./screens/add_photo_screen.js"
// import Main_Map from "./screens/map.js"
import Photo_Details from "./screens/photo_details_screen.js"
// import Add_Video from "./screens/add_video_screen.js"

const AppStackNavigator = createStackNavigator(
  // {headerLayoutPreset: 'center'},
  {

    Home: Home,
    // Map: Main_Map,
    Photo_Details: Photo_Details,
    Add_Photo: Add_Photo,
    // Add_Place: Add_Place,

  },

  { 
    headerMode: 'screen',
    headerLayoutPreset: 'center'
  },

  {
    initialRouteName: "Home",
    // headerLayoutPreset: 'center',
    defaultNavigationOptions: {

      // headerLayoutPreset: 'center',

      //  headerStyle: {
      //   backgroundColor: '#3f5fe0',
      // },
      // headerTintColor: '#3f5fe0',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
      // headerStyle: { backgroundColor: 'red' },
      // headerTitleStyle: { color: 'green' },

      headerStyle: {
        elevation: 10,
      },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }
  },


);


const App = createAppContainer(AppStackNavigator);

export default App;