import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Animated,
  Button,
  SafeAreaView,
  Platform
} from "react-native";
import { Navigation } from 'react-native-navigation';
import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";
import SafeArea from 'react-native-safe-area';
import mediaPlayerStyle from './mediaPlayer';

import ProgressBar from './progressBar';

const src = "http://104.211.101.99/relay/around-the-world/26c48751ef695c8145111d687bb5b428e1892a5b";

const TouchableIcon = ({ name, children }) => {
  return (
    <TouchableOpacity style={styles.touchIcon}>
      <Icon name={name} size={30} color="#767577" />
      <Text style={styles.iconText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const topMargin = (Platform.OS == 'ios') ? 44 : 0;
const extraTopPadding = (Platform.OS == 'ios') ? 0 : 10;

export default class Overlay extends React.Component {

  seekerWidth = 0;

  constructor(props) {
    super(props);

    this.state = {
      showControls: false,
      areControlsVisible: true,
      paused: false,
      seeking: false,
      duration: 0.0,
      currentTime: 0.0,
      seekTimeout: -1,
      seekerOffset: 0,
      seekerPosition: 0,
      minimizePanResponder:true,
    }

    this.Pause = this.Pause.bind(this);
    this.Play = this.Play.bind(this);

    this._y = 0;
    this._animation = new Animated.Value(0);
    this._animation.addListener(({ value }) => {
      this._y = value;
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dy: this._animation,
        },
      ]),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(this._animation, {
            toValue: 300,
            duration: 200,
          }).start();
          this._animation.setOffset(300);
        } else {
          this._animation.setOffset(0);
          Animated.timing(this._animation, {
            toValue: 0,
            duration: 200,
          }).start();
        }
      },
    });
  }

  setSeekerPosition(position = 0) {
    position = this.checkSeekerPosition(position);
    this.setState({ seekerPosition: position });
    if (!this.state.seeking) {
      this.setState({ seekerOffset: position });
    }
  }

  checkSeekerPosition(val = 0) {
    if (val < 0) {
      val = 0;
    } else if (val >= this.seekerWidth) {
      return this.seekerWidth;
    }

    return val;
  }

  getCurrentTimeForSeekerPosition() {
    return this.state.duration * (this.state.seekerPosition / this.seekerWidth);
  }

  clearControlsTimeout = () => {
    if (this.state.controlsTimeout > -1) {
      clearTimeout(this.state.controlsTimeout)
    }
  }

  initSeeker() {
    this.seekResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        this.setState({minimizePanResponder:false});
        return true
      },

      onPanResponderGrant: (evt, gestureState) => {
        // handleMediaPlayerSnackbar(true,'smallVideo')
        this.clearControlsTimeout();
        if (this.state.seekTimeout > 0) {
          clearTimeout(this.state.seekTimeout);
        }
        this.setState({ seeking: true });
      },

      onPanResponderMove: (evt, gestureState) => {
        const position = this.state.seekerOffset + gestureState.dx;
        this.setSeekerPosition(position);

      },

      onPanResponderRelease: (evt, gestureState) => {
        const time = this.getCurrentTimeForSeekerPosition();
        if (time >= this.state.duration) {
          this.setState({ paused: true });
          this.onEnd();
        } else {
          this.seekTo(time);
          this.setState({ seekTimeout: setTimeout(() => { this.setState({ seeking: false }); }, 100) });
        }
        this.setState({minimizePanResponder:true});
      }
    });
  }

  componentWillMount = () => {
    this.initSeeker();
  }

  manualHidePlayerControls = () => {
    this.setState({ showControls: false })
  }

  showPlayerControls = () => {
    this.setState({ showControls: true })
    setTimeout(() => {
      this.setState({ showControls: false })
    }, 3000)
  }

  togglePlayerControls = () => {
    if (this.state.areControlsVisible) {
      this.manualHidePlayerControls();
    } else {
      this.showPlayerControls();
    }
  }

  Play = () => {
    console.log('play')
    this.setState({ paused: false })
  }

  Pause = () => {
    console.log('paused')
    this.setState({ paused: true })
  }

  calculateSeekerPosition() {
    return this.seekerWidth * this.getCurrentTimePercentage();
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  seekTo = async (time = 0) => {
    if (time > this.state.duration) {
      return;
    }
    this.video.seek(time);
    console.log('seeked', time)
    await this.setState({ currentTime: time });

  }
  onSeekerTouchAreaPressed = (evt) => {
    if (evt && evt.nativeEvent) {
      const newSeekerPosition = evt.nativeEvent.locationX;
      if (!isNaN(newSeekerPosition)) {
        const time = this.state.duration * (newSeekerPosition / this.seekerWidth);
        this.setSeekerPosition(newSeekerPosition);
        this.seekTo(time);
      }
    }
  }


  renderPlayerControls = () => {
    // if (this.state.areControlsVisible) {
    return (
      <View style={{ zIndex: 10 }}>
        {this.state.paused ?
          <TouchableOpacity onPress={() => this.Play()} activeOpacity={0} style={{ zIndex: 11, marginTop: '25%', marginStart: '50%' }}>
            <Image source={require('../assets/miniPauseButton.png')} style={{ tintColor: '#0f0' }} />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={()=>this.Pause()} activeOpacity={0} style={{ zIndex: 11, marginTop: '25%', marginStart: '50%' }}>
            <Image source={require('../assets/miniPlayButton.png')} style={{ tintColor: '#0f0' }} />
          </TouchableOpacity>
        }
      </View>
    )
    // }
  }

  getTrackingOffset() {
    return 0;
  }

  onLoad = (data) => {
    this.setState({ duration: data.duration });
  }
  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
    if (!this.state.seeking) {
      this.setSeekerPosition(this.calculateSeekerPosition());
    }
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  startSeekVideo() {
    this.setState({paused: true})
  }
  endSeekVideo(time) {
    this.video.seek(time);

  }

  render() {
    const { width, height: screenHeight } = Dimensions.get("window");
    const height = width * (9 / 16);


    const trackingStyle = [mediaPlayerStyle.trackingControls, mediaPlayerStyle.containedTrackingControls];
    const completedWidth = this.getCurrentTimePercentage() * this.seekerWidth;
    const remainingWidth = this.seekerWidth - completedWidth;

    const opacityInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0],
    });

    const opacityRInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, 1],
    });

    const translateYInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, screenHeight - height - topMargin - 16 - extraTopPadding],
      extrapolate: "clamp",
    });

    const translateCYInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, screenHeight - height - topMargin + 60 - extraTopPadding],
      extrapolate: "clamp",
    });

    const scaleInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.35],
      extrapolate: "clamp",
    });

    const translateXInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, -135],
      extrapolate: "clamp",
    });

    const translateCXInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [200, 0],
      extrapolate: "clamp",
    });

    const scrollStyles = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateY: translateYInterpolate,
        },
      ],
    };

    const videoStyles = {
      transform: [
        {
          translateY: translateYInterpolate,
        },
        {
          translateX: translateXInterpolate,
        },
        {
          scale: scaleInterpolate,
        },
      ],
    };

    const backViewStyles = {
      transform: [
        {
          translateY: translateYInterpolate,
        },
        {
          scaleY: scaleInterpolate,
        },
      ],
    };

    const closeViewStyles = {
      opacity: opacityRInterpolate,
      transform: [
        {
          translateY: translateCYInterpolate,
        },
        {
          translateX: translateCXInterpolate,
        },
      ],
    };

    return (
      <SafeAreaView style={[StyleSheet.absoluteFill]} pointerEvents="box-none">
        <Animated.View style={[styles.backView, { height }, backViewStyles]}></Animated.View>
        <Animated.View style={[styles.backView, { height: 80, paddingRight: 20 }, closeViewStyles]}>
          <Button
            title="Close"
            onPress={() => {
              Navigation.dismissOverlay(this.props.componentId);
            }}
          >
          </Button>
        </Animated.View>
        <Animated.View
          style={[{ width, height }, videoStyles]}
        { ...this.state.minimizePanResponder ? this._panResponder.panHandlers : null}
        >
          <Video
            style={[StyleSheet.absoluteFill, { backgroundColor: 'grey' }]}
            ref={(ref: Video) => { this.video = ref; }}
            source={{ uri: src }}                    //{require('../assets/tp.mp4')}
            resizeMode="contain"
            paused={this.state.paused}
            onProgress={this.onProgress}
            onLoad={this.onLoad}
          />
          {/* <View style={{
            position: 'absolute',
            // zIndex: 2,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
          }}> */}
          {/* <TouchableOpacity style={{zIndex:1}}  onPress={this.togglePlayerControls}> */}
            {this.renderPlayerControls()}
          {/* </TouchableOpacity> */}
          {/* </View> */}

            {(this.state.areControlsVisible) &&
              <View style={trackingStyle} onLayout={(evt) => {
                this.trackingOffset = evt.nativeEvent.layout.x;
                this.seekerWidth = evt.nativeEvent.layout.width;
              }}>
                <View style={[mediaPlayerStyle.progress]}>
                  <View style={[mediaPlayerStyle.innerProgressCompleted, { width: completedWidth }]} />
                  <View style={[mediaPlayerStyle.innerProgressRemaining, { width: remainingWidth }]} />
                </View>
              </View>}

              {(this.state.areControlsVisible) &&
          <View style={{ left: this.getTrackingOffset(), width: this.seekerWidth}}>
            <Animated.View style={[mediaPlayerStyle.seekerHandle, mediaPlayerStyle.seekerHandleContained,
            { left: this.state.seekerPosition  }]} {...this.seekResponder.panHandlers}>
              <View style={this.state.seeking ? mediaPlayerStyle.bigSeekerCircle : mediaPlayerStyle.seekerCircle} />
            </Animated.View>
            <TouchableOpacity
              style={[mediaPlayerStyle.seekerTouchArea]}
              onPress={this.onSeekerTouchAreaPressed} >
            </TouchableOpacity>
          </View>}
{/* <ProgressBar
	currentTime = {this.state.currentTime}	// Required! Pass current time of video
	duration = {this.state.duration}	// Required! pass duration
	startSeekVideo = {this.startSeekVideo}	// Required! Callback when start to seek video
	endSeekVideo = {this.endSeekVideo}	// Required! Callback when end to seek video
/> */}



        </Animated.View>
          <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
            <View style={styles.padding}>
              <Text style={styles.title}>Beautiful DJ Mixing Lights</Text>
              <Text>1M Views</Text>
              <View style={styles.likeRow}>
                <TouchableIcon name="thumbs-up">10,000</TouchableIcon>
                <TouchableIcon name="thumbs-down">3</TouchableIcon>
                <TouchableIcon name="share">Share</TouchableIcon>
                <TouchableIcon name="download">Save</TouchableIcon>
                <TouchableIcon name="plus">Add to</TouchableIcon>
              </View>
            </View>
            <View style={[styles.channelInfo, styles.padding]}>
              <View style={styles.channelText}>
                <Text style={styles.channelTitle}>Prerecorded MP3s</Text>
                <Text>1M Subscribers</Text>
              </View>
            </View>
          </Animated.ScrollView>
      </SafeAreaView>
        )
      }
    }
    
const styles = StyleSheet.create({
          container: {
          flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      },
  backView: {
          position: 'absolute',
        backgroundColor: "#FF0",
        top: topMargin,
        left: 0,
        right: 0,
        height: 100,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
  touchIcon: {
          alignItems: "center",
        justifyContent: "center",
      },
  iconText: {
          marginTop: 5,
      },
  scrollView: {
          flex: 1,
        backgroundColor: "#FF0",
      },
  title: {
          fontSize: 28,
      },
  likeRow: {
          flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
      },
  padding: {
          paddingVertical: 15,
        paddingHorizontal: 15,
      },
  channelInfo: {
          flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        borderTopWidth: 1,
        borderTopColor: "#DDD",
      },
  channelIcon: {
          width: 50,
        height: 50,
      },
  channelText: {
          marginLeft: 15,
      },
  channelTitle: {
          fontSize: 18,
        marginBottom: 5,
      },
    })
