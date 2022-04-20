$(function () {
    getUserInfo()
    // console.log('cg')
    const layer = layui.layer
    $('#btnLogOut').click(function () {
        // 弹出询问框
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1、清除token
            localStorage.removeItem('token')
            //2、 跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
// 函数得放在入口函数之外，因为其他窗口也需要调用以下函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //属性字母不能大写
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 控制用户的访问权限 ,如果不控制，在输入主页url时可直接访问
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     console.log(res)
        //     // responseJSON可以得到后台响应回来的数据
        //     if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
        //         // 清空token
        //         localStorage.removeItem('token')
        //         // 跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1、设置用户昵称
    const name = user.nickname || user.username
    // 2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3、 按需渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        // console.log('1')
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    }
    else {
        // console.log('2')
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}