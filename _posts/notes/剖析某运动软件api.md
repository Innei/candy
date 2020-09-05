---
date: 2019-03-08T03:42:00.000Z
updated: 2020-09-04T18:03:17.399Z
title: 剖析某运动软件api
slug: 剖析某运动软件api
id: 15
permalink: notes/15
type: Note
---

这学期学校采用某款外包公司的运动软件来强制性制定运动项目.

名字我不说了.

下面来剖析该软件与服务器之间的交互.分析出他的api是怎么样的

安卓7以下使用packet capture进行抓包. 安卓7以上SSL通信无法正常进行.

这里没图 自己抓.我把我抓到的和post出去的json解释一遍.

```json
{
	"startTime":1551860831865,  //时间截
	"runningSportId":	18,  // 18对应快走，19对应慢跑，20对应快跑 后来通过某种方式得知 212223也对应 应该是跟学校有关 1 2 3 也是
	"studentId":	47xxx,  // 应该是本人唯一值
}

// response start
{
	
	"id": 5457xx,  // 后面的activity id 唯一值
	"runningSportId": 18,  // 快走id
	"endRunningSportId": null,
	"studentId": 47580,
	"distance": null,
	"stepCount": null,
	"costTime": null,
	"speed": null,
	"stepPerSecond": null,
	"distancePerStep": null,
	"targetFinishedTime": null,
	"startTime": 1551860832272,  // 当前服务器时间截(毫秒) 13位
	"kcalConsumed": null,
	"qualified": null,
	"isValid": null,
	"isVerified": null,
	"qualifiedDistance": 4000,
	"qualifiedCostTime": 3360,
	"minCostTime": null,
	"endedAt": null,
	"endedBy": null

}

// activitydata
{
	"distancePerStep": 0.0,
	"locationType": 2,
	"stepCountCal": 0,
	"longitude": 120.xxxx,
	"activityId": 551760,
	"latitude": 27.9xxxxx, //坐标
	"stepCount": 0,
	"isNormal": true,
	"distance": 0,
	"stepPerSecond": 0.0,
	
}

// response data
{

	"statusMsg": "数据提交成功",
	"obj": {
		"id": 64822721, // 随机值
		"activityId": 5457xx, // start返回唯一值id
		"acquisitionTime": 1551860832729, //当前服务器时间截(毫秒) 13位
		"stepCount": 0,
		"stepCountCal": 0,
		"distance": 0,
		"distancePerStep": 0.0,
		"stepPerSecond": 0.0,
		"longitude": 120.7071,
		"latitude": 27.916,
		"locationType": 4,
		"isNormal": true

	}
}


// end request
{
	"targetFinishedTime":0,
	"costTime"	:141,  // 秒
	"distance":	0, // 米
	"stepCount"	:0, 
	"id":545712, // 一次运动 唯一值
}
// response
{
	"id": 545712,
	"runningSportId": 18,
	"endRunningSportId": 18,
	"studentId": 47580,
	"distance": 0,
	"stepCount": 0,
	"costTime": 141,
	"speed": 0.0,
	"stepPerSecond": 0.0,
	"distancePerStep": 0.0,
	"targetFinishedTime": 0,
	"startTime": 1551860832000,
	"kcalConsumed": 4,
	"qualified": false,
	"isValid": true,
	"isVerified": false,
	"qualifiedDistance": 4000,
	"qualifiedCostTime": 3360,
	"minCostTime": 0,
	"endedAt": 1551860975504,
	"endedBy": null
}
```

