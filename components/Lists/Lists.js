import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { lists } from '../../data/lists';
import ButtonIcon from '../UI/ButtonIcon';
import Button from '../UI/Button';
import { Icon } from '@rneui/themed';
import { Colors } from '../../constants/colors';
import { FormatNameContext } from '../../contexts/formatNameContext';
import AddNew from '../UI/AddNew';
import { ListContext } from '../../contexts/list-context';
import { GroupContext } from '../../contexts/group-context';

const Lists = () => {
    const navigation = useNavigation();
    const deviceHeight = useWindowDimensions().height;
    const deviceWidth = useWindowDimensions().width;

    const nameCtx = useContext(FormatNameContext);
    const listCnt = useContext(ListContext);
    const groupCnx = useContext(GroupContext);

    const [value, setValue] = useState({});

    const fName = "dANiEl";
    const lName = "kARimi";
    useEffect(() => {
        setValue(nameCtx.getFormatedName(fName, lName));
    },[nameCtx])
    
    const { fName: newFName, lName: newLName, fullName, fLetterName } = value;
    const { list:todos } = listCnt;
    
    return (
        <View style={{flex:1,marginBottom:20}}>
            <View style={[styles.detailsSearchContainer, {marginRight:24}]}>
                <Button
                    buttonStyle={[
                        styles.nameImageContainer,
                        {
                            paddingVertical: 0,
                            paddingHorizontal: 0
                        }
                    ]}
                    onPress={() => navigation.navigate('modal')}
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
                listCnt.todos.length ? (
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    >
                        <FlatList 
                            data={listCnt.todos}
                            renderItem={({item}) => (
                                <AddNew
                                    containerStyle={[styles.detailsSearchContainer, {marginBottom:0,height:55,width:deviceWidth*89/100}]}
                                    buttonStyle={[styles.nameImageContainer, styles.button]}
                                    onPress={() => navigation.navigate('addnew',{listDetails:item})}
                                    iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                                    iconName='list'
                                    iconSize={28}
                                    iconColor='blue'
                                    text={item.text ==='' ? <Text>Untitled list ({item.index})</Text> : <Text>{item.text}</Text>}
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
                                    iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                                    iconType='material-community'
                                    iconName='format-list-group'
                                    iconSize={28}
                                    iconColor='blue'
                                    text={item.text ==='Untitled Group' ? item.index < 1 ? <Text>Untitled Group</Text> : <Text>Untitled Group {item.index}</Text> : <Text>{item.text}</Text>}
                                    textStyle={{color:'black',fontWeight:'bold'}}
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
                containerStyle={[styles.detailsSearchContainer, {marginRight:24}]}
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
                buttonIconOnPress={() => Alert.prompt(
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
                                console.log(groupCnx.groups.length)
                                groupCnx.dispatch({
                                    type:'ADD',
                                    text: groupName,
                                    index: groupCnx.groups.length
                                })
                            }
                        }
                    ],
                    "plain-text",
                    "Untitled Group"

                )}
            />
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
        borderRadius:'50%',
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