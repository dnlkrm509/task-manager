import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FormatNameContext } from '../../contexts/formatNameContext';
import ButtonIcon from '../UI/ButtonIcon';
import Button from '../UI/Button';

const NameSearch = () => {
    const navigation = useNavigation();
    const nameCtx = useContext(FormatNameContext);
    
    const [value, setValue] = useState({});
    
    const fName = "dANiEl";
    const lName = "kARimi";
    useEffect(() => {
        setValue(nameCtx.getFormatedName(fName, lName));
    },[nameCtx])
    
    const { fName: newFName, lName: newLName, fullName, fLetterName } = value;

    return (
        <View style={[styles.detailsSearchContainer]}>
            <Button
                buttonStyle={[
                    styles.nameImageContainer,
                    {
                        paddingVertical: 0,
                        paddingHorizontal: 0
                    }
                ]}
                onPress={() => navigation.navigate('modal')}
                fullWidth
            >
                <View style={styles.image}>
                    <Text>{fLetterName}</Text>
                </View>
                <Text style={styles.name}>
                    {fullName}
                </Text>
            </Button>
            <ButtonIcon
                name='search'
                color='blue'
                size={28}
                buttonStyle={{padding:0}}
                onPress={() => navigation.navigate('search')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    detailsSearchContainer: {
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    nameImageContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        borderRadius: 50,
        width: 30,
        height: 30,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold'
    },
});

export default NameSearch;