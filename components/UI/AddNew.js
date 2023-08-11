import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';

import Button from "./Button";
import ButtonIcon from "./ButtonIcon";

const AddNew = ({
    containerStyle,
    buttonStyle,
    onPress,
    iconContainerStyle,
    iconType,
    iconName,
    iconSize,
    iconColor,
    text,
    textStyle,
    buttonIcon,
    buttonIconType,
    buttonIconName,
    buttonIconSize,
    buttonIconColor,
    buttonIconOnPress,
    group,
    showSublists,
    sublists
}) => {
    let newSublists = [];
    if(sublists)
        newSublists = sublists.reduce((c, n) =>
        c.find(el => el.id === n.id) ? c : [...c, n], []);
    return (
        <View>
            <View style={containerStyle}>
                <Button
                    buttonStyle={buttonStyle}
                    onPress={onPress}
                    fullWidth
                >
                    <View style={iconContainerStyle}>
                        {iconType && <Icon type={iconType} name={iconName} size={iconSize} color={iconColor} />}
                        {!iconType && <Ionicons name={iconName} size={iconSize} color={iconColor} />}
                    </View>
                    <Text style={[styles.textStyle, textStyle]}>
                        {text}
                    </Text>
                </Button>
                {buttonIcon && (
                    <ButtonIcon
                        type={buttonIconType}
                        name={buttonIconName}
                        size={buttonIconSize}
                        color={buttonIconColor}
                        onPress={buttonIconOnPress}
                    />
                )}
            </View>
            {console.log(typeof(showSublists))}
            {group ?
                showSublists ?
                    newSublists.length > 0 ?
                        (
                            <FlatList
                                data={newSublists}
                                renderItem={({item}) => (<Text>{item.text}</Text>)}
                            />
                        )
                    :
                            <Text>Tap or Drag Here to Add Lists</Text>
                :
                console.log('Sublists are hidden')
            :
                console.log('This item is not a group')
            }
        </View>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        color: 'blue',
        fontSize: 17
    }
});

export default AddNew;