import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import Button from '../UI/Button';
import { FormatNameContext } from '../../contexts/formatNameContext';

const Account = () => {
    const nameCtx = useContext(FormatNameContext);
    const [value, setValue] = useState({});

    const fName = "dANiEl";
    const lName = "kARimi";
    useEffect(() => {
        setValue(nameCtx.getFormatedName(fName, lName));
    },[nameCtx])
    
    const { fName: newFName, lName: newLName, fullName, fLetterName } = value;

    return (
        <View style={styles.screen}>
            <View style={styles.image}>
                <Text>{fLetterName}</Text>
            </View>
            <Text style={styles.name}>
                {fullName}
            </Text>
            <Text style={styles.email}>
                daniel@email.com
            </Text>
            <View style={styles.lineBreak}></View>
            <Button
                buttonStyle={styles.button}
            >
                <Text style={styles.buttonText}>Manage Account</Text>
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: 'white'
    },
    image: {
        borderRadius:'50%',
        width: 64,
        height: 64,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    name: {
        marginTop: 20,
        fontSize: 24,
    },
    email: {
        marginBottom: 20
    },
    lineBreak: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: Colors.lineBreak
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    buttonText: {
        color: 'blue',
        fontSize: 17
    }
});

export default Account;