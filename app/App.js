import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, Image, View, ScrollView, PanResponder, Dimensions  } from 'react-native';
import { styles } from './styles/style';
import { BOOKS } from './data/books';

export default class HelloWorldApp extends Component {

  constructor (props){
    super(props);
    this.state = {
      showJoon: true,
      infoY: 0,
      text:'touch sc',
      wait: false,
      style: style,
      verse: '',
      chapter: 1
    };
  }

  getPixelPercentBook() {
    let chapters = require('./data/chapters.json');
    let totalChapters = 0;
    for (let i in chapters){
      totalChapters += chapters[i];
    }

    return this.getPixelPercentBookBasedOnCount(Math.round((this.state.infoY / Dimensions.get('window').height) * totalChapters));
  }

  getPixelPercentBookBasedOnCount(cnt) {
    let chapters = require('./data/chapters.json');
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
    return `${this.state.text} - ${this.getPixelPercentBook()}
    ${Math.round((this.state.infoY / Dimensions.get('window').height)*100)}%`;
  }

  //The View is now responding for touch events. This is the time to highlight and show the user what is happening
  responderGrantedHandler(evt) {
    if (evt.nativeEvent.pageX > Dimensions.get('window').width * 3/4){
      console.log('granted');
      this.setState({verse: ''});
    }
  }

  // The user is moving their finger
  responderMoveHandler(evt) {
    if (!this.state.wait){
      this.followTouch();
      this.setState({infoY: evt.nativeEvent.pageY});
      wait = true;
      setTimeout(function(){wait = false;}, 200);
    }
  }

  // Fired at the end of the touch, ie "touchUp"
  responderReleaseHandler(evt) {
    console.log('release');

    if (evt.nativeEvent.pageX > Dimensions.get('window').width * 3/4){
      this.setState({chapter: 1});
      this.setState({verse: this.showChapter(this.getPixelPercentBook(),this.state.chapter), style: {marginTop: 10}});
    }
    else {
      this.setState({chapter: this.state.chapter++});
      this.setState({verse: this.showChapter(this.getPixelPercentBook(),this.state.chapter), style: {marginTop: 10}});
    }
  }

  showChapter(book, num){
    let bible = require('./data/ESV.json');

    let chapter = '';

    for (i in bible[book][num]){
       chapter += `${i} ${bible[book][num][i]}`;
    }
    return chapter;
  }

  followTouch() {
    this.setState({style: {marginTop: this.state.verse ? 0 : this.state.infoY}});
  }

  render() {
    let pic = { uri : 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmlAAAAJDNhOGMxOWFjLTQ2NjMtNDM4Ni05MjI2LTFiYjkzNDc1MTQ2MQ.jpg' };

    return (
      <View style={{flex: 1}}
        onStartShouldSetResponder = {(evt) => 'true'}
        onMoveShouldSetResponder = {(evt) => 'true'}
        onResponderGrant = {this.responderGrantedHandler.bind(this)}
        onResponderMove = {this.responderMoveHandler.bind(this)}
        onResponderRelease = {this.responderReleaseHandler.bind(this)}
        >
          <Text style={[{flex:1}, this.state.style]}>{this.state.verse ? this.state.verse : this._list}</Text>
      </View>
    );
  }
}

class SomethingCool extends Component {
  render() {
    return (
      <Text>This is Cool: {this.props.cool}</Text>
    )
  }
}

 var style = {
  flex: 1
}