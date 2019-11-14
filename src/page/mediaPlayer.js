import { StyleSheet,Dimensions } from 'react-native';
import Colors from './colors';
import fontStyle from './fontStyle';

const fullscreenwidth = Dimensions.get('window').height;

const mediaPlayerStyle = StyleSheet.create({
  player: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  miniPlayer: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    left: 0,
    top: 0,
    width: '40%',
    height: '100%',
    backgroundColor: Colors.White
  },
  fullScreenTitle: {
    // position:'absolute',
    // left: 115,
    // top:25,
    // width: 150,
    color: Colors.White,
    zIndex: 100,
    fontFamily: fontStyle.jioMedium,
    fontSize: 16
  },
  fullScreenView: {
    position: 'absolute',
    zIndex: 2,
    marginTop: -10,
    left: 40,
    top: 25,
    width: fullscreenwidth - 170,
    zIndex: 100,
    backgroundColor: Colors.transparent_color
  },
  playerThumbnail: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  miniPlayerThumbnail: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    top: 0,
    width: '38%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingBottom: 16
  },
  fullscreenContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    height: 3
  },
  miniProgress: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  innerProgressCompleted: {
    height: 4,
    backgroundColor: Colors.innerProgress,
    //backgroundColor: Colors.LbryGreen,
  },
  innerProgressRemaining: {
    height: 4,
    backgroundColor: Colors.innerProgressRemaining,
  },
  trackingControls: {
    height: 3,
    position: 'absolute',
    bottom: 14,
    //zIndex: 2,
    left: 25,
  },
  containedTrackingControls: {
    left: 0,
    width: '100%'
  },
  fullscreenTrackingControls: {
    alignSelf: 'center',
    width: '93%',
  },
  playerControls: {
    position: 'absolute',
    // zIndex: 2,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  playerControlsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 1
  },
  playerControlsContainerTouch: {
    flex: 1,
    width: '100%'
  },
  playPauseButton: {
    // position: 'absolute',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  toggleFullscreenButtonLandscape: {
    position: 'absolute',
    zIndex: 2,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    padding: 5,
    bottom: 15,
  },
  toggleFullscreenButton: {
    position: 'absolute',
    zIndex: 2,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    padding: 5,
    bottom: 15,
  },
  fullScreenElapsedDuration: {
    fontFamily: fontStyle.jioMedium,
    position: 'absolute',
    zIndex: 2,
    left: 25,
    bottom: 24,
    fontSize: 14,
    color: Colors.White,
  },
  fullScreenTotalDuration: {
    fontFamily: fontStyle.jioMedium,
    position: 'absolute',
    zIndex: 2,
    right: 60,
    bottom: 24,
    fontSize: 14,
    color: Colors.White,
  },
  elapsedDuration: {
    fontFamily: fontStyle.jioMedium,
    position: 'absolute',
    zIndex: 2,
    left: 8,
    bottom: 24,
    fontSize: 14,
    color: Colors.White,
  },
  totalDuration: {
    fontFamily: fontStyle.jioMedium,
    position: 'absolute',
    zIndex: 2,
    right: 40,
    bottom: 24,
    fontSize: 14,
    color: Colors.White,
  },
  bigSeekerCircle: {
    borderRadius: 24,
    position: 'relative',
    // top: 8,
    left: 15,
    height: 24,
    width: 24,
    backgroundColor: Colors.innerProgress,
    // backgroundColor: Colors.LbryGreen
  },
  seekerCircle: {
    borderRadius: 12,
    position: 'relative',
    // top: 14,
    left: 15,
    height: 12,
    width: 12,
    backgroundColor: Colors.innerProgress,
    // backgroundColor: Colors.LbryGreen
  },
  popUpText: {
    fontFamily: fontStyle.montserratBold,
    color: '#4B4853',
    fontSize: 14,
    marginRight: 'auto',
    marginLeft: 20
  },
  seekerHandle: {
    backgroundColor: Colors.transparent_color,
    position: 'absolute',
    zIndex: 2,
    height: 36,
    width: 48,
    marginLeft: -18,
    zIndex: 20
  },
  seekerHandleContained: {
    bottom: -17
  },
  seekerHandleFs: {
    bottom: 0
  },
  seekerTouchArea: {
    position: 'absolute',
    height: 30,
    width: '100%',
    zIndex: 10,
  },
  seekerTouchAreaContained: {
    bottom: -15,
  },
  seekerTouchAreaFs: {
    bottom: 0
  },
  closeBtn: {
    width: 20, height: 20, paddingTop: '20%',
    tintColor: Colors.Black,
  },
  miniPlay_button: {
    width: 17,
    height: 24,
    resizeMode: 'contain',
    zIndex: 1000
  },
  miniPause_button: {
    width: 17,
    height: 24,
    resizeMode: 'contain',
    zIndex: 1000
  },
  miniCross_button: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    zIndex: 1000
  },
  play_pause_button: {
    tintColor: Colors.White,
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  view1: { flex: 0.15, flexDirection: 'column' },
  view2: { flex: 1, flexDirection: 'row', paddingTop: 8 },
  miniplayerDown: { width: 1, height: 1, marginStart: 5, zIndex: 1000000, paddingRight: 15, paddingLeft: 15, paddingBottom: 10, tintColor: Colors.White },
  view3: { flex: 0.70, flexDirection: 'row', zIndex: 2, justifyContent: 'center' },
  title: { color: Colors.Black, marginStart: '39%', width: 70, fontFamily: fontStyle.jioMedium, fontSize: 12, marginEnd: 10, marginTop: 7 },
  view4: { flex: 1, marginLeft: 'auto', alignContent: 'center', alignSelf: 'center', flexDirection: 'row', marginStart: 15 },
  miniCrossTouch: { alignSelf: 'center', marginRight: '15%', marginStart: '8%', paddingStart: 10, paddingTop: 30, paddingBottom: 20, paddingEnd: 10, zIndex: 100 },
  view5: { flex: 1, width: '100%' },
  view6: { flex: 0.15, flexDirection: 'column' },
  view7: { flex: 1, flexDirection: 'row', paddingTop: 8 },
  arrow: { color: Colors.White, width: 22, height: 22, resizeMode: 'contain', margin: 25 },
  crossButton: { paddingTop: 7, paddingStart: 7, paddingRight: 15, paddingBottom: 15 },
  downArrow: { width: 15, height: 15, zIndex: 1000000, tintColor: Colors.wHITE, },
  view8: { marginLeft: 'auto', flexDirection: "row", marginRight: 5, marginTop: 5 },
  view8fullscreen: { marginLeft: 'auto', flexDirection: "row", marginRight: 5, marginTop: 10 },
  save: { tintColor: Colors.White, width: 22, height: 22, resizeMode: 'contain', marginRight: 20 },
  share: { tintColor: Colors.White, width: 22, height: 22,zIndex:2, resizeMode: 'contain', marginRight: 20 },
  actionSheet: { width: 20, height: 20 },
  dotPlayer: { color: Colors.White, width: 22, height: 22, zIndex: 2, resizeMode: 'contain', marginRight: 20 },
  view9: { flex: 0.70, flexDirection: 'row', zIndex: 2, justifyContent: 'center' },
  doubleClick: { zIndex: 3, flex: 0.4, width: '100%', height: '100%' },
  animatedView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  back: { color: Colors.White, width: 46, height: 46, resizeMode: 'contain' },
  backAnim: { color: Colors.White, width: 26, height: 22, resizeMode: 'contain' },
  view10: { flex: 0.2, justifyContent: 'center', alignContent: 'center' },
  view11: { flex: 1, flexDirection: 'row', zIndex: 1},
  view12: { flex: 0.5, marginLeft: 'auto', alignContent: 'center', alignSelf: 'center', flexDirection: 'row' },
  next: { color: Colors.White, width: 56, height: 56, backgroundColor: 'rgba(0,0,0,0.5)', resizeMode: 'contain' },
  endVideoLoader: { 
    flex: 1, 
    zIndex: 10, 
    alignItems:'center',
    paddingTop:'20%'
  },
  doubleClick2: { zIndex: 2, flex: 0.4, width: '100%', height: '100%' },
  doubleClick3: { zIndex: 2, flex: 0.4, marginLeft: 'auto', width: '100%', height: '100%' },

});

export default mediaPlayerStyle;
