import React, { useEffect, useContext, useState } from "react";
import { View, Text, ScrollView, Animated, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AddNew from "../UI/AddNew";
import { ListContext } from '../../contexts/list-context';
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";
import ModalUI from "../UI/Modal";

const GroupLists = () => {
    const listCnt = useContext(ListContext);
    const navigation = useNavigation();

    const deviceWidth = useWindowDimensions().width;

    const [rowId, setRowId] = useState('');
    const [rowSwipeAnimatedValues] = useState(new Animated.Value(0));
    const [modalDeleteConfirmarionIsVisible, setModalDeleteConfirmationIsVisible] = useState(false);
    const [modalDeleteConfirmed, setModalDeleteConfirmed] = useState(false);
    const [modalDeleteCancelled, setModalDeleteCancelled] = useState(false);
    const [trashIsRight, setTrashIsRight] = useState(true);

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
        setRowId(rowKey);
        setModalDeleteConfirmationIsVisible(true);
    }

    const onRightAction = (rowKey) => {
        setRowId(rowKey);
        setTrashIsRight(false);
        setModalDeleteConfirmationIsVisible(true);
    }

    useEffect(() => {
        if(modalDeleteConfirmed) {
            listCnt.dispatch({
                type:'DELETE',
                id: rowId
            })
            listCnt.U_Dispatch({
                type:'UNCHECKED_DELETE',
                id: rowId
            })
            setModalDeleteConfirmed(false);
            setModalDeleteConfirmationIsVisible(false);
            setTrashIsRight(true);
        }
    }, [modalDeleteConfirmed, rowId, listCnt])

    const HiddenItemWithActions = props => {
        const {
            leftActionActivated,
            rightActionActivated,
            rowActionAnimatedValue,
            data,
            rowMap,
            onDelete
        } = props;


        if(rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
                useNativeDriver: true
            }).start();
        }

        if(modalDeleteCancelled) {
            closeRow(rowMap,data.item.id);
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
            <ModalUI
                modalVisible={modalDeleteConfirmarionIsVisible}
                onHideModal={() => {
                    setModalDeleteCancelled(true);
                    setModalDeleteConfirmationIsVisible(false);
                }}
                height={170}
                position='bottomDeleteConfirmation'
                headerTitle={`"list Name" will be permanently deleted.`}
                onBackdropPress={() => {
                    setModalDeleteCancelled(true);
                    setModalDeleteConfirmationIsVisible(false);
                    setTrashIsRight(true);
                }}
                contentTop={30}
            >
                <Button
                    onPress={() => {
                        setModalDeleteConfirmed(true)
                        setTrashIsRight(true);
                    }}
                    buttonStyle={[styles.deleteButton]}
                >
                    <Text style={[styles.buttonText, {color:'red'}]}>Delete List</Text>
                </Button>
                <View style={{height:8,backgroundColor:Colors.listBackgroundColor,borderRadius:12}}></View>
                <Button
                    onPress={() => {
                        setModalDeleteCancelled(true);
                        setModalDeleteConfirmationIsVisible(false);
                        setTrashIsRight(true);
                    }}
                    buttonStyle={[styles.deleteButton]}
                >
                    <Text style={[styles.buttonText]}>Cancel</Text>
                </Button>
            </ModalUI>
            {
                listCnt.uncheckedTodos.length ? (
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    >
                        <SwipeListView 
                            data={listCnt.uncheckedTodos}
                            renderItem={ ( rowData, rowMap ) => (
                                    <AddNew
                                        containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55,width:deviceWidth,backgroundColor:Colors.listBackgroundColor}]}
                                        buttonStyle={[styles.nameImageContainer, styles.button]}
                                        onPress={() => navigation.navigate('addnew',{listDetails:rowData.item,isExist:true})}
                                        iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                                        iconName='list'
                                        iconSize={28}
                                        iconColor='blue'
                                        text={rowData.item.text ==='' ? 
                                                <Text>Untitled list ({rowData.item.index})</Text> :
                                                <Text>{rowData.item.text}</Text>
                                        }
                                        textStyle={{color:'black'}}
                                    />
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
                            onRightAction={onRightAction}
                            closeOnRowBeginSwipe
                        />
                    </ScrollView>
                ) : (
                    <Text></Text>
                )
            }
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
    button: {
        borderRadius: 8,
        paddingVertical: 1,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    buttonText: {
        color: 'blue',
        fontSize: 17
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
      }
});

export default GroupLists;