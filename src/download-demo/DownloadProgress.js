import React from 'react';
import PropTypes from 'prop-types';

import { ProgressBarAndroid, Text, View } from 'react-native';

import styles from '../styles/Styles';

export default class DownloadProgress extends React.Component {

    render() {
        let { progress, size } = this.props;

        if (progress == null || progress == 1) {
            return (null);
        }

        return (
            <View style={styles.progressBar}>
                <ProgressBarAndroid progress={progress} styleAttr="Horizontal" indeterminate={false} />
                <Text>{parseInt(progress * 100)}% de {size / 1000} KBytes</Text>
            </View>
        );
    }
}

DownloadProgress.propTypes = {
    progress: PropTypes.number,
    size: PropTypes.number
};