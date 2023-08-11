import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Alert,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Dialog from 'react-native-dialog';

import { lists } from '../../data/lists';
import ButtonIcon from '../UI/ButtonIcon';
import Button from '../UI/Button';
import { Icon } from '@rneui/themed';
import { Colors } from '../../constants/colors';
import { FormatNameContext } from '../../contexts/formatNameContext';
import AddNew from '../UI/AddNew';
import { ListContext } from '../../contexts/list-context';
import { GroupContext } from '../../contexts/group-context';
import ModalUI from '../UI/Modal';

const Lists = () => {
    const navigation = useNavigation();
    const deviceWidth = useWindowDimensions().width;

    const nameCtx = useContext(FormatNameContext);
    const listCnt = useContext(ListContext);
    const groupCnx = useContext(GroupContext);

    const [value, setValue] = useState({});
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [groupId, setGroupId] = useState('');
    const [initialState, setInitialState] = useState(false);
    const [checked, setChecked] = useState(false);
    const [newLists, setNewLists] = useState([]);
    const [isDialogAndroid, setIsDialogAndroid] = useState(false);
    const [enteredValue, setEnteredValue] = useState('Untitled Group');
    
    const fName = "dANiEl";
    const lName = "kARimi";
    useEffect(() => {
        setValue(nameCtx.getFormatedName(fName, lName));
    },[nameCtx])
    
    const { fName: newFName, lName: newLName, fullName, fLetterName } = value;

    const onSelectGroupLists = (id) => {
        setInitialState(true);
        setModalIsVisible(true);
        setGroupId(id);
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
    }

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

    let AndroidDialog;
    if(isDialogAndroid) {
        AndroidDialog = (
            <View style={styles.dialogContainer}>
                <Dialog.Container visible={true}>
                    <Dialog.Title>New Group</Dialog.Title>
                    <Dialog.Button
                        label='Cancel'
                        onPress={() => setIsDialogAndroid(false)}/>
                    <Dialog.Button
                        label='Create'
                        onPress={() => {
                            setIsDialogAndroid(false);
                            setInitialState(true);
                            setModalIsVisible(true);
                            let id = Math.random().toString();
                            setGroupId(id);
                            groupCnx.dispatch({
                                type:'ADD',
                                text: enteredValue,
                                index: groupCnx.groups.length,
                                id: id
                            })
                            setEnteredValue('Untitled Group');
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
        <View style={{flex:1,marginBottom:20}}>
            <ModalUI
                modalVisible={modalIsVisible}
                onHideModal={() => setModalIsVisible(false)}
                lineBreak
                height={470}
                headerTitle='Add lists to group'
                buttonText={checked ? 'Add' : 'Skip'}
                onAdd={onAddHandler}
            >
                {
                listCnt.todos.length ? (
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    >
                        <FlatList 
                            data={listCnt.todos.filter(o => listCnt.uncheckedTodos.some(({id,text}) => o.id === id && o.text === text))}
                            renderItem={({item}) => (
                                <View>
                                    <View style={[styles.lineBreak,{backgroundColor:Colors.lineBreak2}]}></View>
                                    <AddNew
                                        containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55}]}
                                        buttonStyle={[styles.nameImageContainer, styles.button]}
                                        onPress={() => {
                                            setInitialState(false);
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
            <View style={[styles.detailsSearchContainer]}>
                <Button
                    buttonStyle={[
                        styles.nameImageContainer,
                        {
                            paddingVertical: 0,
                            paddingHorizontal: 0
                        }
                    ]}
                    onPress={() => navigation.navigate('modal')}
                    fullWidth
                >
                    <View style={styles.image}>
                        <Text>{fLetterName}</Text>
                    </View>
                    <Text style={styles.name}>
                        {fullName}
                    </Text>
                </Button>
                <ButtonIcon
                    name='search'
                    color='blue'
                    size={28}
                    buttonStyle={{padding:0}}
                    onPress={() => navigation.navigate('search')}
                />
            </View>
            <ScrollView
                horizontal={false}
                nestedScrollEnabled={true}
            >
                <ScrollView
                    horizontal={true}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                >
                <FlatList
                    data={lists}
                    renderItem={({ item }) => { return (
                    <Button
                        buttonStyle={[
                            styles.detailsSearchContainer,
                            {
                                justifyContent: 'flex-start',
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                                width: deviceWidth
                            }
                        ]}
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <View style={[styles.image, {backgroundColor:'transparent'}]}>
                            <Icon
                                type={item.icontype}
                                name={item.iconname}
                                size={22}
                                color={item.iconcolor}
                            />
                        </View>
                        <Text style={{fontSize:17}}>{item.title}</Text>
                    </Button>
                    )}}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{alignSelf: 'flex-start', paddingBottom: 5}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                />
                </ScrollView>
                <View style={styles.lineBreak}></View>
                {
                listCnt.uncheckedTodos.length ? (
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    >
                        <FlatList 
                            data={listCnt.uncheckedTodos}
                            renderItem={({item}) => (
                                <AddNew
                                    containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55,width:deviceWidth*89/100}]}
                                    buttonStyle={[styles.nameImageContainer, styles.button]}
                                    onPress={() => navigation.navigate('addnew',{listDetails:item})}
                                    iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                                    iconName='list'
                                    iconSize={28}
                                    iconColor='blue'
                                    text={item.text ==='' ? 
                                            <Text>Untitled list ({item.index})</Text> :
                                            <Text>{item.text}</Text>
                                    }
                                    textStyle={{color:'black'}}
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
                                    ID={item.id}
                                    onSelectGroupLists={onSelectGroupLists}
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
            </ScrollView>
            <AddNew
                containerStyle={[styles.detailsSearchContainer]}
                buttonStyle={styles.nameImageContainer}
                onPress={() => navigation.navigate('addnew')}
                iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                iconName='add'
                iconSize={28}
                iconColor='blue'
                text='New List'
                buttonIcon
                buttonIconType='material-community'
                buttonIconName='format-list-group'
                buttonIconSize={32}
                buttonIconColor='blue'
                buttonIconOnPress={() => {Platform.OS !== 'ios' ?
                setIsDialogAndroid(true) :
                Alert.prompt(
                    "New Group",
                    null,
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "Create",
                            // create a group
                            onPress: (groupName) => {
                                setInitialState(true);
                                setModalIsVisible(true);
                                let id = Math.random().toString();
                                setGroupId(id);
                                groupCnx.dispatch({
                                    type:'ADD',
                                    text: groupName,
                                    index: groupCnx.groups.length,
                                    id: id,
                                    isForwardChevron: true
                                })
                            }
                        }
                    ],
                    "plain-text",
                    "Untitled Group"

                )}}
            />
            
            {isDialogAndroid && AndroidDialog}
        </View>
    )
};

const styles = StyleSheet.create({
    dialogContainer: {
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      },
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
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    lineBreak: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: Colors.lineBreak
    }
});

export default Lists;