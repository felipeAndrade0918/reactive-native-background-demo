import React from 'react';
import {
    View,
    NativeModules,
    Button,
    Text
} from 'react-native';

import RNBackgroundDownloader from '../background-download/Download';

import styles from '../styles/Styles';
import DownloadProgress from './DownloadProgress';

export default class DownloadDemo extends React.Component {

    state = {
        progress: null,
        size: null,
        buttonDisabled: true
    }

    componentDidMount() {
        RNBackgroundDownloader.checkForExistingDownloads().then(lostTasks => {
            console.log(`lost tasks: ${lostTasks.length}`);

            if (lostTasks.length > 0) {
                this.setState({
                    buttonDisabled: true
                });
            } else {
                this.setState({
                    buttonDisabled: false
                });
            }

            for (let task of lostTasks) {
                console.log(`Task ${task.id} was found!`);

                this.startDownloadProgress(task.totalBytes, task.percent);

                task.progress(this.updateDownloadProgress)
                    .done(this.finishDownloadProgress)
                    .error(this.cancelDownload);
            }
        });
    }

    startDownload = () => {
        this.setState({
            buttonDisabled: true
        });

        let task = RNBackgroundDownloader.download({
            id: 'download',
            url: 'https://i.ebayimg.com/09/!!e!V,uw!2M~$(KGrHqN,!k8Ez+580kqGBNP4cK1DSQ~~_35.jpg',
            destination: `${RNBackgroundDownloader.directories.documents}/mgs.jpg`
        })
            .begin(this.startDownloadProgress)
            .progress(this.updateDownloadProgress)
            .done(this.finishDownloadProgress)
            .error(this.cancelDownload);
    }

    startDownloadProgress = (size, progress = 0) => {
        this.setState({
            progress: progress,
            size: size,
            buttonDisabled: true
        });

        console.log(`Going to download ${size} bytes at ${new Date().toISOString()}!`);
    }

    updateDownloadProgress = (percent) => {
        this.setState({
            progress: percent
        });

        console.log(`Downloaded: ${percent * 100}%`);
    }

    finishDownloadProgress = () => {
        this.setState({
            buttonDisabled: false,
            progress: 1
        });

        console.log(`Download is done at ${new Date().toISOString()}!`);

        NativeModules.Torradinha.show("Download concluído!!", NativeModules.Torradinha.SHORT);
    }

    cancelDownload = (error) => {
        this.setState({
            buttonDisabled: false,
            progress: null,
            size: null
        });

        console.log('Download canceled due to error: ', error);
        
        NativeModules.Torradinha.show('Download cancelado!!', NativeModules.Torradinha.SHORT);
    }

    render() {
        let { progress, size, buttonDisabled } = this.state;

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.titleText}>
                    Download Demo
        </Text>
                <Button
                    title="Pode apertar bem forte"
                    disabled={buttonDisabled}
                    onPress={() => this.startDownload()} />
                <DownloadProgress progress={progress} size={size} />
            </View>
        );
    }
}