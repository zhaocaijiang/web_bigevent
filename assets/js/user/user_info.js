$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    // 初始化用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res.message)
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').click(function (e) {
        //阻止表单默认重置行为
        e.preventDefault()
        // 初始化表单
        initUserInfo()
    })

    // 监听表单的提交行为，提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('更改用户信息失败！')
                }
                layer.msg('更改用户信息成功！')
                // <iframe>  中的子页面，如果想要调用父页面中的方法，使用  window.parent  即可
                window.parent.getUserInfo()
            }
        })
    })

})