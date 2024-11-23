import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { Restaurant } from "../models/Restaurant";
import { GlobalStyles } from "../style/Styles";
import restaurantsData from "../data/restaurants.json";

const List = () => {
    const router = useRouter()
    const renderRestaurant = ({ item }: { item: Restaurant }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => router.push(`./pages/Details?id=${item.id}`)}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.rating}>Rating: {item.rating.toFixed(1)}</Text>
          <Text style={styles.tags}>
            {item.tags.join(", ")}
          </Text>
        </TouchableOpacity>
      );
    
      return (
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.title}>Restaurants</Text>
          <FlatList
            data={restaurantsData}
            keyExtractor={(item) => item.id}
            renderItem={renderRestaurant}
            ListEmptyComponent={<Text style={styles.emptyText}>No restaurants found.</Text>}
          />
        </View>
    );
}
export default List
const styles = StyleSheet.create({

    listItem: {
      padding: 16,
      marginVertical: 8,
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
    },
    rating: {
      fontSize: 14,
      color: "#555",
      marginVertical: 4,
    },
    tags: {
      fontSize: 12,
      color: "#777",
    },
    emptyText: {
      textAlign: "center",
      fontSize: 16,
      color: "#888",
      marginTop: 20,
    },
  });