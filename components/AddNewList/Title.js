import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import { ListContext } from '../../contexts/list-context';
import { Colors } from '../../constants/colors';

const Title = ({onSetValue,id}) => {
    const [isFocused, setIsFocused] = useState(false);
    const listCnx = useContext(ListContext);
    const storedValue = listCnx.todos.find(
        (todo) => todo.id === id
    )
    const [value, setValue] = useState(id ? storedValue.text : 'Untitled list');
    const deviceWidth = useWindowDimensions().width;
    const inputStyle = [styles.text];

    const focusHandler = () => {
        setIsFocused(true);
    }

    const blurHandler = () => {
        setIsFocused(false);
    }

    if (isFocused) {
        inputStyle.push(styles.focused);
    } else {
        inputStyle.push(styles.blured);
    }

    const inputChangeHandler = (enteredValue) => {
        setValue(enteredValue);
    }
    useEffect(() => {
        onSetValue(value);
    }, [value])

    return (
        <View style={[styles.container, {width:deviceWidth*0.90}]}>
            <TextInput
                autoFocus
                onFocus={focusHandler}
                onBlur={blurHandler}
                selectionColor='white'
                style={inputStyle}
                onChangeText={inputChangeHandler}
                value={value}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    text: {
        fontSize:30,
        fontWeight:'bold',
        color: 'white',
        borderRadius: 6,
        padding: 10,
        backgroundColor: Colors.purplish
    },
    focused: {
        backgroundColor: Colors.purplishLighter
    },
    blured: {
        backgroundColor: Colors.purplish
    }
});

export default Title;