import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Brightness from 'expo-brightness';
import { useKeepAwake } from 'expo-keep-awake';

enum AppMode {
  LIST,
  RUN,
}

export default function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.RUN);
  const [bright, setBright] = useState<number>(0);
  useKeepAwake();
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(0);
      }
    })();
  }, []);

  let content = (<View></View>);
  if (mode === AppMode.LIST) {
    Brightness.setBrightnessAsync(0.5);
  } else if (mode == AppMode.RUN) {
    content = (
      <TouchableOpacity
        activeOpacity={100}
        onPress={() => { 
          if (bright === 1) {
            Brightness.setBrightnessAsync(0);
            setBright(0);
          } else if (bright === 0) {
            Brightness.setBrightnessAsync(1);
            setBright(1);
          }
        }}
        style={styles.container}>
      </TouchableOpacity>
    );
  }


  return content;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});