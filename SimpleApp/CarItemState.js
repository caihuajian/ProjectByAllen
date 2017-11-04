import {observable, useStrict, action, computed} from 'mobx';
// useStrict(true);//这里用到了严格模式，在修改类的成员属性的时候函数前面需要加上 @action

export default class CarItemState {
    // 数据源
    @observable list = [];
    // 是否全选
    @observable checkedAll = false;//默认不全选


    @action initData(responseData) {
        this.list = responseData
    };


    //获取选中状态
    getSelectArray() {
        let newArray = []
        for (let i = 0; i < this.list.length; i++) {
            let dict = this.list[i]

            if (dict.checked == true) {
                newArray.push(dict.id);//请求参数
            }
        }

        return newArray;
    }

    // 勾选
    @action onChecked = (id) => {
        this.list.forEach(item => {
            if (item.id === id) {

                for (let i = 0; i < this.list.length; i++) {
                    let dict = this.list[i]
                    dict.checked = false;//可以根据服务器状态进行选中
                }
                item.checked ? this.checkedAll = false : null;
                item.checked = !item.checked;
            }
        });

    }
}
