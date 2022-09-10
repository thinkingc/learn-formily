import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Password, Submit, Select, } from '@formily/antd'
import { Tabs, Card } from 'antd'
import * as ICONS from '@ant-design/icons'
import { VerifyCode } from './VerifyCode'

const normalForm = createForm({
  validateFirst: true,
})

const phoneForm = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
    Select,
  },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name])
    },
  },
})

const normalSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
    "name": {
      "type": "string",
      "title": "姓名",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": [],
      "x-component-props": {},
      "x-decorator-props": {
        "tooltip": "please"
      },
      "name": "name",
      "description": "",
      "x-display": "visible",
      "x-pattern": "editable",
      "default": "",
      "enum": [
        {
          "children": [],
          "label1": "1"
        }
      ],
      "x-designable-id": "5dw3n1z90l8",
      "x-index": 0
    },
    "habby": {
      "title": "喜好",
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-validator": [],
      "x-component-props": {
        "mode": true,
        "allowClear": true,
        "defaultActiveFirstOption": false,
        "virtual": true
      },
      "x-decorator-props": {
        "colon": true,
        "asterisk": false
      },
      "x-designable-id": "x5j7l2b4rs6",
      "x-index": 1,
      "name": "habby",
      "x-reactions": {
        "dependencies": [
          {
            "property": "value",
            "type": "any",
            "source": "name",
            "name": "name"
          }
        ],
        "fulfill": {
          "state": {
            "visible": "{{$deps.name === 'name'}}"
          }
        }
      },
      "required": true,
      "enum": [
        {
          "children": [],
          "label": "乒乓球",
          "value": "pp"
        },
        {
          "children": [],
          "label": "篮球",
          "value": "lanqiu"
        }
      ]
    }
  },
}

const phoneSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
      title: '手机号',
      required: true,
      'x-validator': 'phone',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: 'string',
      title: '验证码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'VerifyCode',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
      'x-reactions': [
        {
          dependencies: ['.phone#value', '.phone#valid'],
          fulfill: {
            state: {
              'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
              'component[1].phoneNumber': '{{$deps[0]}}',
            },
          },
        },
      ],
    },
  },
}

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={normalSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  )
}