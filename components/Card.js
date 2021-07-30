import React from 'react';
import { StyleSheet, View } from 'react-native';

// this component can be wrapped around any content (passed as props.children)
// additional style can be passed as props.style

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    )
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 8
    }
});

export default Card;