import { GlobalStyles } from "../style/Styles";
import { View, Text} from "react-native";

const Map = () => {
    return (
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.title}>Map</Text>

          <Text>put map here</Text>
          
        </View> 
    );
}

Map.options = {
    headerTitle: 'About Us',
};
export default Map;
