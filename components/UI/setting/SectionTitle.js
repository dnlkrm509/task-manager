import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionTitle = ({text}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        justifyContent:'flex-end'
    },
    text: {
        marginBottom: 10,
        fontSize: 12,
        paddingLeft: 14
    }
});

export default SectionTitle;