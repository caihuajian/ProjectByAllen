/**
 * Created by Sam on 2016/11/29.
 */

import _ from 'lodash';
import JXHelper from '../../../../../Common/JXHelper/JXHelper'
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

let instance = null

let config = {

    myNumbersArray: null,

    playInfo: [''],

    PlayType: ['特码B', '特码A', '特码-种类', '特码-色波', '色波-半波', '色波-半半波', '特肖-生肖', '头尾数', '正码-选号', '五行', '平特一肖', '平特尾数', '正肖-生肖', '7色波-种类', '总肖-种类'],

    getPlayMathNameWithIndex(index){
        return this.PlayType[index];
    },

    getNumbersArray(){
        if (myNumbersArray) {
            return myNumbersArray
        }
        let myNumbersArray = []
        for (let i = 1; i < 50; i++) {
            myNumbersArray.push(JXHelper.foo(i))
        }
        return myNumbersArray
    },

    getSpecialKindArray(){
        return ['特大', '特小', '特尾大', '特尾小', '特单', '特双', '特大单', '特大双', '特合大', '特合小', '特小单', '特小双', '特合单', '特合双', '特天肖', '特地肖', '特前肖', '特后肖', '特家肖', '特野肖']
    },

    getSpecialKindOddsArray(){
        return ['1.988', '1.988', '1.988', '1.988', '1.988', '1.988', '3.76', '3.76', '1.988', '1.988', '3.76', '3.76', '1.988', '1.988', '1.988', '1.988', '1.988', '1.988', '1.988', '1.988']
    },

    getNumberOfColorArray(){
        return {
            "红波": '01  02  07  08  12  13  18  19  23  24  29   30  34  35  40  45  46',
            "蓝波": '03  04  09  10  14  15  20  25  26  31  36   37  41  42  47  48',
            "绿波": '05  06  11  16  17  21  22  27  28  32  33   38  39  43  44  49'
        }
    },

    getNumberOfColorOddsArray(){
        return ['2.78', '2.86', '2.86']
    },

    getNumbersOfColorArray_half(){
        return ['红单', '红双', '红大', '红小', '蓝单', '蓝双', '蓝大', '蓝小', '绿单', '绿双', '绿大', '绿小']
    },

    getNumbersOfColorOddsArray_half(){
        return ['5.58', '5.06', '6.5', '4.5', '5.58', '5.58', '5', '6.58', '5.58', '6.45', '5.58', '6.52']
    },

    getNumbersOfColorArray_half_half(){
        return ['红大单', '红大双', '红小单', '红小双', '蓝大单', '蓝大双', '蓝小单', '蓝小双', '绿大单', '绿大双', '绿大单', '绿小单']
    },

    getNumbersOfColorOddsArray_half_half(){
        return ['14.8', '11.12', '8.92', '8.92', '8.92', '11.12', '14.82', '11.12', '11.12', '11.12', '11.12', '14.82']
    },

    getNumbersOfSpecial_Animal(){
        return ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
    },

    getNumbersOfOddsArraySpecial_Animal(){
        return ['11.6', '11.6', '11.6', '11.6', '11.6', '11.6', '11.6', '11.6', '9.5', '11.6', '11.6', '11.6']
    },

    getNumbersOfZhengXiaoOddsArraySpecial_Animal(){
        return ['1.92', '1.92', '1.92', '1.92', '1.92', '1.92', '1.92', '1.92', '1.75', '1.92', '1.92', '1.92']
    },

    getEndToEndNumbersArray(){
        return ['0头', '1头', '2头', '3头', '4头', '1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾', '0尾']
    },

    getEndToEndNumbersOddsArray(){
        return ['5', '4.36', '4.36', '4.36', '4.36', '9.25', '9.25', '9.25', '9.25', '9.25', '9.25', '9.25', '9.25', '9.25', '11.16']
    },

    getNormalNumberKind(){
        return ['总大', '总小', '总单', '总双']
    },

    getWuXingNumbersArray(){
        return ['金', '木', '水', '火', '土']
    },

    getPingTeYiXiaoOddsArray(){
        return ['2.1', '2.1', '2.1', '2.1', '2.1', '2.1', '2.1', '2.1', '1.8', '2.1', '2.1', '2.1']
    },

    getPingTeWeiShu(){
        return ['1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾', '0尾']
    },

    getPingTeWeiShuOddsArray(){
        return ['1.8', '1.8', '1.8', '1.8', '1.8', '1.8', '1.8', '1.8', '1.8', '2.1']
    },

    getWuXingNumbersOddsArray(){
        return ['4.7', '4,7', '4.7', '4.8', '4.7']
    },
    get7SheBo(){
        return ['红波', '蓝波', '绿波', '和局']
    },
    get7SheBoOddsArray(){
        return ['2.8', '2.8', '2.8', '23']
    },

    getAllAnimalArray(){
        return ['2肖', '3肖', '4肖', '5肖', '6肖', '7肖', '总肖单', '总肖双']
    },
    getAllAnimalOddsArray(){
        return ['14', '14', '14', '3.06', '1.95', '5.3', '1.95', '1.85']
    }
}

