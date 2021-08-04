import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );
}

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess.toString());
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {

        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don\'t lie!", "You know that this is wrong...",
                [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else if (direction === 'greater') {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <BodyText>Oponents's guess</BodyText>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={16} color="white" />
                    </MainButton>
                    <NumberContainer style={styles.numberContainer}>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={16} color="white" />
                    </MainButton>
                </View>

                <View style={styles.listContainer}>
                    { /* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */ }
                    <FlatList
                        data={pastGuesses}
                        keyExtractor={item => item}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <BodyText>Oponents's guess</BodyText>
            <NumberContainer style={styles.numberContainer}>{currentGuess}</NumberContainer>
            <Card style={{...styles.buttonContainer, marginTop: availableDeviceHeight > 600 ? 20 : 10}}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={16} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={16} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                { /* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */ }
                <FlatList
                    data={pastGuesses}
                    keyExtractor={item => item}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    numberContainer: {
        width: 70,
        height: 85
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        maxWidth: '80%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1,
        marginTop: 5
    },
    list: {
        flexGrow: 1,
        //       alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;