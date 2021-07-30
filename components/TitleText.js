import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = props => {
    return (
        <Text style={{...props.style, ...styles.title}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default TitleText;