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
            const newId = Math.random().toString();
            listCnt.dispatch({
                type: 'ADD',
                text: value !== 'Untitled list' ? value : `Untitled list (${listCnt.todos.length + 1})`,
                id: newId,
                index: listCnt.todos.length + 1,
                checked: false,
                groupId: ''
            });
            listCnt.U_Dispatch({
                type: 'UNCHECKED_ADD',
                text: value !== 'Untitled list' ? value : `Untitled list (${listCnt.todos.length + 1})`,
                id: newId,
                index: listCnt.todos.length + 1,
                checked: false,
                groupId: ''
            });
        } else {
            listCnt.dispatch({ type: 'UPDATE', payload: { text: value }, id: id });
            listCnt.U_Dispatch({ type: 'UNCHECKED_UPDATE', payload: { text: value }, id: id });
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