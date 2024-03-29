import React, { Component } from "react";
import {
  SafeAreaView, StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Zocial from 'react-native-vector-icons/Zocial'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { Picker } from "@react-native-picker/picker";
var db = firebase.firestore();
class CartProducts extends Component {
  constructor() {
    super();
    //   console.log("tydhfbx",this.MyDB)        
    this.docs = db.collection("usersAddresses");
    this.state = {
      isLoading: true,
      addressDB: [],
      user: {},
      address: ''
    };
  }


  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getAddressDBData);
  }

  // state = { user: {},address:'' };
  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {

      if (user != null) {
        this.setState({ user: user });
      }
    })

  }


  getCurrentDate() {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
  }
  getAddress(item) {
    // console.log(item);
    return item.country + ',' + item.city + ',' + item.street + ',' + item.moreDescription;//format: Palestine,Ramallah,Irsal street,buliding No. 10;
  }
  getAddressDBData = () => {

    let AddressInf;
    db.collection("usersAddresses")
      .get()
      .then((querySnapshot) => {
        AddressInf = querySnapshot.docs.map(doc => doc.data());
        this.setState({ addressDB: AddressInf });
      })

  }

  clearCart() {
    // if (this.props.route.params.cartFlag == 1){
    this.props.onPressClearCart();
    // }
  }

  addOrder(orders) {
    orders.forEach((obj) => {
      db.collection("Orders").add({
        customerName: this.state.user.displayName,
        customerEmail: this.state.user.email,
        OrderDate: this.getCurrentDate(),
        product_name: obj.name,
        product_provider: obj.provider,
        product_price: obj.price,
        product_image: obj.image,
        product_quantity: obj.quantity,

      })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      db.collection("OrdersCheckedOut").add({
        customerName: this.state.user.displayName,
        customerEmail: this.state.user.email,
        OrderDate: this.getCurrentDate(),
        product_name: obj.name,
        product_provider: obj.provider,
        product_price: obj.price,
        product_image: obj.image,
        product_quantity: obj.quantity,
        address: this.state.address
      })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

    });
  }


  render() {
    let data = this.props.products
    this.getAddressDBData();
    let pickerItems = this.state.addressDB.map((s, i) => {
      return <Picker.Item key={i} value={this.getAddress(s)} label={this.getAddress(s)} />
    });

    return (
      <View style={styles.container}>


        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.props.products.products}

          horizontal={false}
          numColumns={2}

          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}

          renderItem={(post) => {

            const item = post.item;
            return (

              <View style={styles.card}>

                <View style={styles.cardHeader}>

                  <View>

                    <SafeAreaView style={styles.socialBarButton}>
                      <EntypoIcon name="shop" size={23} color={'#2E922E'} style={{ padding: 5 }} />
                      <Text style={styles.shop}>{"  "}{item.provider}</Text>
                    </SafeAreaView>

                    <SafeAreaView style={styles.socialBarButton}
                    >
                      <Zocial name="cart" size={23} color={'#2E922E'} style={{ padding: 5 }} />
                      <Text >{"  "}</Text>
                      <Text style={styles.shop}>
                        {item.name}</Text>
                    </SafeAreaView>

                    {(item.isOffer) ? (
                      <SafeAreaView style={styles.socialBarButton}>
                        <Ionicons name="pricetags-outline" size={23} color={'#2E922E'} style={{ padding: 5 }} />
                        <Text style={{
                          textDecorationLine: 'line-through', fontSize: 18,
                          flex: 1,
                          color: "#800C69",
                        }}>{item.originalPrice}{" ₪"}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "red", marginTop: 5, paddingBottom: 5}}> {item.price}{" ₪"}</Text>
                      </SafeAreaView>

                    ) : (
                      <SafeAreaView style={styles.socialBarButton}>
                        <Ionicons name="pricetags-outline" size={23} color={'#2E922E'} style={{ padding: 5 }} />
                        <Text style={styles.shop}>{"  "}{item.price}{" ₪"}</Text>
                      </SafeAreaView>

                    )
                    }
                   
                    <View style={styles.socialBarSection}>


                      <TouchableOpacity style={styles.socialBarButton}
                        onPress={() => {
                          this.props.onPressMinus(item);
                        }}
                      >
                        <AntDesign name="minuscircleo" size={23} color={'#2E922E'} style={{ padding: 5 }} />

                      </TouchableOpacity>

                      <TouchableOpacity style={styles.socialBarButton}
                        onPress={() => {
                          this.props.onPressPlus(item);
                        }}
                      >
                        <AntDesign name="pluscircleo" size={23} color={'#2E922E'} style={{ padding: 5 }} />
                      </TouchableOpacity>

                      <Text style={{
                        color: "#800C69",
                        padding: 5
                      }}>{"× "}{item.quantity}</Text>

                    </View>

                    <View style={styles.socialBarContainer}>

                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}
                          onPress={() => {
                            this.props.onPress(item);
                          }}
                        >
                          <MaterialCommunityIcons name="cart-remove" size={23} color={'#2E922E'} style={{ padding: 5 }} />
                          <Text style={{
                            color: "#800C69",
                            padding: 5
                          }}>
                            Delete</Text>
                        </TouchableOpacity>

                      </View>
                    </View>
                  </View>
                </View>
              </View>

            )
          }
          }
        />
     

        <View style={styles.cardFooter}>

          <TouchableOpacity style={styles.socialBarButton}>
            <Image style={styles.icon} source={require('../assets/money2.png')} />
            <Text style={styles.buyNow}>  Total Price = {this.props.TotalAmount}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.socialBarButton}
            onPress={() => {
              this.props.navigation.navigate("CheckOut",
                {
                  TotalAmount: this.props.TotalAmount,
                  products: this.props.products.products,
                  clearCart: this.props.onPressClearCart
                })
            }}
          >
            <Image style={styles.icon} source={require('../assets/booking.png')} />
            <Text style={[styles.socialBarLabel, styles.buyNow]}>  Make Order  </Text>
          </TouchableOpacity>
        </View>

      </View >
    );
  }

}

export default CartProducts;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: 5,
  },
  list: {
    paddingHorizontal: 5,
    // backgroundColor: "#E6E6E6",
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  separator: {
    marginTop: 5,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 100,
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
  }, buttonContainer: {
    // marginBottom: 50,
    marginLeft: 30,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#800C69",
    color: 'white'
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

  },
  buyNow: {
    color: "#800C69",
  },
  icon: {
    width: 30,
    height: 30,
  },
  /******** social bar ******************/
  socialBarContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  socialBarSection: {
    marginTop: 5,
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
  }
});