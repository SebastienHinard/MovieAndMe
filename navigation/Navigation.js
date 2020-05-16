import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Search from "../components/Search";
import MovieDetail from "../components/MovieDetail";
import Favorites from "../components/Favorites";
import TestView from "../components/TestView";

const SearchStackNavigator = createStackNavigator({
   Search: {
       screen: Search,
       navigationOptions: {
           title: 'Rechercher'
       }
   },
   MovieDetail: {
       screen: MovieDetail,
       navigationOptions: {
           title: "Détails du film"
       }
   }
});

const FavoriteStackNavigator = createStackNavigator({
    Favoris: {
        screen: Favorites
    },
    MovieDetail: {
        screen: MovieDetail,
        navigationOptions: {
            title: "Détails du film"
        }
    }
})

const BottomTabNavigator = createBottomTabNavigator({
    Test: {
        screen: TestView,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('../assets/ic_favorite_border.png')} style={styles.icon} /> )
        }
    },
    Rechercher: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('../assets/ic_search.png')} style={styles.icon} /> )
        }
    },
    Favoris: {
        screen: FavoriteStackNavigator,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('../assets/ic_favorite.png')} style={styles.icon} /> )
        }
    }
},{
    tabBarOptions: {
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#eee',
        showLabel: false,
        showIcon: true
    }
})


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})



export default createAppContainer(BottomTabNavigator)