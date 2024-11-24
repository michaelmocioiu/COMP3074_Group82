// AddRestaurant.tsx
import React, { useState } from 'react';
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
import {Restaurant} from "@/app/models/Restaurant";
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

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = 'Restaurant name is required';
        if (!address.trim()) newErrors.address = 'Address is required';
        if (phones.length === 0) newErrors.phones = 'At least one phone number is required';
        // Additional validations can be added here
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

    const handleSubmit = () => {
        if (validate()) {
            const newRestaurant: Restaurant = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                address,
                phones,
                description,
                tags,
                rating,
                location: {
                    latitude: 0,
                    longitude: 0,
                }
            };

            // Add the new restaurant to the list of restaurants

            Alert.alert('Success', 'Restaurant added successfully!', [
                { text: 'OK', onPress: () => clearForm() },
            ]);
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
                <Text style={styles.title}>Add a New Restaurant</Text>

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
                        onChange={setRating}
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
                >
                    Add Restaurant
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
        backgroundColor: '#009bef',
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
        backgroundColor: '#009bef',
    },
    buttonLabel: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    buttonContent: {
        height: 48, // Optional: Adjust button height
    },
});

export default AddRestaurant;
