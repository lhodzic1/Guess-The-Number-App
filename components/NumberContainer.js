import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/colors';

const NumberComponent = props => {
    return (
        <View style={{...styles.container, ...props.style}}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        color: Colors.accent,
        fontSize: 22
    }

});

export default NumberComponent;