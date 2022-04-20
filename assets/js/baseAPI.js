// 每次调用接口都需要拼接URL，比较麻烦，而且如果后期更改了接口，不利于后期维护
// 每次调用get，post，Ajax函数时都会优先调用jQuery.ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    // 在发起真正的Ajax请求时，统一拼接接口的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url)

    // 统一为有权限的接口，配置header对象
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete函数,防止每次访问都要挂载
    options.complete = function (res) {
        // console.log(res)
        // responseJSON可以得到后台响应回来的数据
        if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
            // 清空token
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href = '/login.html'
        }
    }
})