import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  section: {
    flex: 1
  },
  header: {
    height: 40,
    backgroundColor: '#25256B'
  },
  headerText: {
    color: 'white'
  },
  contentAreaContainer: {
    flex: 3,
    flexDirection: 'row'
  },
  contentArea: {
    flex: 1,
    margin: 25,
    marginBottom: 0
  },
  actionSpot: {
    width: 50,
    backgroundColor: '#e1e4e8'
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  midTool: {
    flex: 1,
    padding: 20,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tool: {
    padding: 20,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  guide: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    padding: 20,
    backgroundColor: 'steelblue'
  }
});