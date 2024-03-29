import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen1 from '../screens/HomeScreen1'
import SettingScreen from '../screens/SettingScreen'
import pageOne from '../screens/pageOne';
import pageTwo from '../screens/pageTwo';
import pageThree from '../screens/pageThree';
import pageFour from '../screens/pageFour';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import CheckOut from '../screens/CheckOut'
import edit from '../screens/editProfile'
import Locations from '../screens/Locations.js';
import setLocation from '../screens/setLocation.js';
import orderHistory from '../screens/orderHistory';
import SignInScreen from '../screens/SignInScreen';
import ProviderHome from '../screens/ProviderHome';
import ImportProducts from '../screens/ImportProducts'
import addProduct from '../screens/addProduct';
import editProducts from '../screens/editProducts'
import viewProducts from '../screens/viewProducts'
import editProd from '../screens/editProd'
import ProviderOrders from '../screens/ProviderOrders'
import editAddress from '../screens/editAddress'
import CardPayment from '../screens/CardPayment'
import ProviderFeedback from './ProviderFeedback'
import Feedbacks from '../screens/Feedbacks'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ReOrder from '../screens/ReOrder'
import addOffer from '../screens/addOffer'
import viewProviderOffers from './viewProviderOffers'
import editOffer from '../screens/editOffer'
import specialOffers from '../screens/specialOffers'
import viewSoldOut from '../screens/viewSoldOut'
import PaymentMethod from '../screens/PaymentMethod'
import providerPendingOrders from '../screens/providerPendingOrders'
import userPendingOrders from '../screens/userPendingOrders'
import deliverd from '../screens/deliverd'
import addToDelivery from '../screens/addToDelivery'
import MainHome from '../screens/MainHome'
import addProductFromMeta from '../screens/addProductFromMeta';
import OrderStatus from '../screens/OrderStatus'
import userPreprationOrders from '../screens/userPreprationOrders'
import refund from '../screens/refund'
import ProviderRefund from '../screens/ProviderRefund';
import ReorderRefund from '../screens/ReorderRefund';
import Wallet from '../screens/Wallet'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}
    >

      <View style={[
      ]}>

        <DrawerItemList {...props}
        />
        <DrawerItem
          icon={() => <AntDesignIcon name="logout" size={25} color={'#800C69'} style={{ padding: 5 }} />}
          style={{ marginTop: '20%' }}
          label="Logout" onPress={() => {
            firebase.auth().signOut();
          }

          } />
      </View>

    </DrawerContentScrollView>
  );
}
var flag1 = 0;
function CustomDrawerContent1(props) {

  return (

    <DrawerContentScrollView {...props}>

      <DrawerItemList {...props} />
      <DrawerItem options={{ headerShown: false }}
        icon={() => <AntDesignIcon name="logout" size={25} color={'#800C69'} style={{ padding: 5 }} />}
        style={{ marginTop: '65%' }}
        label="Logout" onPress={() => {
          props.navigation.navigate("SignInScreen");
          flag1 = 1;
          console.log(flag1, "888888888888888")
          // setState({flag : 1});
        }

        } />

    </DrawerContentScrollView>
  );
}

class HomeScreen extends React.Component {

