import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { GlobalStyles as g_style, DetailsStyles as style } from "../style/Styles";
import { View, Text, TouchableOpacity, Modal, Alert, Share, Linking, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { deleteRestaurant, findRestaurant, listRestaurants } from "@/app/utils/HandleRestaurantsCRUD";

type Restaurant = {
    id: string;
    name: string;
    address: string;
    phones: string[];
    description: string;
    tags: string[];
    rating: number;
    location: {
        latitude: number;
        longitude: number;
    };
};

const RestaurantDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    useEffect(() => {
        findRestaurant(id).then((restaurantResponse) => {
            setRestaurant(restaurantResponse);
        });
    }, [id]);

    if (!restaurant) {
        return (
            <View style={g_style.container}>
                <Text style={g_style.title}>Restaurant Not Found</Text>
            </View>
        );
    }

    const fetchCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission Denied",
                    "Location access is required to get directions. Please enable location permissions in settings."
                );
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
            console.log("User Location:", location.coords);
        } catch (error) {
            console.error("Error fetching location:", error);
            Alert.alert("Error", "Unable to fetch your current location. Please try again.");
        }
    };

    const getDirections = async () => {
        if (!currentLocation) {
            await fetchCurrentLocation();
            if (!currentLocation) {
                Alert.alert(
                    "Location Not Available",
                    "Your current location could not be fetched. Please try again."
                );
                return;
            }
        }

        const destination = `${restaurant.location.latitude},${restaurant.location.longitude}`;
        const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        Linking.openURL(url);
    };

    const handleDelete = async () => {
        Alert.alert(
            "Delete Restaurant",
            `Are you sure you want to delete ${restaurant.name}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        console.log("Deleting restaurant:", restaurant.name);
                        await deleteRestaurant(restaurant.id);
                        router.push("/");
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const handleShareGmail = async () => {
        const subject = `Check out ${restaurant.name}!`;
        const body = `Check out this restaurant: ${restaurant.name}\n\n` +
            `Address: ${restaurant.address}\n` +
            `Rating: ${restaurant.rating} ⭐\n\n` +
            `Description: ${restaurant.description}\n\n` +
            `Find it on the map: https://www.google.com/maps/search/?api=1&query=${restaurant.location.latitude},${restaurant.location.longitude}`;

        let gmailUrl = "";

        if (Platform.OS === "android") {
            gmailUrl = `googlegmail://co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else if (Platform.OS === "ios") {
            gmailUrl = `googlegmail://co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }

        const defaultMailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        try {
            const canOpenGmail = await Linking.canOpenURL(gmailUrl);
            if (canOpenGmail) {
                await Linking.openURL(gmailUrl);
            } else {
                const canOpenMail = await Linking.canOpenURL(defaultMailUrl);
                if (canOpenMail) {
                    await Linking.openURL(defaultMailUrl);
                } else {
                    Alert.alert("Error", "No email client is available to send the email.");
                }
            }
            toggleMenu();
        } catch (error) {
            console.error("Error sharing via Gmail:", error);
            Alert.alert("Error", "Unable to share via Gmail. Please try again.");
        }
    };

    const handleShareTwitter = async () => {
        try {
            const tweet = encodeURIComponent(
                `Check out this restaurant: ${restaurant.name} ⭐\n` +
                `${restaurant.address}\n` +
                `Description: ${restaurant.description}\n` +
                `Find it here: https://www.google.com/maps/search/?api=1&query=${restaurant.location.latitude},${restaurant.location.longitude}`
            );
            const twitterUrl = `https://twitter.com/intent/tweet?text=${tweet}`;

            const supported = await Linking.canOpenURL(twitterUrl);
            if (supported) {
                await Linking.openURL(twitterUrl);
            } else {
                Alert.alert("Unavailable", "Twitter is not available on this device.");
            }

            toggleMenu();
        } catch (error) {
            console.error("Error sharing on Twitter:", error);
            Alert.alert("Error", "Unablehjghij to share on Twitter. Please try again.");
        }
    };

    const handleShareFacebook = async () => {
        try {
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://www.google.com/maps/search/?api=1&query=${restaurant.location.latitude},${restaurant.location.longitude}`
            )}`;

            const supported = await Linking.canOpenURL(facebookUrl);
            if (supported) {
                await Linking.openURL(facebookUrl);
            } else {
                Alert.alert("Unavailable", "Facebook is not available on this device.");
            }

            toggleMenu();
        } catch (error) {
            console.error("Error sharing on Facebook:", error);
            Alert.alert("Error", "Unable to share on Facebook. Please try again.");
        }
    };

    return (
        <View style={g_style.container}>
            <View style={style.row}>
                <Text style={style.restaurantName}>
                    {restaurant.name} | {restaurant.rating} ⭐
                </Text>
                <TouchableOpacity onPress={toggleMenu} style={g_style.dotMenuButton}>
                    <Text style={g_style.dots}>⋮</Text>
                </TouchableOpacity>
            </View>

            <Text style={style.restaurantAddress}>{restaurant.address}</Text>

            <MapView
                style={style.mapView}
                initialRegion={{
                    latitude: restaurant.location.latitude,
                    longitude: restaurant.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: restaurant.location.latitude,
                        longitude: restaurant.location.longitude,
                    }}
                    title={restaurant.name}
                />
            </MapView>

            <TouchableOpacity onPress={getDirections} style={g_style.button}>
                <Text style={g_style.buttonText}>Get Directions</Text>
            </TouchableOpacity>

            <Text style={style.subHeader}>Phones:</Text>
            {restaurant.phones.map((phone, index) => (
                <Text key={index} style={style.restaurantPhone}>
                    {phone}
                </Text>
            ))}

            <Text style={style.subHeader}>Description:</Text>
            <Text style={style.restaurantDescription}>{restaurant.description}</Text>

            <Modal
                transparent
                animationType="fade"
                visible={menuVisible}
                onRequestClose={toggleMenu}
            >
                <TouchableOpacity style={g_style.overlay} onPress={toggleMenu}>
                    <View style={g_style.dotmenu}>
                        <TouchableOpacity
                            style={g_style.dotmenuItem}
                            onPress={() => {
                                toggleMenu();
                                router.push('/components/AddRestaurantPage?id=' + id);
                            }}
                        >
                            <Text style={g_style.menuText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={g_style.dotmenuItem}
                            onPress={handleShareGmail}
                        >
                            <Text style={g_style.menuText}>Share via email</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={g_style.dotmenuItem}
                            onPress={handleShareTwitter}
                        >
                            <Text style={g_style.menuText}>Share on Twitter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={g_style.dotmenuItem}
                            onPress={handleShareFacebook}
                        >
                            <Text style={g_style.menuText}>Share on Facebook</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={g_style.dotmenuItem}
                            onPress={handleDelete}
                        >
                            <Text style={g_style.menuText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default RestaurantDetails;
