import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Search from "../components/Search";
import MovieDetail from "../components/MovieDetail";

const HomeStackNavigator = createStackNavigator({
   Search: {
       screen: Search,
       navigationOptions: {
           title: 'Rechercher'
       }
   },
   MovieDetail: {
       screen: MovieDetail,
       navigationOptions: {
           title: 'Détail du film'
       }
   }
});


export default createAppContainer(HomeStackNavigator)
