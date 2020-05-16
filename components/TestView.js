import React from 'react'
import {View, Text,StyleSheet, Animated, Easing} from 'react-native'

export default class TestView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topPosition: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.sequence([
            Animated.spring(this.state.topPosition, {toValue: 100, tension: 8, friction: 3}),
            Animated.timing(this.state.topPosition, {toValue: 0, duration: 1000, easing: Easing.elastic(2)}),
        ]).start()
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Expérimentations</Text>
                </View>
                <View style={styles.animationContainer}>
                    <Animated.View
                        style={[
                            styles.animatedView,
                            {top: this.state.topPosition}
                        ]}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 24,
        textDecorationLine: 'underline',
    },
    animationContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedView: {
        backgroundColor: 'red',
        width: 100,
        height: 100
    }

})