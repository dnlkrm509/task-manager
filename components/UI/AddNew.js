import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
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
            {showSublists && console.log(newSublists)}
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