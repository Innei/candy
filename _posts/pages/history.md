---
date: 2020-05-07T07:21:04.651Z
updated: 2020-09-01T12:47:22.016Z
title: 历史
slug: history
subtitle: 历史的长河
type: Page
permalink: history
---

* 2019-02-14: 博客诞生
* 2019-02-16: 博客误删
* 2019-02-16: 博客恢复
* 2019-02-20: innei.ml → shizuri.net
* 2019-07-03: 暂时将域名302重定向至 null.yiny.me 取消 CloudFlare 减速器的加持
* 2020-01-28: 数据丢失，丢失了一部分评论和文章，TAT
* 2020-05-07: 迁移到自主博客 mx-space, shizuri.net -> innei.ren
* 2020-08-03：迁至国内备案

<h1>一路走来，感谢有你。 <span id="showDays"></span></h1>

<script>
           (() => {
               var seconds = 1000;
                        var minutes = seconds * 60;
                        var hours = minutes * 60;
                        var days = hours * 24;
                        var years = days * 365;
                        var birthDay = Date.UTC(2019,2,14,16,0,0);
                        setInterval(update, 1000);
function update() {
if(!document.getElementById('showDays')) {clearInterval(update);return}
                            let today = new Date();
                            let todayYear = today.getFullYear();
                            let todayMonth = today.getMonth() + 1;
                            let todayDate = today.getDate();
                            let todayHour = today.getHours();
                            let todayMinute = today.getMinutes();
                            let todaySecond = today.getSeconds();
                            let now = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
                            let diff = now - birthDay;
                            let diffYears = Math.floor(diff / years);
                            let diffDays = Math.floor((diff / days));
                            let diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
                            let diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
                            let diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
                            document.getElementById('showDays').innerHTML = "" + diffDays + "天" + diffHours + "小时" + diffMinutes + "分钟" + diffSeconds + "秒";
                        }
  })()
                    </script>