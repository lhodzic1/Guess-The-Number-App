import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer style={styles.numberContainer}>{selectedNumber}</NumberContainer>
                <MainButton onPress={props.onStartGame.bind(this, selectedNumber)} >START GAME</MainButton>
            </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Reset" color={Colors.accent} onPress={resetInputHandler} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    numberContainer: {
        width: 70,
        height: 85
    },
    // button: {
    //     width: Dimensions.get('window').width / 4,
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    title: {
        marginVertical: 10
    }
});

export default StartGameScreen;