import { getItem, setItem } from "@/app/utils/AsyncStorage";

export const listRestaurants = async () => {
    return await getItem("restaurants");
}

export const initializeRestaurants = async () => {
    return await setItem("restaurants", []);
}