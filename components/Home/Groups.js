import React, { useContext, useState, useEffect } from "react";
import {
    useWindowDimensions,
    ScrollView,
    FlatList,
    View,
    Text,
    Alert,
    Platform,
    StyleSheet
} from "react-native";
import Dialog from 'react-native-dialog';

import AddNew from "../UI/AddNew";
import { Colors } from "../../constants/colors";
import { GroupContext } from "../../contexts/group-context";
import ModalUI from '../UI/Modal';
import { ListContext } from "../../contexts/list-context";

const Groups = ({
    initialState,
    modalIsVisible,
    groupId,
    onSetGroupId,
    onSetModalIsVisible,
    onSetInitialState
}) => {
    const groupCnx = useContext(GroupContext);
    const listCnt = useContext(ListContext);

    const deviceWidth = useWindowDimensions().width;

    const [modalEditGroupIsVisible, setModalEditGroupIsVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [newLists, setNewLists] = useState([]);
    const [groupLists, setGroupLists] = useState([]);
    const [middleModalData, setMiddleModalData] = useState([]);
    const [isManageGroupListsModalClosed, setIsManageGroupListsModalClosed] = useState(false);
    const [isEditGroupModalClosed, setIsEditGroupModalClosed] = useState(true);
    const [isDialogAndroid, setIsDialogAndroid] = useState(false);
    const [enteredValue, setEnteredValue] = useState('Group Name');

    let listChecked = false;

    for(const key in listCnt.todos) {
        if (listCnt.todos[key].checked) {
            listChecked = true;
        }
    }

    useEffect(() => {
        if(listChecked && !initialState)
            setChecked(true);
        else
            setChecked(false);
    }, [listChecked, initialState])

    const itemsHandler = (newItem) => {
        const updatableItemIndex = newLists.findIndex(
            (item) => item.id === newItem.id
        );


        if(updatableItemIndex === -1)
            setNewLists((prevLists) => [...prevLists, newItem])
        else {
            const myNewLists = [...newLists];
            myNewLists[updatableItemIndex] = newItem;
            if(!newItem.checked)
                setNewLists((prevLists) => 
                    prevLists.filter((item) => item.id !== newItem.id)
                )
            else
                setNewLists(myNewLists);
        }

    }

    const onSelectGroupLists = (id) => {
        onSetInitialState(true);
        onSetModalIsVisible(true);
        onSetGroupId(id);
    }

    const onCancelHandler = () => {
        newLists.forEach((item) => {
            if(item.checked) {
                listCnt.dispatch({
                    type:'UPDATE',
                    id: item.id,
                    payload: {
                        groupId: '',
                        checked: false
                    }
                })
            }
        })
    }

    const onSkipHandler = () => {
        setNewLists([]);
    }

    const onAddHandler = () => {
        newLists.forEach((item) => {
            if(item.checked) {
                listCnt.Ch_Dispatch({
                    type:'CHECKED_ADD',
                    id: item.id,
                    text: item.text,
                    index: item.index,
                    groupId: item.groupId
                })
    
                listCnt.U_Dispatch({
                    type:'UNCHECKED_DELETE',
                    id: item.id
                })
                
                if(item.groupId.trim().length === 0) {
                    listCnt.Ch_Dispatch({
                        type:'CHECKED_UPDATE',
                        id: item.id,
                        payload: {
                            groupId: groupId
                        }
                    })
                }
                                
            } else {
                listCnt.U_Dispatch({
                    type:'UNCHECKED_ADD',
                    id: item.id,
                    text: item.text,
                    index: item.index,
                    groupId: item.groupId
                })
    
                listCnt.Ch_Dispatch({
                    type:'CHECKED_DELETE',
                    id: item.id
                })
                
                if(item.groupId.trim().length !== 0) {
                    listCnt.U_Dispatch({
                        type:'UNCHECKED_UPDATE',
                        id: item.id,
                        payload: {
                            groupId: ''
                        }
                    })
                }

            }
        })

        setNewLists([]);
    }

    useEffect(() => {
        setGroupLists([]);
        setMiddleModalData(listCnt.todos.filter(o => listCnt.uncheckedTodos.some(({id,text}) => o.id === id && o.text === text)));
        for(let item of listCnt.checkedTodos) {
            if(item.groupId === groupId) {
                setGroupLists((prevValue) => [...prevValue, item]);
                setMiddleModalData((prevValue) => [...prevValue, item]);
            }
        }
    }, [listCnt, groupId]);
    
    const onAddListHandler = () => {
        setModalEditGroupIsVisible(false);
        if(!isEditGroupModalClosed) {
            onSetModalIsVisible(true);
        }
    }

    let AndroidDialog;
    if(isDialogAndroid) {
        AndroidDialog = (
            <View style={styles.dialogContainer}>
                <Dialog.Container visible={true}>
                    <Dialog.Title>Rename Group</Dialog.Title>
                    <Dialog.Button
                        label='Cancel'
                        onPress={() => {
                            setIsDialogAndroid(false);
                            setModalEditGroupIsVisible(false);
                            setIsManageGroupListsModalClosed(true);
                            setIsEditGroupModalClosed(true);
                        }}/>
                    <Dialog.Button
                        label='Rename'
                        onPress={() => {
                            setIsDialogAndroid(false);
                            setModalEditGroupIsVisible(false);
                            setIsManageGroupListsModalClosed(true);
                            setIsEditGroupModalClosed(true);
                            groupCnx.dispatch({
                                type:'UPDATE',
                                id: groupId,
                                payload: {
                                    text: enteredValue,
                                }
                            })
                            setEnteredValue('Group Name');
                        }} />
                        <Dialog.Input
                            onChangeText={(enteredValue) => setEnteredValue(enteredValue)}
                            value={enteredValue}
                        />
                </Dialog.Container>
            </View>
        )
    }

    return (
        <View>
            {!isManageGroupListsModalClosed && (
                <ModalUI
                    modalVisible={modalIsVisible}
                    onModalHide={() => {
                        onSetModalIsVisible(false);
                        setIsManageGroupListsModalClosed(true);
                        setIsEditGroupModalClosed(false);
                    }}
                    height={470}
                    position='middle'
                    headerTitle='Add lists to group'
                    buttonText={checked ? 'Add' : 'Skip'}
                    onAdd={onAddHandler}
                    onCancel={onCancelHandler}
                    onSkip={onSkipHandler}
                    contentTop={50}
                >
                    {
                    listCnt.todos.length ? (
                        <ScrollView
                            horizontal={true}
                            scrollEnabled={false}
                            nestedScrollEnabled={true}
                        >
                            <FlatList 
                                data={middleModalData}
                                renderItem={({item}) => (
                                    <View>
                                        <View style={[styles.lineBreak,{backgroundColor:Colors.lineBreak2}]}></View>
                                        <AddNew
                                            containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55}]}
                                            buttonStyle={[styles.nameImageContainer, styles.button]}
                                            onPress={() => {
                                                onSetInitialState(false);
                                                const selectedList = listCnt.todos.find(
                                                    (todo) => todo.id === item.id
                                                );

                                                if (!selectedList.checked) {
                                                    listCnt.dispatch({
                                                        type:'UPDATE',
                                                        id: item.id,
                                                        payload: {
                                                            groupId: groupId,
                                                            checked: true
                                                        }
                                                    })
                                                    itemsHandler({
                                                        ...item,
                                                        checked: true,
                                                        groupId: groupId
                                                    });
                                                } else {
                                                    listCnt.dispatch({
                                                        type:'UPDATE',
                                                        id: item.id,
                                                        payload: {
                                                            groupId: '',
                                                            checked: false
                                                        }
                                                    })
                                                    itemsHandler({
                                                        ...item,
                                                        checked: false,
                                                        groupId: ''
                                                    });                                               
                                                }


                                            }}
                                            iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                                            iconName='list'
                                            iconSize={28}
                                            iconColor='blue'
                                            text={
                                                item.text ==='' ?
                                                <Text>Untitled list ({item.index})</Text> :
                                                <Text>{item.text}</Text>
                                            }
                                            textStyle={{color:'black'}}
                                            fullWidth
                                            buttonIcon
                                            buttonIconName={item.checked ? 'checkmark' : 'add'}
                                            buttonIconSize={32}
                                            buttonIconColor='blue'
                                        />
                                        {item.index === listCnt.todos.length && <View style={[styles.lineBreak,{backgroundColor:Colors.lineBreak2}]}></View>}
                                    </View>
                                )}
                                keyExtractor={(todo) => todo.id}
                                showsVerticalScrollIndicator={false}
                                alwaysBounceVertical={false}
                            />
                        </ScrollView>
                    ) : (
                        <Text></Text>
                    )
                    }
                </ModalUI>
            )}
            {!isEditGroupModalClosed && (
                <ModalUI
                    modalVisible={modalEditGroupIsVisible}
                    onModalHide={() => {
                        setModalEditGroupIsVisible(false);
                        setIsManageGroupListsModalClosed(false);
                        setIsEditGroupModalClosed(true);
                    }}
                    height={270}
                    position='bottomEditGroup'
                    headerTitle={`Group Options`}
                    buttonText={'Done'}
                    onBackdropPress={() => setModalEditGroupIsVisible(false)}
                    propagateSwipe
                    swipeDirection='down'
                    onSwipeComplete={() => setModalEditGroupIsVisible(false)}
                >
                    <AddNew
                        containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55}]}
                        buttonStyle={[styles.nameImageContainer, styles.button]}
                        onPress={onAddListHandler}
                        iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                        iconName='list'
                        iconSize={28}
                        iconColor='black'
                        text={<Text>Add/Remove Lists</Text>}
                        textStyle={{color:'black'}}
                        fullWidth
                    />
                    <AddNew
                        containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55}]}
                        buttonStyle={[styles.nameImageContainer, styles.button]}
                        onPress={() => {
                            Platform.OS !== 'ios' ?
                                 setIsDialogAndroid(true)
                            :
                                Alert.prompt(
                                    "Rename Group",
                                    null,
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel",
                                            onPress: () => {
                                                setModalEditGroupIsVisible(false);
                                                setIsManageGroupListsModalClosed(true);
                                                setIsEditGroupModalClosed(true);
                                            }
                                        },
                                        {
                                            text: "Rename",
                                            // Rename the group
                                            onPress: (groupName) => {
                                                setModalEditGroupIsVisible(false);
                                                setIsManageGroupListsModalClosed(true);
                                                setIsEditGroupModalClosed(true);
                                                groupCnx.dispatch({
                                                    type:'UPDATE',
                                                    id: groupId,
                                                    payload: {
                                                        text: groupName,
                                                    }
                                                })
                                            }
                                        }
                                    ],
                                    "plain-text",
                                    "Group Name"
                                )
                            }
                        }
                        iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                        iconType='material-community'
                        iconName='format-list-group'
                        iconSize={28}
                        iconColor='black'
                        text={<Text>Rename Group</Text>}
                        textStyle={{color:'black'}}
                        fullWidth
                    />
                    <AddNew
                        containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55}]}
                        buttonStyle={[styles.nameImageContainer, styles.button]}
                        onPress={() => {}}
                        iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                        iconName='trash-outline'
                        iconSize={20}
                        iconColor='red'
                        text={groupLists.length > 0 ? <Text>Ungroup Lists</Text> : <Text>Delete Group</Text>}
                        textStyle={{color:'red'}}
                        fullWidth
                    />
                </ModalUI>
            )}
            

            {
                groupCnx.groups.length ? (
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    >
                        <FlatList 
                            data={groupCnx.groups}
                            renderItem={({item}) => (
                                <AddNew
                                    containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55,width:deviceWidth*89/100}]}
                                    buttonStyle={[styles.nameImageContainer, styles.button]}
                                    onPress={() => {
                                        groupCnx.dispatch({
                                            type:'UPDATE',
                                            id: item.id,
                                            payload: {
                                                isForwardChevron: !item.isForwardChevron
                                            }
                                        })
                                    }}
                                    iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                                    iconType='material-community'
                                    iconName='format-list-group'
                                    iconSize={28}
                                    iconColor='blue'
                                    text={
                                            item.text === 'Untitled Group' ?
                                                item.index < 1 ?
                                                    <Text>Untitled Group</Text>
                                                    :
                                                    <Text>Untitled Group {item.index}</Text>
                                                :
                                            <Text>{item.text}</Text>
                                    }
                                    textStyle={{color:'black',fontWeight:'bold'}}
                                    buttonIcon
                                    buttonIconType='ionicon'
                                    buttonIconName={item.isForwardChevron ? 'chevron-forward' : 'chevron-down'}
                                    buttonIconSize={28}
                                    buttonIconColor={Colors.GroupChevron}
                                    group
                                    showSublists={!item.isForwardChevron}
                                    sublists={listCnt.checkedTodos.filter((todo) => todo.groupId === item.id)}
                                    secondButtonIconType='ionicon'
                                    secondButtonIconName={'ellipsis-horizontal'}
                                    secondButtonIconSize={28}
                                    secondButtonIconColor={Colors.GroupChevron}
                                    secondButtonIconOnPress={() => {
                                        let id = '';
                                        id = item.id;
                                        onSetGroupId(id);
                                        setIsManageGroupListsModalClosed(true);
                                        setIsEditGroupModalClosed(false);
                                        setModalEditGroupIsVisible(true)
                                    }}
                                    ID={item.id}
                                    onSelectGroupLists={onSelectGroupLists}
                                    onFirstModalClose={() => setIsManageGroupListsModalClosed(false)}
                                />
                            )}
                            keyExtractor={(todo) => todo.id}
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
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
    image: {
        borderRadius: 50,
        width: 30,
        height: 30,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    }
});

export default Groups;