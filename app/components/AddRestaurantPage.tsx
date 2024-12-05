
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {
    TextInput,
    Button,
    Chip,
    Text,
    HelperText,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { Restaurant } from "@/app/models/Restaurant";
import {
    addRestaurant,
    initializeRestaurants,
    listRestaurants,
    findRestaurant,
    updateRestaurant
} from "@/app/utils/HandleRestaurantsCRUD";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Location from 'expo-location';

const AddRestaurant: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [phones, setPhones] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [geocoding, setGeocoding] = useState<boolean>(false);

    const router = useRouter();
    const params = useLocalSearchParams();
    const restaurantId = params.id as string | undefined;

    useEffect(() => {
        const initialize = async () => {
            const existingRestaurants = await listRestaurants();
            if (!existingRestaurants) {
                await initializeRestaurants();
            }
        };
        initialize();
    }, []);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (restaurantId) {
                try {
                    setLoading(true);
                    const restaurant = await findRestaurant(restaurantId);
                    if (restaurant) {
                        setName(restaurant.name);
                        setAddress(restaurant.address);
                        setPhones(restaurant.phones);
                        setDescription(restaurant.description);
                        setTags(restaurant.tags);
                        setRating(restaurant.rating);
                    } else {
                        Alert.alert('Error', 'Restaurant not found.');
                        router.push('/');
                    }
                } catch (error) {
                    console.error('Error fetching restaurant:', error);
                    Alert.alert('Error', 'Failed to load restaurant data.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchRestaurant();
    }, [restaurantId]);

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = 'Restaurant name is required';
        if (!address.trim()) newErrors.address = 'Address is required';
        if (phones.length === 0) newErrors.phones = 'At least one phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddPhone = () => {
        if (phone.trim()) {
            setPhones([...phones, phone.trim()]);
            setPhone('');
        }
    };

    const handleRemovePhone = (index: number) => {
        const updatedPhones = phones.filter((_, i) => i !== index);
        setPhones(updatedPhones);
    };

    const handleAddTag = () => {
        const trimmedTag = currentTag.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (rating < 0 || rating > 5) {
                Alert.alert('Validation Error', 'Rating must be between 0 and 5.');
                return;
            }

            setGeocoding(true);

            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Permission to access location was denied.');
                    setGeocoding(false);
                    return;
                }

                const geocodeResults = await Location.geocodeAsync(address);
                if (geocodeResults.length === 0) {
                    Alert.alert('Geocoding Error', 'Unable to find coordinates for the provided address.');
                    setGeocoding(false);
                    return;
                }

                const { latitude, longitude } = geocodeResults[0];

                const newRestaurant: Restaurant = {
                    id: restaurantId || Math.random().toString(36).substr(2, 9),
                    name,
                    address,
                    phones,
                    description,
                    tags,
                    rating: Number(rating.toFixed(1)),
                    location: {
                        latitude,
                        longitude,
                    },
                };

                if (restaurantId) {
                    await updateRestaurant(newRestaurant);
                    Alert.alert('Success', 'Restaurant updated successfully!', [
                        { text: 'OK', onPress: () => router.push('/') },
                    ]);
                } else {
                    await addRestaurant(newRestaurant);
                    Alert.alert('Success', 'Restaurant added successfully!', [
                        { text: 'OK', onPress: () => clearForm() },
                    ]);
                }

                router.push('/');
            } catch (error) {
                console.error('Error submitting restaurant:', error);
                Alert.alert('Error', 'Failed to submit restaurant. Please try again.');
            } finally {
                setGeocoding(false);
            }
        } else {
            Alert.alert('Validation Error', 'Please fix the errors before submitting.');
        }
    };

    const clearForm = () => {
        setName('');
        setAddress('');
        setPhones([]);
        setPhone('');
        setDescription('');
        setTags([]);
        setCurrentTag('');
        setRating(0);
        setErrors({});
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>
                    {restaurantId ? 'Update Restaurant' : 'Add a New Restaurant'}
                </Text>

                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                    error={!!errors.name}
                />
                {errors.name && <HelperText type="error">{errors.name}</HelperText>}

                <TextInput
                    label="Address"
                    value={address}
                    onChangeText={setAddress}
                    mode="outlined"
                    style={styles.input}
                    multiline
                    error={!!errors.address}
                />
                {errors.address && <HelperText type="error">{errors.address}</HelperText>}

                <View style={styles.phoneContainer}>
                    <TextInput
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        mode="outlined"
                        style={styles.phoneInput}
                        keyboardType="phone-pad"
                    />
                    <Button
                        mode="contained"
                        onPress={handleAddPhone}
                        style={styles.addButton}
                        labelStyle={styles.buttonLabel}
                        contentStyle={styles.buttonContent}
                    >
                        Add
                    </Button>
                </View>
                {errors.phones && <HelperText type="error">{errors.phones}</HelperText>}
                <View style={styles.chipsContainer}>
                    {phones.map((p, index) => (
                        <Chip
                            key={index}
                            onClose={() => handleRemovePhone(index)}
                            style={styles.chip}
                        >
                            {p}
                        </Chip>
                    ))}
                </View>

                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    mode="outlined"
                    style={styles.input}
                    multiline
                />

                <View style={styles.tagContainer}>
                    <TextInput
                        label="Add Tag"
                        value={currentTag}
                        onChangeText={setCurrentTag}
                        mode="outlined"
                        style={styles.tagInput}
                        onSubmitEditing={handleAddTag}
                    />
                    <Button
                        mode="contained"
                        onPress={handleAddTag}
                        style={styles.addButton}
                        labelStyle={styles.buttonLabel}
                        contentStyle={styles.buttonContent}
                    >
                        Add
                    </Button>
                </View>
                <View style={styles.chipsContainer}>
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            onClose={() => handleRemoveTag(tag)}
                            style={styles.chip}
                        >
                            {tag}
                        </Chip>
                    ))}
                </View>

                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingLabel}>Rating:</Text>
                    <StarRating
                        rating={rating}
                        onChange={(value) => {
                            const roundedRating = Number(value.toFixed(1));
                            console.log('Selected Rating:', roundedRating);
                            setRating(roundedRating);
                        }}
                        starSize={30}
                        color="#f1c40f"
                    />
                </View>

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.submitButton}
                    labelStyle={styles.buttonLabel}
                    contentStyle={styles.buttonContent}
                    disabled={loading || geocoding}
                >
                    {geocoding
                        ? 'Processing...'
                        : restaurantId ? 'Update Restaurant' : 'Add Restaurant'}
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        alignSelf: 'center',
    },
    input: {
        marginBottom: 16,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    phoneInput: {
        flex: 1,
        marginRight: 8,
    },
    addButton: {
        marginTop: Platform.OS === 'ios' ? 0 : 8,
        backgroundColor: '#18638c',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    chip: {
        margin: 4,
    },
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    tagInput: {
        flex: 1,
        marginRight: 8,
    },
    ratingContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    ratingLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333333',
    },
    submitButton: {
        marginTop: 16,
        backgroundColor: '#18638c',
    },
    buttonLabel: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    buttonContent: {
        height: 48,
    },
});

export default AddRestaurant;
