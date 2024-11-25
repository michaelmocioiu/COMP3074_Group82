import { GlobalStyles } from "../style/Styles";
import { View, Text} from "react-native";

const About = () => {
    return (
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.title}>About</Text>
          <Text style={GlobalStyles.title}>Group 82</Text>
          <Text>Michael Mocioiu - 101459108</Text>
          <Text>Leonid Serebryannikov - 101468805</Text>
          <Text>Ivan Zakrevskyi - 101419665</Text>
          
        </View> 
    );
}

About.options = {
    headerTitle: 'About Us',
};
export default About;
