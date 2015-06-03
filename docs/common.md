###接口调用方式

提交方式：post
接口参数传递方式

参数传递方式:
接口分为系统参数和业务参数两部分，其中系统参数通过url方式传递，业务参数通过post方式传递；

调用示例：
接口地址：http://api.baidu.com/password/login 有两个业务参数 username和password
则调用方式为：

    curl -post http://api.baidu.com/password/login?platform=android&macid=12.2323.3&wantype=1&screenwidth=10&screenheight=20
    --header 'Content-Type:application/json'
    -d {
        username:"jiaoshou",
        'password":"123456"
    }



###系统参数


名称|类型|是否必须|描述|示例值
---|----|----|----|----|----
platform||是|客户端平台| iphone/ipad/andriod
time||是|时间戳|20140309112229
osversion|	|	是|		客户端系统版本|
macid||		否|		Mac地址|
imei||		否|		国际移动设备身份码|
wantype||		是|		网络连接类型 wifi 3g|
screenwidth||		是|		屏幕宽|
screenheight||		是|		屏幕高|
version|	|	是|		客户端版本|
ip||		是|		IP地址|
token||		是|		用户标识|
sign ||		是|		验签值|

*业务参数请见具体的接口文档*


###接口验签规则
客户端将公共参数中的os、timereq和appkey以下顺序进行组合:
platform=iphone&time=20140309112229&appkey=3452cb52d98a987e798e071d798e090d
客户端将第1步中组合出来的字符串（不要作任何转码）进行MD5加密得到以下签名串：
即md5(“platform=iphone&time=20140309112229&appkey=3452cb52d98a987e798e071d798e090d”,32) =155c5948ebe87e0474db0141b5294e6e
3，客户端将第２步得出来的字符串值155c5948474db01ebe87e041b5294e6e作为公共参数Sign的值传给服务器。
4，服务器在收到参数时候，同样将步骤１和２相应地进行签名验证。如果验证失败可返回约定的StatusCode。
注：密钥（appkey）和签名串都统一使用小写


####约定的密钥
密钥针对不同的手机平台约定不同的密钥
平台|AppKey
--|--
android|	b87d8768a948fde31065a12341808c98
iphone|	3452cb52d98e071d798e090d8a987e79
ipad|	144c7ea5ba671d5e5e2ffcc72d74e37a