//  选注未添加
let numbersDic = {}

//  选注未添加注数
let numberOfUnits = 0

// 选注未添加金额
let amount = 0

//  价格单位
let pricePerUnit = 2

//  倍投数
let multiplier = 1

//选注已添加 价格总数
let totalAmount = 0

//选注已添加 注数总数
let totalBetNumber = 0

//选注已添加json对象
let numbersArray = []

//玩法
let myMathType = ''
let myMathTypeID = ''

//彩票 uid
let gameUniqueId = 'MARK_SIX'


export default class SingletonMarkSixDPS {
    // 构造
    constructor() {
        if (!instance) {
            instance = this
            this.config = config
        }
        return instance;
    }

    resetPlayMath(mathType) {
        numbersDic = {}
        numberOfUnits = 0
        amount = 0
        myMathType = mathType
        myMathTypeID = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
    }

    getmyMathTypeID() {
        return myMathTypeID
    }

    getmyMathTypeIDWithChineseName(name) {
        return PlayMathConfig.getGameMathKeyWithTitle(name, 'MARK_SIX')
    }

    resetPlayGameUniqueId(uniqueId) {
        gameUniqueId = uniqueId
    }

    getAllJSon() {
        let str = ''
        for (var item in numbersDic) {
            if (numbersDic[item].length > 0) {
                str = str + (numbersDic[item].toString().replace(/\,/g, " ")) + '|'
            }
        }
        str = _.trimEnd(str, "|")
        return str
    }

    clearAllData() {
        this.resetPlayMath(myMathType)
        numbersArray = []
        totalBetNumber = 0
        totalAmount = 0
        multiplier = 1
    }

    //清除当前选中但是未加注前的号码
    clearCurrentSelectData() {
        numbersDic = {}
    }

    deleteOneItemWithJsonIndex(index) {
        totalAmount -= numbersArray[index].amount
        totalBetNumber -= numbersArray[index].numberOfUnits
        numbersArray.splice(index, 1)
    }

    addNumberWithType(areaIndex, number) {
        let numbersArr = this.getAreaArrayWith(areaIndex)
        numbersArr.push(number)
        numbersArr.sort(function (a, b) {
            return a - b;
        });
        console.log('numbersDic = ' + JSON.stringify(numbersDic))
    }

    removeNumberWithType(areaIndex, number) {
        let numbersArr = this.getAreaArrayWith(areaIndex)
        numbersArr.remove(number)
        console.log('numbersDic = ' + JSON.stringify(numbersDic))
    }

    getAreaArrayWith(areaIndex) {
        let b = numbersDic[areaIndex]
        if (!b) {
            numbersDic[areaIndex] = []
            b = numbersDic[areaIndex]
        }
        return b
    }

    //加注
    addNumbersDicToArray(odds, price, rebates) {
        if (!this.checkNumbers(myMathType)) return false
        if (numbersDic) {
            let bStr = this.getAllJSon()
            let aStr = bStr.split(" ")


            aStr.map((item) =>{
                if (item.length >0){
                    let json = {}
                    json.betString = item
                    json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
                    json.showGameplayMethod = myMathType
                    if (numberOfUnits == 0) {
                        this.getNumberOfUnits(myMathType)
                    }
                    json.numberOfUnits = 1
                    json.amount = (1 * (price ? price : pricePerUnit)).toFixed(2)
                    json.pricePerUnit = price ? price : pricePerUnit

                    numbersArray.push(json)
                    totalBetNumber += json.numberOfUnits
                    totalAmount += parseFloat(json.amount)
                    this.resetPlayMath(myMathType)
                }
            })

        }
        return true
    }


    resetNumberArrayItemWithIndexAndItem(item,index){
        numbersArray[index] = item
        totalAmount = 0
        numbersArray.map((item)=>{
            totalAmount += parseFloat(item.amount)
        })
    }

