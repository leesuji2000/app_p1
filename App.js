import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Platform,
  Text,
  Vibration,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

export default function App() {
  return (
    

    <View style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}> 아래의 버튼을 누르시오 </Text>

    

      <View style >
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
      </View>
      <StatusBar style="auto" />

     

    </View>

    
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  header: {
    width: 150,
    height: 50,
    backgroundColor: null,
    color: "black",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  
  
  
});
