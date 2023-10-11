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
      <Text style={[styles.header,]}> 아래의 버튼을 누르시오! </Text>

    

      <View style = {[styles.button,styles.buttonShadow]} >
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
    height: 150,
    backgroundColor: null,
    color: "black",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    
  },

  button: {
    height: {
      width: 20,
    },
    backgroundColor: "#000",
    borderColor: "red",
    color: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonShadow: {
    position: "absolute",
    
    borderRadius: 5,
    backgroundColor: "#fff",
    zIndex: 1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  
});
