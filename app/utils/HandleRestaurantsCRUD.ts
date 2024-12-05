import { getItem, setItem } from "@/app/utils/AsyncStorage";
import { Restaurant } from "@/app/models/Restaurant";

export const listRestaurants = async () => {
    return await getItem("restaurants");
}

export const initializeRestaurants = async () => {
    return await setItem("restaurants", []);
}

export const addRestaurant = async (restaurant: Restaurant): Promise<void> => {
    try {
        const restaurants = await listRestaurants();
        restaurants.push(restaurant);
        await setItem("restaurants", restaurants);
    } catch (error) {
        console.error('Error adding restaurant:', error);
        throw error;
    }
};

export const findRestaurant = async (id: string): Promise<Restaurant | null> => {
    try {
        const restaurants = await listRestaurants();
        return restaurants.find((restaurant: Restaurant) => restaurant.id === id);
    } catch (error) {
        console.error('Error finding restaurant:', error);
        throw error;
    }
}

export const updateRestaurant = async (restaurant: Restaurant): Promise<void> => {
    try {
        const restaurants = await listRestaurants();
        const index = restaurants.findIndex((r: Restaurant) => r.id === restaurant.id);
        restaurants[index] = restaurant;
        await setItem("restaurants", restaurants);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        throw error;
    }
}

export const deleteRestaurant = async (id: string): Promise<void> => {
    try {
        const restaurants = await listRestaurants();
        const index = restaurants.findIndex((r: Restaurant) => r.id === id);
        restaurants.splice(index, 1);
        await setItem("restaurants", restaurants);
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
}