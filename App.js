import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';
import { Path, Circle } from 'react-native-svg';

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [gyroData, setGyroData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
        setGyroData(prevData => [...prevData, gyroscopeData]);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    if (showGraph) {
      _subscribe();
    } else {
      _unsubscribe();
    }
    return () => _unsubscribe();
  }, [showGraph]);

  const renderGraph = () => {
    if (showGraph) {
      return (
        <LineChart
          data={{
            labels: gyroData.map((_, index) => index.toString()),
            datasets: [{ data: gyroData.map(data => data.x) }],
          }}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          withShadow={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withDots={false}
          withInnerLines={false}
          bezier
          renderDecorator={Circle}
          onDataPointClick={({ index }) => {
            // Handle data point click if needed
          }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Gyroscope:</Text>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
      <TouchableOpacity onPress={() => setShowGraph(!showGraph)}>
        <Text>{showGraph ? 'Hide Graph' : 'Show Graph'}</Text>
      </TouchableOpacity>
      {renderGraph()}
    </View>
  );
}
