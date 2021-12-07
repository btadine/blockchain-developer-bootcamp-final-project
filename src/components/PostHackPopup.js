import React, { useState, useEffect} from "react";

import 'antd/dist/antd.css';

import './PostHackPopup.css'

import {
  Form,
  Input,
  Button,
  Select,
  Modal
} from 'antd';

const PostHackPopup = (props) => {
    const [textValue, setTextValue] = useState("");
    const [cityId, setCityId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);

      const cities = [
  "All Cities",
  "Barcelona",
  "Buenos Aires",
  "Lisbon",
  "Madrid",
  "London",
  "Tokyo",
  "New York",
  "San Francisco",
  "Berlin",
  "Paris",
  "Rome",
  "Athens"];

  const categories = [
  "All categories",
  "Cheap Places",
  "Nice Spots",
  "Traditional",
  "Parking",
  "Coworking",
  "Misc"
  ];

  const handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    this.setState({ visible: false });
  };
    return (
      <Modal className="hackPopup" destroyOnClose="true" visible={props.visible}
      position="right center" onCancel={props.closePopup}
               footer={[
            <Button key="back" onClick={props.closePopup}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={true} onClick={props.closePopup}>
              Submit
            </Button>,
            <Button
              key="link"
              href="https://google.com"
              type="primary"
              loading={true}
              onClick={props.closePopup}
            >
              Search on Google
            </Button>,
          ]}>
       {
      <div className="modal">
        <div className="header"> Post your cityhack </div>
        <div className="content">
          {' '}
          Select a city, a category and enter a description of your cityhack.
          <Form layout="inline" size="middle">
      <Form.Item style={{width : '40%'}}>
        <Select className="Select" style={{ margin : "0px" }} value={cityId} aria-label="Default select example" onChange={(e) => setCityId(e)}>
        {cities.map((city, index) => {
          return (
            <Select.Option key={'city'+index} value={index}>{city}</Select.Option>);
        })}
</Select>
</Form.Item>
<Form.Item style={{width : '40%'}}>
        <Select className="Select" style={{ margin : "0px" }} value={categoryId} disabled={cityId === 0} aria-label="Default select example" onChange={(e) =>
         setCategoryId(e)}>
        {categories.map((category, index) => {
          return (
            <Select.Option key={'category'+index} value={index}>{category}</Select.Option>);
        })}
</Select>
</Form.Item>
      <Form.Item className="descriptionBox" style={{width : '100%'}} label="Description">
        <Input style={{height: 120}} rows={4} autoSize={{ minRows: 2, maxRows: 4 }} showCount maxLength={100}  placeholder="ie. cheap beers, a nice view spot, hipster coffee place" />
      </Form.Item>
    </Form>
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
            }}
          >
            Okay
          </button>
        </div>
      </div>
    }
  </Modal>)
}

export default PostHackPopup;