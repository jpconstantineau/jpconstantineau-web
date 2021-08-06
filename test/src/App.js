import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { Row, Col,  Alert, Space, Card} from 'antd';

import axios from 'axios';
import Group from './Group'
const { Header, Sider, Content } = Layout;
const { Meta } = Card;


import {
QuestionCircleTwoTone,
ShoppingCartOutlined
} from '@ant-design/icons';

import './App.css';

class App extends Component {
  state = {
    items:[],
     groupid:""
}

    componentDidMount(){
      let id = 0;
      axios.get("/data/groups.json")
          .then(res => {
            console.log(res);
              this.setState({
                  items: res.data.slice(),
                  groupid:id
              })
          })
  }


  rendermenuitems(items) {
    const itemlist = items.filter(item => item.visible === true).sort(function(a,b){return(a.rank-b.rank)}).map(item => {
      return(
              <Menu.Item key={item.id} >
                <NavLink exact to={ item.path }  className="nav-link" activeClassName="active" > {item.name}</NavLink>
            </Menu.Item>
            )
      })
    return (
      <Menu theme="dark" mode="inline" >
        <Menu.Item key="top" style={{ fontSize: '125%'}} >
           <a  href="/">
          <img   src="/img/KB.png" width="25" height="25"   alt=""/> 
          &nbsp;
          BlueMicro Store
          </a> 
        </Menu.Item>
            {itemlist}
    </Menu>

    )
  }
  render() {
    const {items} = this.state;
    return (
      <Router>
      <Layout>

      <Sider  breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      >
             
          {this.rendermenuitems(items)}
      </Sider>

      <Layout>
      <Header className="header">
      




      <Row>

        <Col span={2} offset={22}>
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1"><ShoppingCartOutlined style={{ fontSize: '150%'}}/></Menu.Item>
        </Menu>
        </Col>
      </Row>

        
      </Header>

          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 780,
            }}
          >

                <Route exact path="/" component={Home} />
                <Route path="/group/:group_id" component={Group} />

                <Route path="/about" component={About} />
                <Route path="/soldout" component={Soldout} />
                <Route path="/success" component={Success} />
                <Route path="/cancel" component={Cancel} />
                <Route path="/subscribe" component={Subscribe} />
              
          </Content>
        </Layout>
      
    </Layout>
</Router>
    );
  }

}

function Home() {
  let message =  <div className="alert alert-primary" role="alert"> COVID-19 Updates: We are still shipping out to Canada and USA (From Canada) but have updated shipping prices to include tracking. International Shipping is still untracked and on a per-case basis and depends on CanadaPost service availability. </div>;
  return (
    <div >
      <Space wrap align="start" size="middle" >

        <Alert type="info" message={message}></Alert>

        <Card bordered={true} style={{ width: 1550 }}>
          <h2 >DIY Wireless Keyboards Made Simple</h2>
          <p >Making Bluetooth available to DIY Keyboards since 2018! </p>
          <hr />
          <span>Subscribe to our mailing list <a href= "/#/subscribe">here </a></span>  

          <h2>Browse by category</h2>
          
        </Card>

        <Card bordered={true} 
        style={{ width: 375 }}
        cover={
          <img
            src="/img/Wireless.PNG"
          />}
          actions={[
            <NavLink key="details" exact to={"/group/bluemicro" }   > See More: <QuestionCircleTwoTone twoToneColor="#52c41a"/></NavLink>,
          ]} 
        >
        <Meta
          title="BlueMicro: nRF52832 and nRF52840 boards"
          description="Making Bluetooth available to DIY keyboard builders"
        />
        </Card> 

            <Card bordered={true} 
        style={{ width: 375 }}
        cover={
          <img
            src="/img/ergotravellight_v1.01.jpg"
          />}
          actions={[
            <NavLink key="details" exact to={"/group/split_boards" }   > See More: <QuestionCircleTwoTone twoToneColor="#52c41a"/></NavLink>,
          ]} 
        >
        <Meta
          title="ErgoTravel"
          description="Travel-sized Split Keyboards. Designed for the BlueMicro"
        />
        </Card>   

                <Card bordered={true} 
        style={{ width: 375 }}
        cover={
          <img
            src="/img/4x4mx.jpg"
          />}
          actions={[
            <NavLink key="details" exact to={"/group/macropads" }   > See More: <QuestionCircleTwoTone twoToneColor="#52c41a"/></NavLink>,
          ]} 
        >
        <Meta
          title="Macro Pads"
          description="Bluetooth macropads: Built from the ground up."
        />
        </Card>

        <Card bordered={true} 
        style={{ width: 375 }}
        cover={
          <img
          src="/img/4x12contra.jpg"
          fallback="data:image/png;base64,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"
          />}
          actions={[
            <NavLink key="details" exact to={"/group/split_boards" }   > See More: <QuestionCircleTwoTone twoToneColor="#52c41a"/></NavLink>,
          ]} 
        >
        <Meta
          title="Keyboards"
          description="Small 30% to 60% keyboards. Compatible with the BlueMicro"
        />
        </Card> 
  
    
      </Space>
  </div> 
  );
}

function Soldout() {
  return (
    <Card>
          <h2>Soldout</h2>
      <p >The Item you have selected is sold out.</p>
   
  </Card>
  );
}

function Subscribe() {
  return (
    <Card>
      <h2>Subscribe</h2>
      <p><a href="https://us12.campaign-archive.com/home/?u=53180efc53c5ec0fd6f349bed&id=f52b1660a9" title="View previous campaigns">View previous campaigns.</a></p>
    </Card>
    


  );
}

function Cancel() {
  return (
    
    <Card>
    <h2>Cancel</h2>
    <p >You have cancelled your checkout.</p>
      <span className="text-muted">Subscribe to our mailing list <a href= "/#/subscribe">here </a></span> 
  </Card>
  );
}

function Success() {
  return (
    
    <Card>
      <h2>Your order was placed successfully</h2>
      <p>Everything will be packed and shipped by CanadaPost.</p>
      <p >You will be contacted by email (address on file with Paypal) with a question for the following:</p>
      <ul>
        <li>Confirmation of your shipping address</li>
        <li>Contact Phone Number for the Shipping Label</li>
      </ul>
      <p>In case I have any questions or clarifications regarding the order, I will email you.</p>
      <p>If you ave any questions on your order, reach out at bluemicro@jpconstantineau.com</p>
  </Card>
  );
}

function About() {
  return (
    <Card>
    <h2>About</h2>
    <span className="text-muted">Subscribe to our mailing list <a href= "/#/subscribe">here </a></span> 
      <p ><img src="/img/under-construction.gif" width="25" height="25" class="d-inline-block align-mid"   alt=""/>Just like in the 90's, this web page is still under construction! <img src="/img/under-construction.gif" width="25" height="25" class="d-inline-block align-mid"   alt=""/></p>
  </Card>
  );
}
export default App;
