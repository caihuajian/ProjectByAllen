/**
 * Created by Sam on 2016/11/29.
 */

import _ from 'lodash';
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

var JXHelper = require('../../../../../Common/JXHelper/JXHelper')

let instance = null

let config = {

    myNumbersArray: null,

    playInfo: [''],

    // PlayType: ['3D直选', '3D组三单式', '3D组三复式', '3D组六'],

    PlayType: ['3D直选', '3D组三复式', '3D组六'],

    getPlayMathNameWithIndex(index){
        return this.PlayType[index];
    },

    getNumbersArray(){
        if (this.myNumbersArray) {
            return this.myNumbersArray
        }
        let myNumbersArray = []
        for (let i = 0; i < 10; i++) {
            myNumbersArray.push(i)
        }
        return this.myNumbersArray = myNumbersArray
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
let gameUniqueId = ''


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
        console.log('removeNumberWithType = ' + number)
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

    getAreaNumbersCount(areaIndex) {
        return this.getAreaArrayWith(areaIndex).length
    }

    //加注
    addNumbersDicToArray(odds, price, rebates) {
        if (!this.checkNumbers(myMathType)) return false
        if (numbersDic) {
            let aStr = this.getAllJSon()
            let json = {}
            if (aStr.length > 0) {
                json.betString = aStr
                json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
                json.showGameplayMethod = myMathType
                if (numberOfUnits == 0) {
                    this.getNumberOfUnits(myMathType)
                }
                json.numberOfUnits = numberOfUnits
                json.amount = (numberOfUnits * (price ? price : pricePerUnit)).toFixed(2)

                if (rebates) {
                    json.returnMoneyRatio = (rebates/100).toFixed(3)
                }
                json.pricePerUnit = price ? price : pricePerUnit

                numbersArray.push(json)

                totalBetNumber += json.numberOfUnits
                totalAmount += parseFloat(json.amount)
            }
        }
        this.resetPlayMath(myMathType)
        return true
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

        let i = 0
        for (var key in numbersDic) {
            let numsArr = numbersDic[key]
            if (numsArr.length > 0) {
                i++
            }
        }

        switch (playMath) {
            case '3D直选': {
                if (i == 3) return true
            }
                break
            case '3D组三单式':
                if (i == 2) return true
                break
            case '3D组三复式': {
                let combinationNumber = 2
                let count = this.getAreaNumbersCount(0)
                if (count > 1) {
                    let numberOfUnitss = JXHelper.getCombinatorialNumber(count, combinationNumber) * 2
                    if (numberOfUnitss > 0) {
                        return true
                    }
                }
            }
                break
            case '3D组六': {
                let combinationNumber = 3
                let count = this.getAreaNumbersCount(0)
                if (count > 2) {
                    let numberOfUnitss = JXHelper.getCombinatorialNumber(count, combinationNumber)
                    if (numberOfUnitss > 0) {
                        return true
                    }
                }
            }
                break
        }
        return false
    }

    //计算当前号码池 注单数
    getNumberOfUnits(playMath) {
        if (!this.checkNumbers(playMath)) {
            return 0
        }
        let combinationNumber = 0
        let count = 0
        switch (playMath) {
            case '3D直选': {
                let count = 1
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count = count * numArr.length
                }
                return numberOfUnits = count
            }
                break
            case '3D组三单式': {
                return numberOfUnits = 1
            }
                break
            case '3D组三复式': {
                combinationNumber = 2
                count = this.getAreaNumbersCount(0)
                if (count > 0) {
                    return numberOfUnits = JXHelper.getCombinatorialNumber(count, combinationNumber) * 2
                }
            }
                break
            case '3D组六': {
                combinationNumber = 3
                count = this.getAreaNumbersCount(0)
                if (count > 2) {
                    return numberOfUnits = JXHelper.getCombinatorialNumber(count, combinationNumber)
                }
            }
                break
        }
        return numberOfUnits = 0
    }

    //机选 添加注数
    randomSelect(units, dontAdd) {
        this.clearCurrentSelectData()
        switch (myMathType) {
            case '3D直选': {
                this.getRandomNumbersOfSingleEntryUnits(units, 3, true, dontAdd)
            }
                break
            case '3D组三单式': {
                this.getRandomNumbersOfSingleEntryUnits(units, 2, false, dontAdd)
            }
                break
            case '3D组三复式': {
                this.getRandomNumberOfCombinationEntryUnits(units, 2, dontAdd)
            }
                break
            case '3D组六': {
                this.getRandomNumberOfCombinationEntryUnits(units, 3, dontAdd)
            }
                break
        }
    }

    getRandomNumbersOfSingleEntryUnits(units, digits, allowDuplicate, dontAdd) {
        if (allowDuplicate) {
            for (let i = 0; i < units; i++) {
                for (let j = 0; j < digits; j++) {
                    let random = JXHelper.getRandomNumber(9)
                    this.addNumberWithType(j, random)
                }
                if (!dontAdd)
                    this.addNumbersDicToArray(myMathType)
            }

        } else {
            for (let i = 0; i < units; i++) {
                let myArray = this.config.getNumbersArray().concat()
                for (let j = 0; j < digits; j++) {
                    let random = JXHelper.getRandomNumber(myArray.length - 1)
                    let num = myArray[random]
                    myArray.remove(num)
                    this.addNumberWithType(j, num)
                }
                if (!dontAdd)
                    this.addNumbersDicToArray(myMathType)
            }
        }
    }

    //获取定位胆的随机数
    getRandomNumberOfCombinationEntryUnits(units, digits, dontAdd) {
        for (let i = 0; i < units; i++) {
            let myArray = this.config.getNumbersArray().concat()
            for (let j = 0; j < digits; j++) {
                let random = JXHelper.getRandomNumber(myArray.length - 1)
                let num = myArray[random]
                myArray.remove(num)
                this.addNumberWithType(0, num)
                if (!dontAdd)
                    this.addNumbersDicToArray(myMathType)
            }
        }
    }

    _getRandomNumber() {
        this.randomSelect(1, true)
        let tempNumDic = _.cloneDeep(numbersDic)
        numbersDic = {}
        return tempNumDic
    }
}

