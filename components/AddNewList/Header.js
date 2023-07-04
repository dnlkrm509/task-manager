import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Button from '../UI/Button';
import { ListContext } from '../../contexts/list-context';

const Header = ({value,id}) => {
    const listCnt = useContext(ListContext);
    const navigation = useNavigation();

    const submitHandler = () => {
        // Add New List in context
        if (!id) {
            listCnt.dispatch({
                type: 'ADD',
                text: value !== 'Untitled list' ? value : `Untitled list (${listCnt.todos.length + 1})`,
                index: listCnt.todos.length + 1
            });
        } else {
            listCnt.dispatch({ type: 'UPDATE', text: value, id: id });
        }
        navigation.navigate('lists');
    }

    return (
        <View style={styles.container}>
            <Button
                onPress={submitHandler}
            >
                <Text>Header</Text>
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        justifyContent: 'center',
        height: 30
    },
});

export default Header;