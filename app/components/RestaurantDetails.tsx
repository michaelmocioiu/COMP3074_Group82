import React, { useState } from "react";
import { useRouter } from "expo-router";
import { GlobalStyles as g_style, DetailsStyles as style } from "../style/Styles";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import restaurantsData from "../data/restaurants.json";
import { useLocalSearchParams } from "expo-router";

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

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const restaurant = restaurantsData.find((item: Restaurant) => item.id === id);

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

      {/*<MapView*/}
      {/*  style={style.mapView}*/}
      {/*  initialRegion={{*/}
      {/*    latitude: restaurant.location.latitude,*/}
      {/*    longitude: restaurant.location.longitude,*/}
      {/*    latitudeDelta: 0.01,*/}
      {/*    longitudeDelta: 0.01,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Marker*/}
      {/*    coordinate={{*/}
      {/*      latitude: restaurant.location.latitude,*/}
      {/*      longitude: restaurant.location.longitude,*/}
      {/*    }}*/}
      {/*    title={restaurant.name}*/}
      {/*  />*/}
      {/*</MapView>*/}

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
              onPress={() => console.log("Route: Show on Map")}
            >
              <Text style={g_style.menuText}>Show on Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={g_style.dotmenuItem}
              onPress={getDirections}
            >
              <Text style={g_style.menuText}>Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={g_style.dotmenuItem}
              onPress={() => console.log("Route: Edit")}
            >
              <Text style={g_style.menuText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={g_style.dotmenuItem}
              onPress={() => console.log("Route: Share")}
            >
              <Text style={g_style.menuText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={g_style.dotmenuItem}
              onPress={() => console.log("Delete")}
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