  state = { user: {}, flag: 0 };
  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user: user });
      }
    })

  }

  render() {
    console.log(this.props.navigation.state.params.email, "4444444444444444444");
    return (

      (
        this.props.navigation.state.params.ProviderName === "customer" &
        this.props.navigation.state.params.email !== "test@gmail.com") ? (

        <NavigationContainer style={{ backgroundColor: "#800C69", color: "#800C69" }}>

          <Drawer.Navigator
            screenOptions={{
              drawerStyle: {
                width: "80%",
              },
            }}
            initialRouteName="MainHome" drawerContent={props => <CustomDrawerContent {...props}
            />}>

            <Drawer.Screen name="MainHome" component={MainHome} style={{ color: "#800C69" }}
              options={{
                title: 'Home',
                drawerIcon: ({ focused, size }) => (
                  <FontAwesome5 name="home" size={25} color={'#800C69'} style={{ padding: 0 }} />
                ),
              }} />

            <Drawer.Screen name="Shops" component={HomeScreen1} style={{ color: "#800C69" }}
              options={{
                title: 'Shops',
                drawerIcon: ({ focused, size }) => (
                  <EntypoIcon name="shop" size={25} color={'#800C69'} style={{ padding: 0 }} />
                ),
              }} />

            <Drawer.Screen name="Cart" component={Cart} style={{ color: "#800C69" }}
              options={{
                title: 'My Cart',
                drawerIcon: ({ focused, size }) => (
                  <AntDesignIcon name="shoppingcart" size={25} color={'#800C69'} style={{ padding: 0 }} />
                ),
              }}
            />
            <Drawer.Screen name="Profile" component={Profile} style={{ color: "#800C69" }}
              options={{
                title: 'My Profile',
                drawerIcon: ({ focused, size }) => (
                  <AntDesignIcon name="user" size={25} color={'#800C69'} style={{ padding: 0 }} />
                ),
              }}
            />

            <Drawer.Screen name="Wallet" component={Wallet} style={{ color: "#800C69" }} initialParams={{ TotalAmount:false}}
              options={{
                title: 'My Wallet',
                drawerIcon: ({ focused, size }) => (
                  <EntypoIcon name="wallet" size={25} color={'#800C69'} style={{ padding: 0 }} />
                ),
              }}
            />
            <Drawer.Screen name="Locations" component={Locations} style={{ color: "#800C69" }}
              options={{
                title: 'My Addresses',
                drawerIcon: ({ focused, size }) => (
                  <EntypoIcon name="location" size={25} color={'#800C69'} style={{ padding: 0 }} />
                ),
              }}
            />


            <Drawer.Screen name="OrderStatus" component={OrderStatus}
              options={{

                title: 'Order Status',
                drawerIcon: ({ focused, size }) => (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={require('../assets/fast-delivery.png')} />
                ),
              }} />


            <Drawer.Screen name="orderHistory" component={orderHistory}
              options={{

                title: 'Orders History',
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons name="history" size={25} color={'#800C69'} style={{ padding: 2 }} />
                  //   <Image style={styles.icon} source={require('../assets/clock.png')} />
                ),
              }} />

            <Drawer.Screen name="refund" component={refund}
              options={{

                title: 'Refund',
                drawerIcon: ({ focused, size }) => (
                  <Image
                    style={{
                      width: 32,
                      height: 32,
                    }}
                    source={require('../assets/cashback.png')} />
                ),
              }} />

            <Drawer.Screen name="specialOffers" component={specialOffers} style={{ color: "#800C69" }}
              options={{
                title: 'Special Offers',
                drawerIcon: ({ focused, size }) => (
                  <Fontisto name="shopping-sale" size={25} color={'#800C69'} style={{ padding: 2 }} />
                ),
              }}
            />


            <Drawer.Screen name="Setting" component={SettingScreen} style={{ color: "#800C69" }}
              options={{
                // title: 'Setting',
                // drawerIcon: ({ focused, size }) => (
                //   <Icon name="settings" size={25} color={'#800C69'} style={{ padding: 2 }} />  ),
                drawerItemStyle: { height: 0 },
                drawerLabel: () => null
              }}
            />

            <Drawer.Screen name="deliverd" component={deliverd}
              options={{
                title: 'set to deliverd ',
                drawerLabel: () => null,
                drawerItemStyle: { height: 0 },
              }} />

            <Drawer.Screen name="pageOne" component={pageOne}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Al-Shini',
                drawerLabel: () => null
              }} />
            <Drawer.Screen name="pageTwo" component={pageTwo}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Bravo',
                drawerLabel: () => null
              }} />
            <Drawer.Screen name="pageThree" component={pageThree}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Brothers',
                drawerLabel: () => null
              }} />

            <Drawer.Screen name="pageFour" component={pageFour}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Gardens',
                drawerLabel: () => null
              }} />
            <Drawer.Screen name="userPendingOrders" component={userPendingOrders}
              options={{

                title: 'In Delivery Orders',
                drawerLabel: () => null,
                drawerItemStyle: { height: 0 },
              }} />

            <Drawer.Screen name="userPreprationOrders" component={userPreprationOrders}
              options={{

                title: 'In Prepration Orders',
                drawerLabel: () => null,
                drawerItemStyle: { height: 0 },
              }} />


            <Drawer.Screen name="CheckOut" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={CheckOut}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'CheckOut',
                drawerLabel: () => null
              }} />



            <Drawer.Screen name="edit" component={edit}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Edit My Profile',
                drawerLabel: () => null
              }} />

            <Drawer.Screen name="editAddress" component={editAddress}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Edit Address',
                drawerLabel: () => null
              }} />


            <Drawer.Screen name="CardPayment" component={CardPayment} style={{ color: "#800C69" }}
              options={{
                title: 'Credit Card Payment',
                drawerItemStyle: { height: 0 },
                drawerLabel: () => null
              }} />

            <Drawer.Screen name="ReorderRefund" component={ReorderRefund} style={{ color: "#800C69" }}
              options={{
                title: 'Refund',
                drawerItemStyle: { height: 0 },
                drawerLabel: () => null
              }} />


            <Drawer.Screen name="PaymentMethod" component={PaymentMethod} style={{ color: "#800C69" }}
              options={{
                title: 'Payment Methods',
                drawerItemStyle: { height: 0 },
                drawerLabel: () => null
              }} />

            <Drawer.Screen name="setLocation" component={setLocation}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Set Location',
                drawerLabel: () => null
              }} />
            <Drawer.Screen name="Feedbacks" component={Feedbacks}
              options={{
                drawerItemStyle: { height: 0 },
                title: ' ',
                drawerLabel: () => null
              }} />

            <Drawer.Screen name="ReOrder" component={ReOrder}
              options={{
                drawerItemStyle: { height: 0 },
                title: 'Products Details',
                drawerLabel: () => null
              }} />

          </Drawer.Navigator>
        </NavigationContainer >

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

      ) : (

        (flag1 === 1) ? (console.log(flag1, "888888888888888") & this.props.navigation.navigate("SignInScreen")
        ) : (

          <NavigationContainer style={{ backgroundColor: "#800C69", color: "#800C69" }}>

            <Drawer.Navigator screenOptions={{
              drawerStyle: {
                width: "80%",
              },
            }}
              initialRouteName="ProviderHome" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} drawerContent={props => <CustomDrawerContent {...props} />}>
              {/* <Drawer.Navigator initialRouteName="ProviderHome" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName,  userName:this.props.navigation.state.params.userName }}> */}

              <Drawer.Screen name="ProviderHome" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={ProviderHome}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <EntypoIcon name="home" size={22} color={'#800C69'} />
                  ),
                  // drawerItemStyle: { height: 0 },
                  title: 'Home',
                }} />


              <Drawer.Screen name="ImportProducts" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={ImportProducts} style={{ color: "#800C69" }}
                options={{

                  drawerIcon: ({ focused, size }) => (
                    <MaterialCommunityIcons name="folder-add" size={25} color={'#800C69'} style={{ padding: 0 }} />
                  ),
                  title: 'Import Products'
                }}



              />

              <Drawer.Screen name="addProducts" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={addProduct}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Icon name="add-circle" size={22} color={'#800C69'} style={{ padding: 0 }} />
                  ),
                  title: 'Add Products',
                }} />
              <Drawer.Screen name="addProductFromMeta"
                initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }}
                component={addProductFromMeta}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Icon name="add-circle" size={22} color={'#800C69'} style={{ padding: 0 }} />
                  ),
                  title: 'Add Product From Meta',
                }} />



              <Drawer.Screen name="editProducts" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={editProducts}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <FontAwesome5 name="edit" size={20} color={'#800C69'} />
                  ),
                  // drawerItemStyle: { height: 0 },
                  title: 'Edit Products',
                  // drawerLabel: () => null
                }} />



              <Drawer.Screen name="viewProducts" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={viewProducts}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <MaterialIcons name="local-offer" size={20} color={'#800C69'} />
                  ),
                  // drawerItemStyle: { height: 0 },
                  title: 'Add to Offers',
                  // drawerLabel: () => null
                }} />


              <Drawer.Screen name="viewProviderOffers" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={viewProviderOffers}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <MaterialCommunityIcons name="burst-sale" size={25} color={'#800C69'} style={{ padding: 0 }} />
                  ),
                  title: 'Edit Offers',
                }} />



              <Drawer.Screen name="providerPendingOrders" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }}
                component={providerPendingOrders}
                options={{
                  title: 'Pending Orders',
                  drawerIcon: ({ focused, size }) => (
                    <Image style={styles.icon} source={require('../assets/delivery.png')} />

                  ),
                }} />


              <Drawer.Screen name="ProviderRefund" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }}
                component={ProviderRefund}
                options={{
                  title: 'Refund Requests',
                  drawerIcon: ({ focused, size }) => (
                    <Image style={styles.icon} source={require('../assets/bank-account.png')} />

                  ),
                }} />

              <Drawer.Screen name="ProviderOrders" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }}
                component={ProviderOrders}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <MaterialIcons
                      name="point-of-sale" size={25} color={'#800C69'} style={{ padding: 0 }} />
                  ),
                  title: 'Provider Orders',
                }} />




              <Drawer.Screen name="ProviderFeedback" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={ProviderFeedback}
                options={{

                  title: 'Feedback',
                  drawerIcon: ({ focused, size }) => (
                    <MaterialIcons name="feedback" size={20} color={'#800C69'} />
                  ),
                }} />

              <Drawer.Screen name="SignInScreen" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={SignInScreen}
                options={{
                  drawerItemStyle: { height: 0 },

                  headerShown: false,
                  title: 'Logout',
                  drawerIcon: ({ focused, size }) => (
                    <AntDesignIcon name="logout" size={25} color={'#800C69'} style={{ padding: 5 }} />
                  ),
                }} />


              <Drawer.Screen name="viewSoldOut" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }}
                component={viewSoldOut}
                options={{

                  title: 'Sold Out',
                  drawerIcon: ({ focused, size }) => (
                    <Image style={styles.icon} source={require('../assets/out-of-stock.png')} />
                  ),
                }} />

              {/* <Drawer.Screen name="SignInScreen" component={SignInScreen}
            options={{
              drawerIcon:({ focused, size }) => (<AntDesignIcon name="logout" size={25} color={'#800C69'}
               style={{ padding: 5 }} />),
              title: 'Logout',
            }} /> */}




              {/* <Drawer.Screen name="ImportProducts" component={ImportProducts}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'ImportProducts',
              drawerLabel: () => null
            }} /> */}



              <Drawer.Screen name="viewProducts1" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={viewProducts}
                options={{
                  title: 'viewProducts',
                  drawerItemStyle: { height: 0 },

                }} />

              <Drawer.Screen name="editProd" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={editProd}
                options={{
                  title: 'editProd',
                  drawerItemStyle: { height: 0 },

                }} />

              <Drawer.Screen name="editOffer" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={editOffer}
                options={{
                  title: 'editOffer',
                  drawerItemStyle: { height: 0 },

                }} />

              <Drawer.Screen name="addOffer" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName, userName: this.props.navigation.state.params.userName }} component={addOffer}
                options={{
                  drawerItemStyle: { height: 0 },

                  title: 'addOffer',
                }} />


              <Drawer.Screen name="addToDelivery" component={addToDelivery}
                options={{
                  drawerItemStyle: { height: 0 },
                  title: 'add To Delivery',
                  drawerLabel: () => null
                }} />





              {/* <Drawer.Screen name="viewProviderOffers" initialParams={{ ProviderName: this.props.navigation.state.params.ProviderName,  userName:this.props.navigation.state.params.userName }} component={viewProviderOffers}
            options={{
              // drawerItemStyle: { height: 0 },
              title: 'Offers',
            }} /> */}

              {/* 
<DrawerContentScrollView {...this.props}>

<DrawerItemList {...this.props} />
<DrawerItem options={{headerShown: false}}
  icon={() => <AntDesignIcon name="logout" size={25} color={'#800C69'} style={{ padding: 5 }} />}
  style={{ marginTop: '65%' }}
  label="Logout" onPress={() => {
    this.props.navigation.navigate("SignInScreen") ;
    this.setState({flag : 1});
  }

  } />

</DrawerContentScrollView> */}

            </Drawer.Navigator>
          </NavigationContainer>
        )
      )



    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 25,
    height: 25,
  },
});
export default HomeScreen;
