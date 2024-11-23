import { GlobalStyles } from "../style/Styles";
import { View, Text} from "react-native";

const About = () => {
    return (
        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.title}>About</Text>
          <Text style={GlobalStyles.title}>Group 82</Text>
          <Text>Michael Mocioiu - 101459108</Text>
          <Text>Leonid Serebryannikov - Add your id pls</Text>
          <Text>Ivan Zakrevskyi - Add your id pls</Text>
          
        </View> 
    );
}

About.options = {
    headerTitle: 'About Us',  // Custom title for About screen
  };
export default About;
