import React from "react";
import { GlobalStyles as g_style, DetailsStyles as style} from "../style/Styles";
import { View, Text} from "react-native";
import restaurantsData from "../data/restaurants.json";
import { useLocalSearchParams } from "expo-router";


const Details = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  console.log(id)
  const restaurant = restaurantsData.find((item) => item.id === id);
    if (!restaurant) {
      return (
        <View style={g_style.container}>
          <Text style={g_style.title}>Not Found</Text>
        </View> 
    );
  } else {
    <View style={style.restaurantContainer}>
        <Text style={style.restaurantName}>{restaurant.name}</Text>
        <Text style={style.restaurantRating}>Rating: {restaurant.rating} ⭐</Text>
        <Text style={style.restaurantAddress}>Address: {restaurant.address}</Text>
        
        <Text style={style.subHeader}>Phones:</Text>
        {restaurant.phones.map((phone, index) => (
          <Text key={index} style={style.restaurantPhone}>{phone}</Text>
        ))}
        
        <Text style={style.subHeader}>Description:</Text>
        <Text style={style.restaurantDescription}>{restaurant.description}</Text>
        
        <Text style={style.subHeader}>Tags:</Text>
        {restaurant.tags.map((tag, index) => (
          <Text key={index} style={style.restaurantTag}>{tag}</Text>
        ))}
      </View>
      }
}




export default Details;