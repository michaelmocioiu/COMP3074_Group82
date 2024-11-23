import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { HeaderStyle as style, GlobalStyles as g_style} from './style/Styles';


export default function Layout() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  return (
    <Stack
      screenOptions={{
        headerStyle: style.header,
        headerTitle: () => (
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={style.title}>
              Restaurant Guide
            </Text>
          </TouchableOpacity>
        ),
        headerTitleStyle: style.title,
        headerTintColor: "#BCD2EE",
        headerRight: () => (
          <View>

      <TouchableOpacity onPress={toggleMenu} style={g_style.dotMenuButton}>
        <Text style={g_style.dots}>⋮</Text>
      </TouchableOpacity>
            <Modal
              transparent
              animationType="fade"
              visible={menuVisible}
              onRequestClose={toggleMenu}
            >
              <TouchableOpacity style={g_style.overlay} onPress={toggleMenu}>
                <View style={g_style.dotmenu}>
                  <TouchableOpacity
                    style={g_style.dotmenuItem}
                    onPress={() => router.push("/components/About")}
                  >
                    <Text style={g_style.menuText}>About</Text>
                  </TouchableOpacity>

                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        )
      }}
    />

  );
}