与api的交互包
![](https://ws2.sinaimg.cn/large/006tKfTcgy1g0v831u966j30s40nhnb2.jpg)
![](https://ws3.sinaimg.cn/large/006tKfTcgy1g0v8m3pwukj30s40nh4ci.jpg)

总体过程:

首先向服务器发送一个start请求,可以看到start的header里有一个Authorization: 后面是JWT加密,通过一个.前面的用base64解密 发现是sha512加密.这里估计是个bug,只要你登陆上去抓到这个Authorization就行了,而且这个不是重点,因为JWT最后一位随便改个大写字母都行.但是这个Authorization不可缺. 确定用户的唯一值是 StudentId
下面看传出的data
首先是有个id 这个id很重要决定了本次运动的id唯一值,只要没有发送end指令,就可以向服务器发送runningactivityData.

然后不停的向服务器发送runningactivityData
这是什么,看看data和回传的json

发现这是实时距离,步数,位置(经纬度)等等

再来看看end

也是这些东西,而且这些东西都可以伪造. 结果取得是end发送的结果. 也就是说前面的runningactivityData只是用来绘制路线而已, 也是判断作弊用的吧

### post模拟(v1.0 .路径模拟.)

说干就干 用python 进行模拟
```python
import requests
import time
import json
import random
from math import radians, cos, sin, asin, sqrt, pow
url = 'https://api.guangyangyundong.com/'
millis = int(round(time.time() * 1000))  # 获取时间截
r = requests.session()
start_time = int(time.time())

# 全局变量
distance = 0
longitude = 120.70645
latitude = 27.917463
lon1 = 120.70645
lat1 = 27.917463
lon2 = 120.70645
lat2 = 27.917463
stepCount = 0
targetFinishedTime = 0

# start
headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; U; Android 5.1; zh-cn; MX4 Build/LMY47I) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36',
    'Authorization': '',
    'Content-Type': 'application/x-www-form-urlencoded'
}
data = {
    'startTime': millis,
    'runningSportId': 20,  # 跑步模式
    'studentId': xxxxx,
}

js = r.post(url + 'api/runningActivities/start',
            data=data, headers=headers).content
js = json.loads(js)
id = js["id"]  # 获取当前运动id

print(id)

# end activity


def end():
    global distance, targetFinishedTime, stepCount
    time.sleep(random.randint(2, 3))  # 模拟停止动作
    end_time = int(time.time()) - start_time  # 间隔时间
    end_data = {

        "targetFinishedTime": targetFinishedTime,  # 预测是目标完成时间
        "costTime": end_time,
        "distance": distance,  # 最后一次activity的距离
        "stepCount": stepCount,  # 步数？？
        "id": id,
    }

    end_running = r.post(url + 'api/runningActivities/end',
                         data=end_data, headers=headers).content
    end_running = json.loads(end_running)
    print(end_running)
    exit(0)  # 退出


def haversine(lon1, lat1, lon2, lat2):  # 经度1，纬度1，经度2，纬度2 （十进制度数）
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    # 将十进制度数转化为弧度
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine公式
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371  # 地球平均半径，单位为公里
    return c * r * 1000

# running activity data post


def anti_activity():  # 回走函数
    global longitude, latitude, lat1, lon1, lat2, lon2, stepCount, distance, start_time, targetFinishedTime
    if distance >= 1000:
        targetFinishedTime = int(time.time()) - start_time
        end()  # 1000m 结束 计算用时
        return
    rand = round(random.randint(1, 100) / 100) / 4200   # 引入随机值
    lon2 = lon1 + pow(-1, random.randint(0, 1)) * \
        round(random.randint(1, 100) / 100) / 1000000  # 左右偏移
    lat2 = lat1 - rand

    distance = round(distance + haversine(lon1, lat1, lon2, lat2))  # 总距离
    distance_per = haversine(lon1, lat1, lon2, lat2)
    stepCount_per = distance_per / 0.6
    stepCount = round(distance_per / 0.6 + stepCount)
    activity_data = {
        # 每秒走了多少步
        "distancePerStep": round(2.4 - random.randint(10, 60) / 100, 1),
        "locationType": 1,  # 根据高德api 应返回1 为GPS定位
        "stepCountCal": stepCount - random.randint(2, 8),  # 比总步数小一点 未证实
        "longitude": lon1,  # 经纬度
        "activityId": id,  # id唯一值
        "latitude": lat1,
        "stepCount": stepCount,  # 总步数
        "isNormal": 'true',  # 未证实
        "distance": distance,  # 距离累加 end应返回最后一个distance
        # 平均速度
        "stepPerSecond": round(3.5 - random.randint(100, 200) / 1000, 1),
    }

    lon1 = lon2
    lat1 = lat2

    print("当前经纬度", longitude)
    print(latitude)
    print("总距离", distance)
    print("每次位移差", distance_per)
    print('总步数', stepCount)
    print("每次步数", stepCount_per)
    print("每秒走多少步", activity_data["distancePerStep"])
    print("平均速度", activity_data["stepPerSecond"])
    log = r.post(url + 'api/runningActivityData',
                 headers=headers, data=activity_data).content
    log = json.loads(log)
    print(log)
    return


def activity():
    global longitude, latitude, lat1, lon1, lat2, lon2, stepCount, distance, start_time, targetFinishedTime
    if distance >= 600:  # 如果大于630米要转弯 我觉得返回跑比较好 差不多这个点
        anti_activity()
        # targetFinishedTime = int(time.time()) - start_time
        return
    rand = random.randint(1, 100000) / 100000000
    lon2 = lon1 + pow(-1, random.randint(0, 1)) * \
        round(random.randint(1, 100) / 100) / 1000000  # 左右偏移 # 引入随机值
    lat2 = lat1 + rand

    distance = round(distance + haversine(lon1, lat1, lon2, lat2))  # 总距离
    distance_per = haversine(lon1, lat1, lon2, lat2)
    stepCount_per = distance_per / 0.6
    stepCount = round(distance_per / 0.6 + stepCount)
    activity_data = {
        # 每秒走了多少步
        "distancePerStep": round(2.4 - random.randint(10, 60) / 100, 1),
        "locationType": 1,  # 根据高德api 应返回1 为GPS定位
        "stepCountCal": stepCount - random.randint(2, 8),  # 比总步数小一点 未证实
        "longitude": lon1,  # 经纬度
        "activityId": id,  # id唯一值
        "latitude": lat1,
        "stepCount": stepCount,  # 总步数
        "isNormal": 'true',  # 未证实
        "distance": distance,  # 距离累加 end应返回最后一个distance
        # 平均速度
        "stepPerSecond": round(3.5 - random.randint(100, 200) / 1000, 1),
    }
    lon1 = lon2
    lat1 = lat2
    print("当前经纬度", longitude)
    print(latitude)
    print("总距离", distance)
    print("每次位移差", distance_per)
    print('总步数', stepCount)
    print("每次步数", stepCount_per)
    print("每秒走多少步", activity_data["distancePerStep"])
    log = r.post(url + 'api/runningActivityData',
                 headers=headers, data=activity_data).content
    log = json.loads(log)
    print(log)


n = 0
while n < 90:
    activity()
    n = n + 1
    rand_time = random.randint(300, 400) / 100
    print('sleep ', rand_time, ' s\n')
    time.sleep(rand_time)  # 睡眠然后再次提交数据
end()

```

![](https://ws3.sinaimg.cn/large/006tKfTcly1g0wpzstbrxj30sf0gnwlw.jpg)

希望有大佬可以进行完善,等等我会在github开源 希望有交流讨论

#### 后续研究

该api存在严重漏洞.
比如可以根据studentId获取到任意学生的运动数据,不需要传入header.
然后根据id能获取每次运动路径
比如
```json
id = 544237
{
  "errors": [],
  "data": {
    "runningActivity": {
      "distance": 1711,
      "costTime": 2312,
      "endedAt": 1551893421000,
      "qualifiedDistance": 800,
      "qualifiedCostTime": 300,
      "kcalConsumed": 387,
      "qualified": false,
      "isValid": true,
      "isVerified": true,
      "runningSport": {
        "name": "快跑"
      },
      "data": [
        {
          "longitude": 120.701575,
          "latitude": 27.921444,
          "isNormal": true,
          "locationType": 5,
          "stepCount": 0,
          "distance": 0,
          "acquisitionTime": 1551850108
        },
        {
          "longitude": 120.70023546006945,
          "latitude": 27.91632161458333,
          "isNormal": false,
          "locationType": 1,
          "stepCount": 0,
          "distance": 0,
          "acquisitionTime": 1551850112
        },
        {
          "longitude": 120.70006863064236,
          "latitude": 27.91600802951389,
          "isNormal": true,
          "locationType": 1,
          "stepCount": 1,
          "distance": 38,
          "acquisitionTime": 1551850116
        },
        {
          "longitude": 120.6999134657118,
          "latitude": 27.915694444444444,
          "isNormal": true,
          "locationType": 1,
          "stepCount": 1,
          "distance": 76,
          "acquisitionTime": 1551850120
        },
        {
          "longitude": 120.69976318359375,
          "latitude": 27.91541232638889,
          "isNormal": true,
          "locationType": 1,
          "stepCount": 1,
          "distance": 110,
          "acquisitionTime": 1551850124
        },
        {
          "longitude": 120.69963433159722,
          "latitude": 27.915142415364585,
          "isNormal": true,
          "locationType": 1,
          "stepCount": 1,
          "distance": 142,
          "acquisitionTime": 1551850128
        },
		
		......
```
当然其他学校数据也能看. 同理