import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Search from "../components/Search";
import MovieDetail from "../components/MovieDetail";
import Favorites from "../components/Favorites";

const SearchStackNavigator = createStackNavigator({
   Search: {
       screen: Search,
       navigationOptions: {
           title: 'Rechercher'
       }
   },
   MovieDetail: {
       screen: MovieDetail
   }
});

const FavoriteStackNavigator = createStackNavigator({
    Favoris: {
        screen: Favorites
    }
})

const BottomTabNavigator = createBottomTabNavigator({
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
        activeBackgroundColor: '#eee',
        inactiveBackgroundColor: '#fff',
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