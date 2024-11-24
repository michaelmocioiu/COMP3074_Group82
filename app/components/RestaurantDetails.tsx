import React, { useState } from "react";
import { useRouter } from 'expo-router';
import { GlobalStyles as g_style, DetailsStyles as style } from "../style/Styles";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import restaurantsData from "../data/restaurants.json";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const RestaurantDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const restaurant = restaurantsData.find((item) => item.id === id);
  if (!restaurant) {
    return (
        <View style={g_style.container}>
          <Text style={g_style.title}>Not Found</Text>
        </View>
    );
  } else {
    return (
        <View style={g_style.container}>
          <View style={style.row}>

            <Text style={style.restaurantName}>{restaurant.name} | {restaurant.rating} ⭐</Text>
            <TouchableOpacity onPress={toggleMenu} style={g_style.dotMenuButton}>
              <Text style={g_style.dots}>⋮</Text>
            </TouchableOpacity>
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
                      onPress={() => console.log("Route: Get Directions")}
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
                  <TouchableOpacity
                      style={g_style.dotmenuItem}
                      onPress={() => console.log()}
                  >
                    <Text style={g_style.menuText}></Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          <Text style={style.restaurantAddress}>{restaurant.address}</Text>

          <View style={style.row}>
            {restaurant.tags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => console.log(tag)}>
                  <Text style={style.restaurantTag}>{tag}</Text>
                </TouchableOpacity>
            ))}
          </View>

          <Text style={style.subHeader}>Phones:</Text>
          {restaurant.phones.map((phone, index) => (
              <Text key={index} style={style.restaurantPhone}>{phone}</Text>
          ))}

          <Text style={style.subHeader}>Description:</Text>
          <Text style={style.restaurantDescription}>{restaurant.description}</Text>

        </View>
    )
  }
}

export default RestaurantDetails;
