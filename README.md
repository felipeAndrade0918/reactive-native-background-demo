# reactive-native-background-demo
A React Native project made to demonstrate background downloads using existing libraries.

## Why?

This demo is using the <a href="https://github.com/EkoLabs/react-native-background-downloader" target="_blank">react-native-background-downloader</a> source code. Some things are different though. Parallel downloads and the retry feature are enabled, both from the <a href="https://github.com/tonyofrancis/Fetch" target="_blank">Fetch2</a> library. The library has also been updated.

With these features on, you can continue downloads even if your connection drops.

## Running the application

Start the Metro bundle:
```
react-native start
```

Install the app on a emulator or on a real device:
```
react-native run-android 
```