    //已经添加的存在的字典数组
    getAlreadyNumberArray() {
        return numbersArray
    }

    //获取未加入的 号码字典
    getWillAddNumbersDic() {
        return numbersDic
    }

    //已经添加的 总价格 注数*倍率
    _getTotalAmount() {
        return totalAmount * multiplier
    }

    //设置倍率
    _setMultipleNumber(number) {
        multiplier = number
    }

    //获取倍率
    _getMultipleNumber() {
        return multiplier
    }

    //获取总注数
    _getNumberOfUnits() {
        return totalBetNumber
    }

    //获取未添加的注数
    _getNoAddNumberOfUnits() {
        return numberOfUnits
    }

    //添加投注前验证
    checkNumbers(playMath) {
        let numbersDic = this.getWillAddNumbersDic()
        let i = 0;
        for (var key in numbersDic) {
            if (numbersDic[key].length > 0) {
                i++
            }
        }
        JXLog('playMath = ' + playMath)
        switch (playMath) {
            case '特码A':
            case '特码B':
            case '特码-种类':
            case '特码-色波':
            case '色波-半波':
            case '色波-半半波':
            case '特肖-生肖':
            case '头尾数':
            case '正码-选号':
            case '正码-种类':
            case '五行':
            case '正肖-生肖':
            case '7色波-种类':
            case '总肖-种类':
            case '平特一肖':
            case '平特尾数': {
                if (i == 1) return true
            }
                break
            case '合肖': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2) return true
                }
            }
        }
        return false
    }

    //计算当前号码池 注单数
    getNumberOfUnits(playMath) {
        if (!this.checkNumbers(playMath)) {
            return 0
        }
        switch (playMath) {
            case '特码A':
            case '特码B':
            case '特码-种类':
            case '特码-色波':
            case '色波-半波':
            case '色波-半半波':
            case '特肖-生肖':
            case '头尾数':
            case '正码-选号':
            case '正码-种类':
            case '五行':
            case '正肖-生肖':
            case '7色波-种类':
            case '总肖-种类':
            case '平特一肖':
            case '平特尾数': {
                let count = 1
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count = count * numArr.length
                }
                return numberOfUnits = count
            }
                break
            case '合肖': {

            }
                break
        }
        return numberOfUnits = 0
    }

    //机选 添加注数
    randomSelect(numberOfUnits, dontAdd) {
        this.clearCurrentSelectData()
        switch (myMathType) {
            case '特码A': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersArray(), dontAdd)
            }
                break
            case '特码B': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersArray(), dontAdd)
            }
                break
            case '特码-种类': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getSpecialKindArray(), dontAdd)
            }
                break
            case '特码-色波': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, ['红波', '蓝波', '绿波'], dontAdd)
            }
                break
            case '色波-半波': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersOfColorArray_half(), dontAdd)
            }
                break
            case '色波-半半波': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersOfColorArray_half_half(), dontAdd)
            }
                break
            case '特肖-生肖': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersOfSpecial_Animal(), dontAdd)
            }
                break
            case '合肖': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersOfSpecial_Animal(), dontAdd)
            }
                break
            case '正码-选号': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersArray(), dontAdd)
            }
                break
            case '正码-种类': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNormalNumberKind(), dontAdd)
            }
                break
            case '头尾数': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getEndToEndNumbersArray(), dontAdd)
            }
                break
            case '五行': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getWuXingNumbersArray(), dontAdd)
            }
                break
            case '正肖-生肖': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersOfSpecial_Animal(), dontAdd)
            }
                break
            case '7色波-种类': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.get7SheBo(), dontAdd)
            }
                break
            case '总肖-种类': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getAllAnimalArray(), dontAdd)
            }
                break
            case '平特一肖': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersOfSpecial_Animal(), dontAdd)
            }
                break
            case '平特尾数': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getPingTeWeiShu(), dontAdd)
            }
                break
        }
    }

    //机选 特码 选号
    getRandomNumberOfSingleEntryUnits(numberOfUnits, dataOrigin, dontAdd) {
        for (let i = 0; i < numberOfUnits; i++) {
            let random = JXHelper.getRandomNumber(dataOrigin.length - 1)
            this.addNumberWithType(0, dataOrigin[random])
            if (!dontAdd)
                this.addNumbersDicToArray(myMathType)
        }
    }

    _getRandomNumber() {
        this.randomSelect(1, true)
        let tempNumDic = _.cloneDeep(numbersDic)
        numbersDic = {}
        return tempNumDic
    }
}


