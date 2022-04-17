$(function () {
    // 去注册的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 导入layUI，自定义校验规则
    // 导入form对象
    const form = layui.form
    // 导入layer对象模块
    const layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // value得到该表单的值
            const pwd = $('.reg-box [name=password]').val()
            // console.log(pwd)
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册的表单提交事件
    $('#form_reg').on('submit', function (e) {
        // 1、阻止表单的默认提交行为
        e.preventDefault()
        // 2、post发起注册请求
        $.post('/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！请登录！')
                // 自动跳转到登录页面
                $('#link_login').click()
            }
        )
    })

    // 监听登录提交事件
    $('#form_login').submit(function (e) {
        // 1、阻止表单的默认提交行为
        e.preventDefault()
        // 2、post发起登录请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单元素
            // Serialize 序列化将 对象 或某种其他类型的数据结构转换为可存储格式（例如，文件或 buffer）。
            // data: $(this).serialize(),
            data: {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()
            },
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 跳转到后台主页
                // console.log(res.token)
                // 将登录成功后的token值保存到localstorage中
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }


        })

    })
})