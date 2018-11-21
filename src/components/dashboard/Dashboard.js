import React, {Component} from 'react';

import {Badge, Icon, Layout, Menu} from 'antd';
import {NavLink, Route, Switch} from "react-router-dom";
import {Home} from "../home";
import {About} from "../about";
import {Contact} from "../contact";
import {Login} from "../login";
import AuthContext from '../login/auth-context';
import AuthStatus from '../login/auth-status';

const {Header, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const getCurrentPath = () => {
    const path = document.location.pathname;
    return path.substring(path.lastIndexOf('/'));
};

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.login = ()=> {
            console.log("masuk sini");
            this.setState({
            isAuth: true
          });
        }
        this.logout = ()=> {
          this.setState({
            isAuth: false
          });
        }
        this.state = {
          route: getCurrentPath(),
          isAuth: false,
          login: this.login,
          logout: this.logout
        }
      }
      
    // state = {
    //     route: getCurrentPath(),
    //     isAuth: false
    // };

    // toggleAuth = () => {
    //     this.setState(prevState => {
    //       return {
    //         isAuth: !prevState.isAuth
    //       };
    //     });
    //   };

    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: "#f8f9fa"}}>
                    <div className="logo"/>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[this.state.route]}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="/">
                            <NavLink exact activeClassName="active" to="/">
                                Home
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/about">
                            <NavLink to="/about">
                                About
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/contact">
                            <NavLink to="/contact">
                                Contact
                            </NavLink>
                        </Menu.Item>
                        <SubMenu
                            title={<Badge dot offset={[-15,0]}><Icon type="bell" theme="filled" style={{fontSize: '25px'}}/></Badge>}
                            style={{float: 'right'}}>
                            <MenuItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                        <AuthContext.Provider
                            //value={{ isAuth: this.state.isAuth, toggleAuth: this.toggleAuth }}
                            // value={{ isAuth: this.state.isAuth, login: this.state.login, logout: this.state.logout }}
                            value={this.state}
                        >
                            <AuthStatus />
                        </AuthContext.Provider>
                    </Menu>
                </Header>

                <Content style={{padding: '0 50px', marginTop: 64}}>
                    <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/contact" component={Contact}/>
                            <Route path="/login" component={Login}/>
                        </Switch>
                    </div>
                </Content>

                <Footer style={{textAlign: 'center'}}>
                    Made with <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                </Footer>
            </Layout>
        )
    }
}
