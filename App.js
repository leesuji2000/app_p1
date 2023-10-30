import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';
import { Path, Circle } from 'react-native-svg';

export default function App() {
  const [gyroData, setGyroData] = useState({ x: [], y: [], z: [] });
  const [showGraph, setShowGraph] = useState(false);

  const _subscribe = () => {
    const subscription = Gyroscope.addListener(gyroscopeData => {
      setGyroData(prevData => {
        return {
          x: [...prevData.x, gyroscopeData.x],
          y: [...prevData.y, gyroscopeData.y],
          z: [...prevData.z, gyroscopeData.z],
        };
      });
    });
    return subscription;
  };

  const _unsubscribe = subscription => {
    subscription && subscription.remove();
  };

  useEffect(() => {
    let subscription;

    if (showGraph) {
      subscription = _subscribe();
    }

    return () => _unsubscribe(subscription);
  }, [showGraph]);

  const renderGraph = () => {
    if (showGraph) {
      return (
        <View>
          <LineChart
            data={{
              labels: Array.from({ length: gyroData.x.length }, (_, i) => i.toString()),
              datasets: [{ data: gyroData.x, color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }],
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
          />
          <LineChart
            data={{
              labels: Array.from({ length: gyroData.y.length }, (_, i) => i.toString()),
              datasets: [{ data: gyroData.y, color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }],
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
          />
          <LineChart
            data={{
              labels: Array.from({ length: gyroData.z.length }, (_, i) => i.toString()),
              datasets: [{ data: gyroData.z, color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }],
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
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Gyroscope:</Text>
      <TouchableOpacity onPress={() => setShowGraph(!showGraph)}>
        <Text>{showGraph ? 'Hide Graph' : 'Show Graph'}</Text>
      </TouchableOpacity>
      {renderGraph()}
    </View>
  );
}
