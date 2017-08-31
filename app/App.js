import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, Image, View, ScrollView, PanResponder, Dimensions, WebView } from 'react-native';
import { styles } from './styles/style';
import { BOOKS } from './data/books';
import bible from './data/ESV.json';
import chapters from './data/chapters.json';

export default class FastBibleApp extends Component {

  constructor (props){
    super(props);

    this.state = {
      infoY: 0,
      text:'touch sc',
      wait: false,
      style: {},
      verse: '',
      chapter: 1,
      selectedBook: '', 
      showHelper: false,
      svH:''
    };

    // Bindings
    this.responderGrantedHandler = this.responderGrantedHandler.bind(this);
    this.responderMoveHandler = this.responderMoveHandler.bind(this);
    this.responderReleaseHandler = this.responderReleaseHandler.bind(this);
  }

  getPixelPercentBook() {
    let totalChapters = 0;
    for (let i in chapters){
      totalChapters += chapters[i];
    }

    return this.getPixelPercentBookBasedOnCount(Math.round((this.state.infoY / Dimensions.get('window').height) * totalChapters));
  }

  getPixelPercentBookBasedOnCount(cnt) {
    let totalChapters = 0;
    for (let i in chapters){
      totalChapters += chapters[i];
      if (cnt < totalChapters)
        return i;
    }
    return 'n/a';
  }

  getPercentBook() {
    return BOOKS[Math.round((this.state.infoY / Dimensions.get('window').height) * BOOKS.length)];
  }

  get _list() {
    if (this.getPixelPercentBook() !== this.state.selectedBook)
      this.setState({selectedBook: this.getPixelPercentBook()})
    return `${this.state.selectedBook} - ${Math.round((this.state.infoY / Dimensions.get('window').height)*100)}%`;
  }

  //The View is now responding for touch events. This is the time to highlight and show the user what is happening
  responderGrantedHandler(evt) {
//    if (evt.nativeEvent.pageX > Dimensions.get('window').width * 3/4){
      this.setState({verse: ''});
      this.setState({showHelper: true});
  }

  // The user is moving their finger
  responderMoveHandler(evt) {
    if (!this.state.wait){
      this.followTouch();
      this.setState({infoY: evt.nativeEvent.pageY});

      wait = true;
      setTimeout(function(){wait = false;}, 250);
    }
  }

  responderReleaseHandler(evt) {
      this.setState({verse: this.renderSelectedChapter(this.getPixelPercentBook(),this.state.chapter), style: {marginTop: 10}});
      this.setState({showHelper: false});
      this.setState({selectedBook : this.getPixelPercentBook()})
  }

  renderSelectedChapter(book, chapter){
    

    let chapterString = '';

    for (i in bible[book][chapter]){
       chapterString += ` <sup>${i}</sup> ${bible[book][chapter][i]}<br/>`;
    }
    return chapterString;
  }

  followTouch() {
    this.setState({style: {marginTop: this.state.verse ? 0 : this.state.infoY}});
  }

  render() {

    return (
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {`${this.state.selectedBook} ${this.state.chapter} `}
          </Text>
        </View>
        <View style={styles.contentAreaContainer}>
          <WebView 
            style={styles.contentArea} 
            source={{html: this.state.verse}} />
          <View 
            style={styles.actionSpot}
            onStartShouldSetResponder = {(evt) => 'true'}
            onMoveShouldSetResponder = {(evt) => 'true'}
            onResponderGrant = {this.responderGrantedHandler}
            onResponderMove = {this.responderMoveHandler}
            onResponderRelease = {this.responderReleaseHandler}></View>
        </View>
        <View style={styles.toolbar}>
          <View style={styles.tool}>
            <Text>Previous Ch</Text>
          </View>
          <View style={styles.midTool}>
            <Text>{`${this.state.selectedBook}`}</Text>
          </View>
          <View style={styles.tool}>
            <Text>Next Ch</Text>
          </View>
        </View>
        <Text style={[styles.guide, this.state.style, {display: this.state.showHelper ? 'flex' : 'none'}]}>
          {`${this.getPixelPercentBook()}`}
        </Text>
      </View>
    );
  }
}

/*
class SomethingCool extends Component {
  render() {
    return (
      <Text>This is Cool: {this.props.cool}</Text>
    )
  }
}

          >>
          this.refs.listView.scrollTo({
            y: Math.round((this.state.infoY / Dimensions.get('window').height) * this.state.svH),
            animated: false,
          })
          <<
          <ScrollView style={{display: 'none'}} scrollEnabled={false} ref='listView' onContentSizeChange={(height) => {
            this.setState({svH: height});
          }}>
            {BOOKS.map((entry,index) => {
              return <Text key={index} style={{fontSize: 50}}>{entry}</Text>
           })}
          </ScrollView>

 var style = {
  flex: 1
}*/