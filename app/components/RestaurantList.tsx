import React, { useState, useEffect, FC } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import { useRouter } from "expo-router";

import { Restaurant } from "../models/Restaurant";
import { GlobalStyles as g_style, ListStyles as style } from "../style/Styles";
import { initializeRestaurants, listRestaurants } from "@/app/utils/HandleRestaurantsCRUD";
// import restaurantsData from "../data/restaurants.json";

interface ListProps {}


const List: FC<ListProps> = () => {
    const router = useRouter();
    const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    // Fetch restaurants when the component mounts
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const data = await listRestaurants();
            if (data == null) {
                await initializeRestaurants()
                fetchRestaurants()
            }
            console.log("Restaurants data:", data);
            setRestaurantsData(data);
            console.log("Restaurants data:", data);
        } catch (err) {
            console.error("Failed to fetch restaurants:", err);
            setError("Failed to load restaurants. Please try again.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchRestaurants();
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchRestaurants();
    };

    const renderRestaurant = ({ item }: { item: Restaurant }) => (
        <TouchableOpacity
            style={style.listItem}
            onPress={() => {
                console.log(
                    `Selected item ${item.id} : ${item.name}, routing to details`
                );
                router.push(`./components/RestaurantDetails?id=${item.id}`);
            }}
        >
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.rating}>Rating: {item.rating.toFixed(1)}</Text>
            <Text style={style.tags}>{item.tags.join(", ")}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={style.loadingContainer}>
                <ActivityIndicator size="large" color="#18638c" />
                <Text>Loading restaurants...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={style.errorContainer}>
                <Text style={style.errorText}>{error}</Text>
                <Button title="Retry" onPress={handleRetry} />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <View style={g_style.row}>
                <Button
                    color="#18638c"
                    title="+ Add restaurant"
                    onPress={() => router.push("./components/AddRestaurantPage")}
                />
            </View>

            <FlatList
                data={restaurantsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRestaurant}
                ListEmptyComponent={
                    <Text style={style.emptyText}>No restaurants found.</Text>
                }
                contentContainerStyle={
                    restaurantsData.length === 0 && style.emptyContainer
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    );
};

export default List;
