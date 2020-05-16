import React from 'react'
import {Animated, Dimensions} from 'react-native'

export default class FadeIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftPos: new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.leftPos, {toValue: 0}
        ).start()
    }

    render() {
        return (
            <Animated.View style={{left: this.state.leftPos}} >
                {this.props.children}
            </Animated.View>
        )
    }
}