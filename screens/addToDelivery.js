import React, { Component } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList, Alert } from 'react-native';
var db = firebase.firestore();

export default class addToDelivery extends Component {

    deleteFromPending(items) {
        console.log('deleteOffer', items);
        //   console.log('deleteOffer',items.id);
        firebase.firestore().collection("PendingOrders").where("id", "==", items.id)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });
    }

    addOrderToDelivery(item) {
        db.collection("InDeliveryOrders").add({
            id : db.collection('PendingOrders').doc().id,
            customerName: item.customerName,
            customerEmail: item.customerEmail,
            OrderDate: item.OrderDate,
            OrderTimestamp: item.OrderTimestamp,
            address: item.address,
            // TotalPrice: item.TotalPrice,
            OrderProducts: item.OrderProducts

        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

        Alert.alert("Added Order To Delivery");

    }
    render() {
        console.log("REEEEEEEEEEEEEorder", this.props.route.params.item)
        console.log("REEEEEEEEEEEEEorder", this.props.route.params.ProviderName)

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>


                <FlatList
                    data={this.props.route.params.item.OrderProducts.filter(i => i.provider == this.props.route.params.ProviderName)}
                    renderItem={({ item }) =>



                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>


                            <TouchableOpacity
                            // onPress={() => { this.props.navigation.navigate("pageOne"); }}
                            >

                                <View style={styles.container}>

                                    <View style={styles.infoBoxWrapper}>

                                        <View style={[styles.infoBox, {
                                            borderColor: 'white',
                                            borderRightWidth: 1,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderLeftWidth: 1
                                        }]}>
                                            <Image style={styles.image} source={{ uri: item.image }} />
                                        </View>


                                        <View style={[styles.infoBox, {
                                            color: '#90EE90',
                                            borderColor: 'white',
                                            borderRightWidth: 1,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderLeftWidth: 1
                                        }]}>

                                            <Text style={{ color: "#38700F", fontSize: 14, fontWeight: 'bold' }}>
                                                {`Provider: `}{item.provider}
                                                {`          Name: `}{item.name}
                                                {`                    Price: `}{item.price}
                                                {`                                  Quantity: `}{item.quantity}

                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />




                <View style={styles.cardFooter}>
                    {/* <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={require('../assets/money2.png')} />
                        <Text style={styles.buyNow}>  Total Price = {this.props.route.params.item.TotalPrice}</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.socialBarButton}
                        onPress={() => {
                            this.deleteFromPending(this.props.route.params.item) &
                                this.addOrderToDelivery(this.props.route.params.item)

                        }}
                    >
                        <Image style={styles.icon} source={require('../assets/delivery--1.png')} />
                        <Text style={[styles.buyNow]}>  Add To Delivery  </Text>
                    </TouchableOpacity>
                </View>



            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between',
        // backgroundColor: '#ecf0f1',
        // padding: 8,
        // flexDirection: 'column',
        // alignItems: 'center'
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
        //  margin: 2
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
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
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
        fontSize: 16,
        color: "#800C69",
        fontWeight: "bold",
        paddingTop: 7
    },
    icon: {
        width: 38,
        height: 38,
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
        width: '80%',
        height: '100%'
    },

    textContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        textAlign: 'right'

        // alignItems: 'center',
        // justifyContent: 'center'
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
