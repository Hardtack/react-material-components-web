/* @flow */
import React from 'react';
import {Router, Route, IndexRedirect, Link, hashHistory} from 'react-router';

import {
  TemporaryDrawer,
  Drawer,
  Content,
  Header,
  HeaderContent
} from 'react-mdcw/lib/drawer/temporary';
import {SELECTED_CLASS_NAME} from 'react-mdcw/lib/drawer/temporary/constants';
import {Typography} from 'react-mdcw/lib/typography';
import {Themed} from 'react-mdcw/lib/theme';
import {Elevation} from 'react-mdcw/lib/elevation';
import {List, Divider, group, item} from 'react-mdcw/lib/list';

import TypographyExample from './typography';
import ElevationExample from './elevation';
import ButtonExample from './button';
import FabExample from './fab';
import CardExample from './card';
import FormFieldExample from './form-field';
import RadioExample from './radio';

import NotFound from './not-found';

class Container extends React.Component {
  props: {
    children: Array<Class<React.Component<*, *, *>>>
  }
  state = {
    drawerOpen: false
  }

  handleMenuButtonPress = () => {
    this.setState({
      drawerOpen: true
    });
  }

  handleOpenDrawer = () => {
    this.setState({
      drawerOpen: true
    });
  }

  handleCloseDrawer = () => {
    this.setState({
      drawerOpen: false
    });
  }

  handleClickLink = () => {
    this.setState({
      drawerOpen: false
    });
  }

  renderMenu (): React.Element<*> {
    return (
      <List wrap={<div />}>
        <item.ListItem
          wrap={Link}
          activeClassName={SELECTED_CLASS_NAME}
          to="/typography"
          onClick={this.handleClickLink}>
          Typography
        </item.ListItem>
        <item.ListItem
          wrap={Link}
          activeClassName={SELECTED_CLASS_NAME}
          to="/elevation"
          onClick={this.handleClickLink}>
          Elevation
        </item.ListItem>
        <item.ListItem
          wrap={Link}
          activeClassName={SELECTED_CLASS_NAME}
          to="/button"
          onClick={this.handleClickLink}>
          Button
        </item.ListItem>
        <item.ListItem
          wrap={Link}
          activeClassName={SELECTED_CLASS_NAME}
          to="/fab"
          onClick={this.handleClickLink}>
          Fab
        </item.ListItem>
        <item.ListItem
          wrap={Link}
          activeClassName={SELECTED_CLASS_NAME}
          to="/card"
          onClick={this.handleClickLink}>
          Card
        </item.ListItem>
        <item.ListItem
          wrap={Link}
          activeClassName={SELECTED_CLASS_NAME}
          to="/form-field"
          onClick={this.handleClickLink}>
          Form Field
        </item.ListItem>
        <item.ListItem
          wrap={Link}
          activeClassName={SELECTED_CLASS_NAME}
          to="/radio"
          onClick={this.handleClickLink}>
          Radio
        </item.ListItem>
        <Divider wrap={<hr />} />
        <item.ListItem
          wrap={<a />}
          href="https://github.com/Hardtack/react-mdcw"
          target="_blank">
          GitHub Repository
        </item.ListItem>
      </List>
    );
  }

  renderToolbar (): React.Element<*> {
    return (
      <Elevation
        wrap={Themed}
        zSpace={4}
        style={{
          display: 'flex',
          paddingLeft: 16,
          paddingRight: 16,
          height: 64,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        backgroundColor="primary"
        textColor="primary"
        onColor="primary">
        <a
          style={{
            display: 'flex',
            width: 64,
            height: 44,
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={this.handleMenuButtonPress}>
          MENU
        </a>
      </Elevation>
    );
  }

  render (): React.Element<*> {
    return (
      <Typography
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}>
        <TemporaryDrawer
          style={{
            zIndex: 1
          }}
          open={this.state.drawerOpen}
          onOpenDrawer={this.handleOpenDrawer}
          onCloseDrawer={this.handleCloseDrawer}>
          <Drawer>
            <Header>
              <HeaderContent
                wrap={Themed}
                textColor="primary"
                onColor="primary"
                backgroundColor="primary">
                React-MDCW
              </HeaderContent>
            </Header>
            <Content
              wrap={<group.ListGroup wrap={<div />} />}>
              {this.renderMenu()}
            </Content>
          </Drawer>
        </TemporaryDrawer>
        {this.renderToolbar()}
        <div
          style={{
            padding: 15,
            overflow: 'scroll',
            display: 'flex',
            flex: 1,
            flexGrow: 1
          }}>
          {this.props.children}
        </div>
      </Typography>
    );
  }
}

export default class Main extends React.Component {
  render (): React.Element<*> {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Container}>
          <IndexRedirect to="/typography" />
          <Route path="typography" component={TypographyExample} />
          <Route path="elevation" component={ElevationExample} />
          <Route path="button" component={ButtonExample} />
          <Route path="fab" component={FabExample} />
          <Route path="card" component={CardExample} />
          <Route path="form-field" component={FormFieldExample} />
          <Route path="radio" component={RadioExample} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}
