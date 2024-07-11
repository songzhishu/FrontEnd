/*
 * @Author: 宋之树 2334304096@qq.com
 * @Date: 2024-07-09 13:45:26
 * @LastEditors: 宋之树 2334304096@qq.com
 * @LastEditTime: 2024-07-09 16:58:44
 * @FilePath: \FrontEnd\AJAX\day02\图书管理\js\index.js
 * @Description: 
 */
function getBookList() {
    axios({
        url: "http://hmajax.itheima.net/api/books",
        params: {
            creator: '小李'
        }
    }).then((result) => {
        console.log(result);

        const str = result.data.data.map((item, index) => {
            /* {
      "id": 450206,
      "bookname": "《水浒传》",
      "author": "施耐庵",
      "publisher": "人民文学出版社"
    } */
            const { id, bookname, author, publisher } = item
            console.log(item);
            return `<tr>
        <td>${index + 1}</td>
        <td>${bookname}</td>
        <td>${author}</td>
        <td>${publisher}</td>
        <td data-id=${id}>
          <span class="del">删除</span>
          <span class="edit">编辑</span>
        </td>
      </tr>`
        }).join('')

        const list = document.querySelector('.list')
        list.innerHTML = str
    }).catch((err) => {

    });
}


getBookList()

//添加数据
const addModalDom = document.querySelector('.add-modal')
const addmodal = new bootstrap.Modal(addModalDom)

//点击保存
const addbtn = document.querySelector('.add-btn')
const addform = document.querySelector('.add-form')

addbtn.addEventListener('click', function () {
    //获取表单数据
    const data = serialize(addform, { hash: true, empty: true })

    axios({
        url: "http://hmajax.itheima.net/api/books",
        method: 'post',
        data: {
            ...data,
            creator: '小李'
        }
    }).then((result) => {
        console.log("保存数据:" + result);
        /* 重新渲染 */
        getBookList()
        addform.reset()
        addmodal.hide()
    }).catch((err) => {

    });


})



//修改  使用时间委托
const list = document.querySelector('.list')

list.addEventListener('click', e => {
    console.log(e.target);

    if (e.target.classList.contains('del')) {
        const id = e.target.parentNode.dataset.id
        console.log(id);

        axios({
            url: `http://hmajax.itheima.net/api/books/${id}`,
            method: 'DELETE'
        }).then((result) => {
            getBookList()
        }).catch((err) => {

        });
    }

    if (e.target.classList.contains('edit')) {
        const id = e.target.parentNode.dataset.id
        console.log(id);
        editmodal.show()
        //获取 书籍信息
        axios({
            url: `http://hmajax.itheima.net/api/books/${id}`,
            method: 'get'
        }).then((result) => {
            console.log(result);
            /* 填充回显 */
            const data = result.data.data

            const keys = Object.keys(data)
            keys.forEach(key => {
                document.querySelector(`.edit-form .${key}`).value = data[key]
            })

            //回显完毕 修改后获取值
        }).catch((err) => {

        });
    }
})



//编辑

const editModalDom = document.querySelector('.edit-modal')
const editmodal = new bootstrap.Modal(editModalDom)

document.querySelector(".edit-btn").addEventListener('click', () => {
    const editform = document.querySelector('.edit-form')

    const data = serialize(editform, { hash: true, empty: true })
    const { id, bookname, author, publisher } = data
    //获取到数据
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'PUT',
        data: {
            bookname,
            author,
            publisher,
            creator: "小李"
        }
    }).then((result) => {
        console.log(result);
        getBookList()
    }).catch((err) => {

    });
    editmodal.hide()
}) 
