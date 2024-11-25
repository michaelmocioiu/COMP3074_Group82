import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Button } from "react-native";
import { useRouter } from "expo-router";

import { Restaurant } from "../models/Restaurant";
import { GlobalStyles as g_style, ListStyles as style } from "../style/Styles";
import restaurantsData from "../data/restaurants.json";

const List = () => {
    const router = useRouter();

    const renderRestaurant = ({ item }: { item: Restaurant }) => (
        <TouchableOpacity
            style={style.listItem}
            onPress={() => {
                console.log(`Selected item ${item.id} : ${item.name}, routing to details`);
                router.push(`./components/RestaurantDetails?id=${item.id}`);
            }}
        >
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.rating}>Rating: {item.rating.toFixed(1)}</Text>
            <Text style={style.tags}>{item.tags.join(", ")}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={style.container}>
            <View style={g_style.row}>
                <Button
                    color={"#18638c"}
                    title="+ Add restaurant"
                    onPress={() => router.push("./components/AddRestaurantPage")}
                />
            </View>

            <FlatList
                data={restaurantsData}
                keyExtractor={(item) => item.id}
                renderItem={renderRestaurant}
                ListEmptyComponent={<Text style={style.emptyText}>No restaurants found.</Text>}
            />
        </View>
    );
};

export default List;
