/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */

axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator: '小李'
    }
}).then((result) => {
    const userObj = result.data.data
    console.log(userObj);
    Object.keys(userObj).forEach(key => {
        if (key == 'avatar') {
            //设置头像
            document.querySelector('.prew').src = userObj[key]
        } else if (key == 'gender') {
            //设置头像
            const genderList = document.querySelectorAll('.gender')
            genderList[userObj[key]].checked = true
        } else {
            document.querySelector(`.${key}`).value = userObj[key]
        }
    })
}).catch((err) => {

});

document.querySelector('.upload').addEventListener('change', e => {
    const fd = new FormData()
    fd.append('img', e.target.files[0])
    fd.append("creator", "小李")

    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'PUT',
        data: fd
    }).then((result) => {
        console.log(result);
        document.querySelector('.prew').src = result.data.data.avatr
    }).catch((err) => {

    });
})

//修改个人信息
document.querySelector('.submit').addEventListener('click', () => {
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, { hash: true, empty: true })
    userObj.creator = '小李'

    console.log(userObj);

    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: userObj
    }).then((result) => {
        const myToast = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(myToast)
        toast.show()
        console.log("sfsfsfs");
    }).catch((err) => {

    });
})