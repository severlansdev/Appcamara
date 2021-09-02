import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera} from 'expo-camera';

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);

  useEffect(() => {
    (async() =>{
      const { status } = await Camera.requestPermissionsAsync();
      setHaspermission(status === 'granted');
    })();
  }, []);

  if(hasPermission === null){
    return <View/>;
  }

  if(hasPermission === false){
    return <Text> Acceso denegado </Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={type}
      >
      <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
        <TouchableOpacity 
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}
        onpress={ () => {
          setType(
            type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front 
            : Camera.Constants.Type.back
            );
        }}>
          <Text style={{ fontSize: 20, marginBottom: 13, color: '#fff'}}>cambiar</Text>
        </TouchableOpacity>
      </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
