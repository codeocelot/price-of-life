import React, {useState} from 'react';
import {Form, Slider, InputNumber, Row, Col} from 'antd';

type Props = {
  label: string;
  min: number;
  max: number;
  val: number;
  step: number;
  marks: {[k: number]: string};
  field: string;
  numberFormat: string;
  setVal: (field: string, value: number) => void;
}

export default function InputItem(props: Props) {
  function onChange(value: number | string | undefined) {
    if (typeof value == 'undefined' || typeof value == 'string') {
      return;
    }
    props.setVal(props.field, value);
  }
  return (
    
    <Form.Item label={props.label}>
      <Row>
        <Col span={24}>
          <Slider 
            min={props.min}
            max={props.max}
            onChange={onChange}
            step={props.step}
            value={props.val}
            defaultValue={props.val}
            marks={props.marks}
          />
        </Col>
        <Col span={4}>
          <InputNumber 
            formatter={value => {
              if (!value) {
                return '';
              }
              if (typeof value === 'number') {
                value = value.toString();
              }
              return `${props.numberFormat} ${parseInt(value, 10).toFixed(0)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            }
            parser={value => {
              if (!value) {
                return '';
              }
              return value.replace(/\$\s?|(,*)/g, '')
            }}
            size="large" onChange={onChange} value={props.val}
          />
    
        </Col>

      </Row>
    </Form.Item>
  );
}

InputItem.defaultProps = {
  numberFormat: '$',
  step: 10000,
  marks: {},
}