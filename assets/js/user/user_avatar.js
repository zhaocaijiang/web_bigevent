// 1.1 获取裁剪区域的 DOM 元素
const $image = $('#image')
const layer = layui.layer
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)

// 为上传按钮绑定点击事件 模拟点击了上传文件
$('#imgChange').click(function () {
    $('#file').click()
})

// 为文件上传框绑定change事件 
$('#file').on('change', function (e) {
    // console.log(e) 得到上传的文件
    const filelist = e.target.files
    if (filelist.length === 0) {
        return layer.msg('请选择照片！')
    }
    // 拿到用户选择的文件
    const file = e.target.files[0]
    // console.log(file)
    // 创建一个对应的url地址
    const newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})

// 为确定按钮绑定上传图片事件
$('#btnUpload').click(function () {
    // 1、拿到需要上传的图片
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2、调用接口，上传图片，渲染头像
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: { avatar: dataURL },
        success: function (res) {
            // console.log('ok')
            if (res.status !== 0) {
                layer.msg('上传图像失败！')
            }
            console.log(res)
            window.parent.getUserInfo()
            layer.msg('上传图像成功')
        }
    })
})