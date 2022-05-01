import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList } from 'react-native';
import { Dimensions } from "react-native";
import { TextInput, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Platform, Button, Alert } from 'react-native';

import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
var db = firebase.firestore();

const GOOGLE_MAPS_APIKEY = "AIzaSyDjKKs_oh-Yhlilngt6EmiRnn8CbRECmBA";

export default class editLocation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}, recipientName: '', recipientPhone: '', recipientEmail: '', city: '', country: '', street: '', moreDescription: ''
    }
  }

  componentDidMount() {
    this.state.city = this.props.route.params.itemData.city;
    this.state.country = this.props.route.params.itemData.country;
    this.state.street = this.props.route.params.itemData.street;
    this.state.moreDescription = this.props.route.params.itemData.moreDescription;
    this.state.recipientName = this.props.route.params.itemData.recipientName;
    this.state.recipientPhone = this.props.route.params.itemData.recipientPhone;
    this.state.recipientEmail = this.props.route.params.itemData.recipientEmail;



    firebase.auth().onAuthStateChanged((user) => {

      if (user != null) {
        this.setState({ user: user });
      }
    })
  }



  getAddress() {
    return this.state.city + ',' + this.state.country + ':' + this.state.street + ',' + this.state.moreDescription;//format: Palestine,Ramallah,Irsal street:buliding No. 10;
  }


  editAddress() {
    console.log("333333333333333 ", this.state);

    console.log(this.state.recipientName);
    console.log(this.state.city);

    db.collection("usersAddresses").doc(this.props.route.params.itemId).update({
      email: this.state.user.email,
      recipientName: this.state.recipientName,
      recipientEmail: this.state.recipientEmail,
      recipientPhone: this.state.recipientPhone,
      city: this.state.city,
      country: this.state.country,
      moreDescription: this.state.moreDescription,
      street: this.state.street
    })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 170, textAlign: 'center', fontSize: 25 }}>Recipient Info</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <TextInput
          placeholder={"Recipient Name"}
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          // textContentType="recipientName"

          onChangeText={(recipientName) => { this.setState({ recipientName }) }}
          // defaultValue={this.props.route.params.itemData.recipientName}
          value={this.state.recipientName}
          style={styles.input}
        />

        <TextInput
          placeholder={"Recipient Email"}
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          keyboardType='email-address'
          // textContentType="recipientEmail"
          value={this.state.recipientEmail}
          // defaultValue={this.props.route.params.itemData.recipientEmail}
          onChangeText={(recipientEmail) => { this.setState({ recipientEmail }) }}

          style={styles.input}
        />



        <TextInput
          placeholder={"Recipient Phone"}
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          keyboardType='numeric'
          // textContentType="recipientPhone"
          value={this.state.recipientPhone}
          onChangeText={(recipientPhone) => { this.setState({ recipientPhone }) }}
          // defaultValue={this.props.route.params.itemData.recipientPhone}

          style={styles.input}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 170, textAlign: 'center', fontSize: 25 }}>Address Info</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>

        <TextInput
          placeholder={"Country"}
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          // textContentType="country"

          onChangeText={(country) => { this.setState({ country }) }}
          // defaultValue={this.props.route.params.itemData.country}
          value={this.state.country}
          style={styles.input}
        />
        <TextInput
          placeholder={"City"}
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          // textContentType="city"
          onChangeText={(city) => { this.setState({ city }) }}
          // defaultValue={this.props.route.params.itemData.city}
          value={this.state.city}
          style={styles.input}
        />


        <TextInput
          placeholder={"Street"}
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          // textContentType="street"
          onChangeText={(street) => { this.setState({ street }) }}
          // defaultValue={this.props.route.params.itemData.street}
          value={this.state.street}
          style={styles.input}
        />

        <TextInput
          placeholder={"More Description"}
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          // textContentType="moreDescription"
          onChangeText={(moreDescription) => { this.setState({ moreDescription }) }}
          // defaultValue={this.props.route.params.itemData.moreDescription}

          value={this.state.moreDescription}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.editAddress() & this.props.navigation.navigate("Locations")
            & Alert.alert('Address updated') & console.log(this.state.recipientName) &
            console.log(this.state.city)
          }>
          <Text style={{
            color: "white",
            padding: 5,
            fontSize: 18
          }}>Update Address</Text>
        </TouchableOpacity>
        {/* 
            <TouchableOpacity 
   style={styles.buttonContainer}
    onPress={() => this.addAddress() &  this.props.navigation.navigate("Locations") 
    & Alert.alert('Address added')
    }>
     <Text style={{
                color: "white",
                padding: 5,
                fontSize: 18
              }}>Use Current Location</Text>
            </TouchableOpacity> */}
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    // marginBottom: 50,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#800C69",
    color: 'white'
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    //borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 200,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 2
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  //             container: {
  //                 flex: 2,
  //             marginTop: 20,
  // },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: "10%",
    backgroundColor: '#ECD4EA',
    //fontcolor: 'black'
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    marginTop: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: '#ECD4EA',
  },
  cardImage: {
    flex: 1,
    height: 250,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "#38700F",
    marginTop: 5
  },
  shop: {
    fontSize: 18,
    flex: 1,
    color: "#800C69",
  },
  total: {
    fontSize: 16,
    color: "#38700F",
    marginTop: 5,
    marginLeft: "30%",
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: "center",

  }, input: {
    fontSize: 18,
    borderColor: "#707070",
    borderWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
    borderRadius: 15,
    // fontWeight: 'bold',
    color: 'black',
    paddingLeft: 48,
    marginHorizontal: 25,
    width: 300,
    height: 40,
  },
  buyNow: {
    fontSize: 18,
    color: "#800C69",
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  socialBarSection: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',

  },
  socialBarlabel: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },
  container: {
    width: 350,
    height: 200,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden'
  },

  image: {
    alignSelf: 'flex-start',
    width: '100%',
    height: '100%'
  },

  textContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right'

    // alignItems: 'center',
    // justifyContent: 'center'
  },
  camera: {
    alignSelf: 'center',
    margin: 8,

  }, cameraWrapper: {
    position: 'absolute',
    top: 150,
    left: 225,
    backgroundColor: '#800C69',
    width: 40,
    height: 40,
    borderRadius: 100
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#800C69",
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  logo: {
    marginTop: 50,
    height: "20%",
    // height: 400,
    width: "100%",
    // flex: 1,
    resizeMode: 'contain'
  },
});