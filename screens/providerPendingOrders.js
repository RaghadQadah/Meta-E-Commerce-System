import React, { Component } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList } from 'react-native';
var db = firebase.firestore();

export default class providerPendingOrders extends Component {

    constructor() {
        super();
        this.docs = firebase.firestore().collection('PendingOrders');
        this.state = {
            isLoading: true,
            orderDB: []
        };
        console.log("this===", this.state.orderDB)
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getorderDBData);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getorderDBData = () => {
        let provider = "provider";
        console.log("this===", this.state.orderDB)
        console.log("this.props.route.params.ProviderName", this.props.route.params.ProviderName)

        let OrderInf;
         const Orders = [];
        const OrdersDetail = [];
        db.collection('PendingOrders')
            //.where(`OrderProducts.provider`, '==',  this.props.route.params.ProviderName)
            // .where(`OrderProducts.provider`, '==', "Al-Shini")
            .get()
            .then((querySnapshot) => {
                OrderInf = querySnapshot.docs.map(doc => doc.data());

               console.log("obj====",OrderInf)

                OrderInf.forEach((obj) => {
                   
                    // Orders.length = 0;
                    Orders.forEach(obj => {
                        obj=[];
                       });
                  
                    obj.OrderProducts.forEach((obj1) => {
                        // console.log("obj1.provider",obj1.provider)
                        if (obj1.provider == this.props.route.params.ProviderName) {
                            console.log("obj1.provider", obj1)
                            Orders.push(obj1);
                        }
                    });

                    OrdersDetail.push({
                        OrderDate: obj.OrderDate,
                        OrderProducts: Orders,
                        OrderTimestamp: obj.OrderTimestamp,
                        address: obj.address,
                        customerEmail: obj.customerEmail,
                        customerName: obj.customerName
                    });

                          console.log("OrdersDetailsssssss", OrdersDetail)

                });

          
                // console.log("user-orderssssss", Orders)
                this.setState({ orderDB: Orders });
                // console.log("user-orders", this.state.orderDB)
            })
    }

    state = { Price: 0 }



    render() {
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>


                <FlatList
                    data={this.state.orderDB}
                    renderItem={({ item }) =>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>


                            <TouchableOpacity
                            // onPress={() => { this.props.navigation.navigate("pageOne"); }}
                            >

                                <View style={styles.container}>


                                    <View style={{ justifyContent: "center", alignItems: "center", padding: 5 }}>
                                        <Text style={{ fontSize: 14, color: "#800C69", }}>
                                            {/* <Image style={styles.icon} source={require('../assets/calendar.png')} /> */}
                                            {' '}Order Date:  {item.OrderDate}</Text>
                                    </View>

                                    <View style={{ justifyContent: "center", alignItems: "center", padding: 5 }}>
                                        <Text style={{ fontSize: 14, color: "#800C69", }}>
                                            {/* <Image style={styles.icon} source={require('../assets/calendar.png')} /> */}
                                            {' '}Number Of Products: {item.length}</Text>
                                    </View>

                                    <View style={{ justifyContent: "center", alignItems: "center", padding: 5 }}>
                                        <Text style={{ fontSize: 14, color: "#800C69", }}>
                                            {/* <Image style={styles.icon} source={require('../assets/calendar.png')} /> */}
                                            {' '}Total Price: {item.price}</Text>
                                    </View>

                                    <View style={{ justifyContent: "center", alignItems: "center", padding: 5 }}>
                                        <Text style={{ fontSize: 14, color: "#800C69", }}>
                                            {/* <Image style={styles.icon} source={require('../assets/calendar.png')} /> */}
                                            {' '}{`        `}</Text>
                                    </View>

                                    <View style={styles.separator} />
                                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                                    // onPress={() =>
                                    //     this.props.navigation.navigate('ReOrder',
                                    //         { item: item }
                                    //     )
                                    // }
                                    >
                                        <Text style={{ fontSize: 16, color: "#800C69", fontWeight: 'bold', }}>
                                            <Image style={styles.icon} source={require('../assets/product.png')} />
                                            {' '}View Order Products</Text>
                                    </TouchableOpacity>

                                </View>
                            </TouchableOpacity>




                        </View>
                    }
                />

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
        flexDirection: 'column',
        alignItems: 'center',
        width: 50,
        height: 50,
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
        paddingTop: 1,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: '#ECD4EA',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
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
    separator: {
        height: 2,
        backgroundColor: "#800C69"
    },
});
