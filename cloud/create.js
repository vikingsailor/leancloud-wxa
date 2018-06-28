const uuid = require('uuid/v4');
const AV = require('leanengine');
const Order = require('../model/order');
const { wxpay, wxapi } = require('../libs/wxapi');	
var xlsx = require('node-xlsx');
var fs = require('fs');
/** 
 * 小程序创建文件
 */
AV.Cloud.define('createexcel', (request, response) => {
    
    const user = request.currentUser;
    if (!user) {
        return response.error(new Error('用户未登录'));
    }
    const authData = user.get('authData');
    if (!authData || !authData.lc_weapp) {
        return response.error(new Error('当前用户不是小程序用户'));
    }
	var data = [
    {
        name : 'sheet1',
        data : [
            [
                'ID',
                'Name',
                'Score'
            ],
            [
                '1',
                'Michael',
                '99'

            ],
            [
                '2',
                'Jordan',
                '98'
            ]
        ]
    },
    {
        name : 'sheet2',
        data : [
            [
                'AA',
                'BB'
            ],
            [
                '23',
                '24'
            ]
        ]
    }
]

// 写xlsx
var buffer = xlsx.build(data);
fs.writeFile('./resut.xls', buffer, function (err)
{
    if (err)
        throw err;
    console.log('Write to xls has finished');
    
// 读xlsx
    var obj = xlsx.parse("./" + "resut.xls");
    console.log(JSON.stringify(obj));
	 response.success(obj);
}
);
	
  
});
