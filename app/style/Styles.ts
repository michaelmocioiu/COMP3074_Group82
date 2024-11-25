import { StyleSheet } from "react-native";

const shadows = '#061923';
const darks = '#0C3146';
const mid = '#18638C';
const lights = '#BCD2EE';
const highlight = '#EFF0F0';
const accent = '#EF233C';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: highlight,
  },
  dotMenuButton: {
    padding: 14,
    backgroundColor: lights,
    borderRadius: 50,
    marginRight: 5,
    alignSelf: 'center',
  },
  dots: {
    fontSize: 24,
    color: darks,
    textAlign: 'center',
    paddingBottom: 2,
    lineHeight: 7,
    alignSelf: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 20,
  },
  dotmenu: {
    backgroundColor: highlight,
    width: 150,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dotmenuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  // Added button and buttonText styles
  button: {
    backgroundColor: mid,
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: lights,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const HeaderStyle = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: mid,
    borderBottomWidth: 3,
    borderBottomColor: accent,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: lights,
  },
});

export const ListStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  listItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: lights,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  tags: {
    fontSize: 12,
    color: "#777",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export const DetailsStyles = StyleSheet.create({
  icon: {
    backgroundColor: darks,
    color: highlight,
    width: 28,
    padding: 4,
    borderRadius: 8,
    margin: 5,
  },
  container: {
    padding: 20,
  },
  restaurantContainer: {
    backgroundColor: '#EDEEC0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 28,
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
  row: {
    flexDirection: 'row',
  },
  restaurantTag: {
    borderRadius: 7,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 8,
    margin: 5,
    backgroundColor: darks,
    color: lights,
  },
  mapView: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
});
