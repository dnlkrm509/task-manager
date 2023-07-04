import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Item from './Item';

const List = ({data}) => {
    return (
        <FlatList
            data={data}
            renderItem={(itemData) => (
                <Item
                    text={itemData.item.text}
                    secondText={itemData.item.secondText}
                    thirdText={itemData.item.thirdText}
                    data={itemData.item}
                    button={itemData.item.button}
                    navigateTo={itemData.item.navigateTo}
                    linkTo={itemData.item.linkTo}
                    type={itemData.item.iconType}
                    name={itemData.item.iconName}
                    size={itemData.item.iconSize}
                    color={itemData.item.iconColor}
                />
            ) }
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
        />
    )
};

const styles = StyleSheet.create({});

export default List;