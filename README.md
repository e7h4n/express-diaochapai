# express-diaochapai

[调查派]的[expressjs]中间件.

## 例子

```js
var diaochapai = require('express-diaochapai');
var survey = diaochapai({
    appid: 'APPID',
    secret: '调查派的开发者密钥',
    survey: '调查问卷 ID',
    idAttr: 'uid 字段名' // middleware 会从 req[idAttr] 获取用户的 id，通过这个 id 去查询用户的问卷调查状态,
    redirectUrl: '完成调查后的回调地址' // 默认返回当前页面,
    expire: '过期时间'
});

app.get('/lottery', survey, function (req, res) {
    if (req.surveyResult) {
        // surveyResult 是调查结果 id, 这个 id 存在说明用户刚刚完成问卷
    } else {
        // 用户已经完成了问卷，可以在这里显示抽奖结果
    }

    res.send('ok');
});
```

## License

MIT
