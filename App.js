import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';
import { Path, Circle } from 'react-native-svg';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const MAX_DATA_POINTS = 50; // 최대 데이터 포인트 수

export default function App() {
  const [gyroData, setGyroData] = useState({ x: [], y: [], z: [] });
  const [showGraph, setShowGraph] = useState(false);
  const [pinchActive, setPinchActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);


  const _subscribe = () => {
    return setInterval(() => {
      Gyroscope.addListener(gyroscopeData => {
        setGyroData(prevData => {
          if (prevData.x.length >= MAX_DATA_POINTS) {
            prevData.x.shift();
            prevData.y.shift();
            prevData.z.shift();
          }
          return {
            
            x: [...prevData.x, gyroscopeData.x],
            y: [...prevData.y, gyroscopeData.y],
            z: [...prevData.z, gyroscopeData.z],
          };
        });
      });
    }, 1000); // 0.1초(100ms)마다 Gyroscope 데이터 업데이트
  };
  const _unsubscribe = subscription => {
    subscription && subscription.remove();
  };

  useEffect(() => {
    let subscription;

    if (showGraph) {
      subscription = _subscribe();
    } else {
      _unsubscribe(subscription);
      setGyroData({ x: [], y: [], z: [] });
    }

    return () => _unsubscribe(subscription);
  }, [showGraph]);

  const onPinchGestureEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setZoomLevel(event.nativeEvent.scale);
    }
  };


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

