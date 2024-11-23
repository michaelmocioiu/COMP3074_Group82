import {StyleSheet} from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
})

export const HeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export const DetailsStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  restaurantContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantRating: {
    fontSize: 18,
    marginBottom: 10,
  },
  restaurantAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  restaurantPhone: {
    fontSize: 16,
  },
  restaurantDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  restaurantTag: {
    fontSize: 16,
    marginBottom: 5,
  },
});
