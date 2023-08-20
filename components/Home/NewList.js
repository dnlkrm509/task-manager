import React, { useContext, useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Dialog from 'react-native-dialog';

import AddNew from '../UI/AddNew';
import { GroupContext } from '../../contexts/group-context';

const NewList = ({
    onSetModalIsVisible,
    setIsManageGroupListsModalClosed,
    onSetInitialState,
    onSetGroupId
}) => {
    const navigation = useNavigation();

    const groupCnx = useContext(GroupContext);

    const [isDialogAndroid, setIsDialogAndroid] = useState(false);
    const [enteredValue, setEnteredValue] = useState('Untitled Group');

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
                            onSetInitialState(true);
                            onSetModalIsVisible(true);
                            let id = Math.random().toString();
                            onSetGroupId(id);
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
        <View>    
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
                                onSetInitialState(true);
                                onSetModalIsVisible(true);
                                setIsManageGroupListsModalClosed(false);
                                let id = Math.random().toString();
                                onSetGroupId(id);
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

export default NewList;