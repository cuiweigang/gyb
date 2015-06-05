define({ "api": [  {    "type": "post",    "url": "/login",    "title": "1.登陆",    "version": "1.0.0",    "group": "passport",    "description": "<p>根据手机号和密码进行登陆</p> ",    "header": {      "examples": [        {          "title": "请求头",          "content": "{\n  \"content-type\": \"application/json\"\n}\n或者\n{\n\"content-type\": \"application/x-www-form-urlencoded\"\n}",          "type": "json"        }      ]    },    "permission": [      {        "name": "任何用户"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "name",            "description": "<p>Name of the User.</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "Age",            "description": "<p>Age of the User.</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "Person",            "description": "<p>Name of the User.</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "Zhege",            "description": "<p>Name of the User.</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "parm",            "description": "<p>Name of the User.</p> "          }        ]      }    },    "success": {      "examples": [        {          "title": "返回结果",          "content": "HTTP/1.1 200 OK\n{\n  \"firstname\": \"John\", //加班\n  \"lastname\": \"Doe\"\n}",          "type": "json"        }      ]    },    "filename": "routes/index.js",    "groupTitle": "passport",    "name": "PostLogin"  }] });