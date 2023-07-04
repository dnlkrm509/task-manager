import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFormatedDate } from '../../util/date';

const MyDay = () => {
    const date = new Date();
    const today = getFormatedDate(date);

    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.text]}>
                My Day
            </Text>
            <Text style={[styles.date, styles.text]}>
                {today}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'white'
    },
    title: {
        fontSize:30,
        fontWeight:'bold'
    },
    date: {
        fontSize:18,
    }
});

export default MyDay;