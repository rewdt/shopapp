import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Provider, connect } from "react-redux";
import { Font } from "expo";
import styled from "styled-components/native";
import { FormattedProvider } from "react-native-globalize";
import client from './lib/client';
import { ApolloProvider } from "react-apollo";

import messages from "./Messages";
import configureStore from "./store";

import Navigator from "./navigation";
import { colors } from "./utils/constants";

const LoadingView = styled.View`
  background-color: red;
`;

const LoadingText = styled.Text`
  color: black;
`;

const Root = styled.View`
  flex: 1;
  background-color: ${colors.BLUE_50};
`;

// const StatusBarAndroid = styled.View`
//   height: 24;
//   background-color: ${colors.BLUE_200};
// `;

class RootContainer extends Component {
  state = {
    fontsAreLoaded: false
  };

  async componentWillMount() {
    await Font.loadAsync({
      "Rubik-Black": require("../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
      "Rubik-BlackItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
      "Rubik-Bold": require("../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
      "Rubik-BoldItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
      "Rubik-Italic": require("../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
      "Rubik-Light": require("../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
      "Rubik-LightItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
      "Rubik-Medium": require("../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
      "Rubik-MediumItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
      "Rubik-Regular": require("../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return (
        <LoadingView>
          <LoadingText>App loading...</LoadingText>
        </LoadingView>
      );
    }
    return (
      <FormattedProvider
        locale={this.props.state.Language.language}
        messages={messages}
      >
        <Root>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          {/* {Platform.OS === "android" && Platform.Version >= 20 ? (
            <StatusBarAndroid />
          ) : null} */}
          <Navigator />
        </Root>
      </FormattedProvider>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const ConnectedRootContainer = connect(mapStateToProps, null)(RootContainer);

const store = configureStore();
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedRootContainer />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;