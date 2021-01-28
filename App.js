/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, Component } from 'react';
import { TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


class HttpClass extends Component {
    state = {
        user_input: '',
        data: ''
    }
    onPress = (text) => {
        this.setState({ user_input: text})
    }
    toLink = (begin, input, end) => {
        fetch(begin + input + end, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    data: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        let begin = 'https://npiregistry.cms.hhs.gov/api/?first_name='
        let end = '&city=&limit=20&version=2.1'
        let active
        if (!this.state.data.results && this.state.user_input) {
            active = true;
        }

        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={this.onPress}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.toLink(begin, this.state.user_input, end)}
                >
                    <Text>Search</Text>
                </TouchableOpacity>
                {active ? (<View><ActivityIndicator size="small" color="red" /></View>) :
                    <View>
                    <FlatList
                        data={this.state.data.results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <View style={styles.list_item}><Text>{item.basic.last_name}</Text></View>}
                        />
                     </View>
                }
            </View>
        )
    }
}

const App = () => {

    return (
            <HttpClass/>
            
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    list_item: {
        color: "red"
    }
});

export default App;
