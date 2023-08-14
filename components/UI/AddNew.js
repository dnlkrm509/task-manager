import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Animated,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { SwipeListView } from "react-native-swipe-list-view";
import { ListContext } from "../../contexts/list-context";

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
    sublists,
    ID,
    onSelectGroupLists
}) => {
    const [rowSwipeAnimatedValues] = useState(new Animated.Value(0));
    const [trashIsRight, setTrashIsRight] = useState(true);

    const listCnt = useContext(ListContext);

    let newSublists = [];
    if(sublists)
        newSublists = sublists.reduce((c, n) =>
        c.find(el => el.id === n.id) ? c : [...c, n], []);

    const navigation = useNavigation();
    const deviceWidth = useWindowDimensions().width;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                rowSwipeAnimatedValues,
                {
                  toValue: 1,
                  duration: 10000,
                  useNativeDriver: true
                }
              ),
              Animated.spring(
                rowSwipeAnimatedValues,
                {
                    toValue: 1,
                    useNativeDriver: true
                }
            )
        ]).start();
    }, [rowSwipeAnimatedValues])

    const interpolatedValue = rowSwipeAnimatedValues.interpolate({
        inputRange: [0, 128],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues.setValue(Math.abs(value));
    };

    const closeRow = (rowMap, rowKey) => {
        if(rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        listCnt.dispatch({
            type:'DELETE',
            id: rowKey
        })
        listCnt.Ch_Dispatch({
            type:'CHECKED_DELETE',
            id: rowKey
        })
    }

    const onLeftAction = () => {}

    const onRightAction = (rowKey) => {
        setTrashIsRight((prevState) => !prevState)
        listCnt.dispatch({
            type:'DELETE',
            id: rowKey
        })
        listCnt.Ch_Dispatch({
            type:'CHECKED_DELETE',
            id: rowKey
        })
    }

    const HiddenItemWithActions = props => {
        const {
            leftActionActivated,
            rightActionActivated,
            rowActionAnimatedValue,
            onDelete
        } = props;


        if(rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
                useNativeDriver: true
            }).start();
        }

        const backRightBtn = [styles.backRightBtn, styles.backRightBtnRight];
        if(trashIsRight) {
            backRightBtn.push({ alignItems:'flex-end', right: 45 })
        } else {
            backRightBtn.push({ alignItems:'flex-start', left: 0 })
        }

        return (
            <Animated.View style={[
                    styles.rowBack
                ]}>
                <TouchableOpacity
                    style={[backRightBtn]}
                    onPress={onDelete}
                >
                    <Animated.View
                        style={[
                            styles.trash,
                            {
                                transform: [
                                    {
                                        scale: interpolatedValue
                                    },
                                ],
                            },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name='trash-can-outline'
                            color='#fff'
                            size={20}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    const renderHiddenItem = (data,rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onDelete={() => deleteRow(rowMap, data.item.id)}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
            />
        )
    }

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
            {group ?
                showSublists ?
                    newSublists.length > 0 ?
                        (
                            <SwipeListView
                                data={newSublists}
                                renderItem={({item}) => (
                                    <View style={[containerStyle,{backgroundColor:Colors.listBackgroundColor}]}>
                                        <Button
                                            buttonStyle={[buttonStyle,styles.groupButton, {justifyContent:'flex-start',paddingLeft:10}]}
                                            onPress={() => {navigation.navigate('addnew',{listDetails:item,isExist:true})}}
                                            fullWidth
                                        >
                                            <View style={iconContainerStyle}>
                                                <Ionicons name='list' size={28} color='blue' />
                                            </View>
                                            <Text style={[styles.textStyle, textStyle, { fontWeight: 'normal' }]}>
                                                {item.text}
                                            </Text>
                                        </Button>
                                    </View>
                                )}
                                renderHiddenItem={renderHiddenItem}
                                keyExtractor={(todo) => todo.id}
                                showsVerticalScrollIndicator={false}
                                alwaysBounceVertical={false}
                                rightOpenValue={-128}
                                disableRightSwipe
                                onSwipeValueChange={onSwipeValueChange}
                                previewRowKey={'0'}
                                previewOpenValue={-40}
                                previewOpenDelay={3000}
                                rightActivationValue={-200}
                                rightActionValue={-500}
                                onRightActionStatusChange={() => {setTrashIsRight((prevState) => !prevState)}}
                                onRightAction={onRightAction}
                                closeOnRowBeginSwipe
                            />
                        )
                    :
                        <View style={containerStyle}>
                            <Button
                                buttonStyle={[buttonStyle,styles.groupButton,{width: deviceWidth*80/100}]}
                                onPress={() => {onSelectGroupLists(ID)}}
                                fullWidth
                            >
                                <Text style={[styles.textStyle, textStyle, { fontWeight: 'normal',color:Colors.groupText }]}>
                                    Tap or Drag Here to Add Lists
                                </Text>
                            </Button>
                        </View>
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
    },
    groupButton: {
        justifyContent: 'center',
        height: 55,
        borderRadius: 0,
        borderLeftWidth: 2,
        borderLeftColor: Colors.lineBreak,
        marginLeft: 20
    },
    rowBack: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      paddingLeft: 15,
      margin: 5,
      marginBottom: 15,
      borderRadius: 5,
    },
    backRightBtn: {
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: '100%',
      paddingRight: 17,
    },
    backRightBtnRight: {
      backgroundColor: 'red'
    },
    trash: {
      height: 25,
      width: 25,
      marginRight: 7,
    },
});

export default AddNew;