import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Platform,
  Text,
  Vibration,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0, //right
    y: 0, //front
    z: 0, //rolling
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  return (
    

    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={[styles.header,]}> 아래의 버튼을 누르시오! </Text>

    

      <View style = {[styles.button,styles.buttonShadow]} >
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
      </View>
      <StatusBar style="auto" /> */}

     

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
  buttonContainer: {
    padding: 10,
  },
});
