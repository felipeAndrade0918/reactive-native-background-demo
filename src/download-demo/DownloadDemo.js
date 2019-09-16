import React from 'react';
import {
  View,
  NativeModules,
  Button,
  Text
} from 'react-native';

import RNBackgroundDownloader from '../background-download/Download';

import styles from '../styles/Styles';

export default class DownloadDemo extends React.Component {

  componentDidMount() {
    NativeModules.Torradinha.show('Batuta', NativeModules.Torradinha.SHORT);

    RNBackgroundDownloader.checkForExistingDownloads().then(lostTasks => {
      console.log(`lost tasks: ${lostTasks}`);

      for (let task of lostTasks) {
        console.log(`Task ${task.id} was found!`);

        task.progress((percent) => {
          console.log(`Downloaded: ${percent * 100}%`);
        }).done(() => {
          console.log('Downlaod is done!');
        }).error((error) => {
          console.log('Download canceled due to error: ', error);
        });
      }
    });
  }

  startDownload = () => {
    let task = RNBackgroundDownloader.download({
      id: 'download',
      url: 'https://i.ebayimg.com/09/!!e!V,uw!2M~$(KGrHqN,!k8Ez+580kqGBNP4cK1DSQ~~_35.jpg',
      destination: `${RNBackgroundDownloader.directories.documents}/mgs.jpg`
    }).begin((expectedBytes) => {
      console.log(`Going to download ${expectedBytes} bytes at ${new Date().toISOString()}!`);
    }).progress((percent) => {
      console.log(`Downloaded: ${percent * 100}%`);
    }).done(() => {
      console.log(`Download is done at ${new Date().toISOString()}!`);
    }).error((error) => {
      console.log('Download canceled due to error: ', error);
    });
  }

  render() {
    return (
    <View style={styles.sectionContainer}>
        <Text style={styles.titleText}>
            Download Demo
        </Text>
        <Button
        title="Pode apertar bem forte"
        onPress={() => this.startDownload()}/>
    </View>
    );
  }
}