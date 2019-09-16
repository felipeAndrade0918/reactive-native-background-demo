import React, {Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';

import DownloadDemo from './download-demo/DownloadDemo';

import styles from './styles/Styles';

export default class App extends React.Component {

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
              <DownloadDemo />
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}