import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity,} from 'react-native'

var BankList = require('../../../Data/bankNameList.json');
var Banks = require('../../../Data/banks.json');
export default class BankUtils {
    // 构造函数
    constructor() {
    }

    /**
     * 查找银行卡名
     * @param num
     */

    findBankName(num) {

        var bankBin = num.substr(0, 6);

        var banBinList = BankList.exclude.bankBins;

        var banks = BankList.exclude.bankNames;
        var len = banBinList.length;
        for (var i = 0; i < len; i++) {
            if (banBinList[i] === bankBin)
                return this.getBank(banks[i]);
        }
        return null;
    }

    /**
     * 根据银行卡名称获取银行卡信息
     * @param name
     */
    getBank(name) {

        var banks = Banks.exclude.banks;
        console.log('-name------' + name)
        var len = banks.length;
        for (var i = 0; i < len; i++) {
            var bank = banks[i];
            if (name.indexOf(bank.name) != -1) {
                return bank;
            }
        }

        return null;
    }

    getBankById(idx) {
        var banks = Banks.exclude.banks;
        return banks[idx];
    }
}

