/**
 * Created by Sam on 2016/12/28.
 * Copyright © 2016年 JX. All rights reserved.
 */

const GameUniqueId = {
    UNKNOWN_ID: 0,
    HF_BJPK10: '北京PK10',
    HF_CQSSC: '重庆时时彩',
    HF_XJSSC: '新疆时时彩',
    HF_TJSSC: '天津时时彩',
    HF_CQKL10F: '重庆快乐十分',
    HF_TJKL10F: '天津快乐十分',
    HF_GDKL10F: '广东快乐十分',
    HF_GDD11: '广东11选5',
    HF_AHD11: '安徽11选5',
    HF_JXD11: '江西11选5',
    HF_SDD11: '山东11选5',
    HF_SHD11: '上海11选5',
    X3D: '福彩3D',
    MARK_SIX: '六合彩',

    HF_HLJD11: '好运11选5',
    HF_CQD11: '重庆11选5',
    HF_ZJD11: '易乐11选5',
    HF_LND11: '辽宁11选5',
    HF_JXSSC: '江西时时彩',
    HF_KLPK: '快乐扑克',
    HF_KUAI3: '快3',
    HF_GXKUAI3: '新快3',
    HF_OLDKUAI3: '江苏快3',
    HF_NMGKUAI3: '易快3',
    HF_HBKUAI3: '湖北快3',
    HF_AHKUAI3: '好运快3',
    HF_KLC: '快乐彩',
    HF_KL8: '快乐8',
    HF_SHSSL: '上海时时乐',
    // 福彩、体彩
    SSQ: '双色球',
    QLC: '七乐彩',
    QXC: '七星彩',
    PL5: '排列五',
    DLT: '大乐透',
    PL3: '排列三',
    // 体育
    SP_JCZQ: '竞彩足球',
    SP_JCLQ: '竞彩篮球',
    SP_FOOTBALL_DCSPF: '足球单场',
    SP_FOOTBALL_SFC: '胜负彩',
    SP_FOOTBALL_9: '任选九场',
    SP_FOOTBALL_DCSFGG: '胜负过关',
    HF_LFSSC: '二分时时彩',
    HF_LFPK10: '二分PK拾',
    HF_LFD11: '二分11选5',
    HF_AHK3: '安徽快3',
    HF_GXK3: '广西快3',
    HF_JSK3: '江苏快3',
    HF_SG28: '新加坡28',
    HF_BJ28: '北京28',
}

const SSC_GameMathKey = {
    '五星-五星直选': "D5",
    '五星-五星通选': "C5",

    '三星-三星直选': "D3",
    '三星-三星组三': "C33",
    '三星-三星组六': "C36",

    '二星-二星直选': "D2",
    '二星-二星组选': "C2",
    '二星-二星组选和值': "CH2",

    '一星-一星直选': "D1",

    '定位胆-定位胆': "DN",

    '大小单双-后二大小单双': "DXDS",
    '大小单双-前二大小单双': "DXDS_Q2",
    '大小单双-前三大小单双': "DXDS_Q3",
    '大小单双-后三大小单双': "DXDS_H3",

    '不定位-前三一码': "BDW_Q31",
    '不定位-前三二码': "BDW_Q32",
    '不定位-后三一码': "BDW_H31",
    '不定位-后三二码': "BDW_H32",
    '不定位-前四一码': "BDW_Q41",
    '不定位-前四二码': "BDW_Q42",
    '不定位-后四一码': "BDW_H41",
    '不定位-后四二码': "BDW_H42",

    '不定位-五星一码': "BDW_Q51",
    '不定位-五星二码': "BDW_Q52",
    '不定位-五星三码': "BDW_Q53",

    '任选二-直选复式': "R2Z",
    '任选二-直选和值': "R2Z_HZ",
    '任选二-组选复式': "R2C",
    '任选二-组选和值': "R2C_HZ",

    '任选三-直选复式': "R3Z",
    '任选三-直选和值': "R3Z_HZ",
    '任选三-组三复式': "R3C3",
    '任选三-组六复式': "R3C6",
    '任选三-组选和值': "R3C_HZ",

    '任选四-直选复式': "R4Z",
    '任选四-组选24': "R4C24",
    '任选四-组选12': "R4C12",
    '任选四-组选6': "R4C6",
    '任选四-组选4': "R4C4"
}

const BJPK10_GameMathKey = {
    '前一': "D1",
    '前二': "GT2",
    '前三': "GT3",
    '定位胆': "DN"
}

const HappyPoker_GameMathKey = {
    '包选': "BX",
    '同花单选': "THDX",
    '顺子单选': "SZDX",
    '同花顺单选': "THSDX",
    '豹子单选': "BZDX",
    '对子单选': "DZDX",
    '任选一': "R1",
    '任选二': "R2",
    '任选三': "R3",
    '任选四': "R4",
    '任选五': "R5",
    '任选六': "R6"
}

const D11X5_GameMathKey = {
    '任选二': "R2",
    '任选二胆拖': "R2DT",
    '任选三': "R3",
    '任选三胆拖': "R3DT",
    '任选四': "R4",
    '任选四胆拖': "R4DT",
    '任选五': "R5",
    '任选五胆拖': "R5DT",
    '任选六': "R6",
    '任选六胆拖': "R6DT",
    '任选七': "R7",
    '任选七胆拖': "R7DT",
    '任选八': "R8",
    '任选八胆拖': "R8DT",
    '前一直选': "Q1Z",
    '前二组选': "Q2C",
    '前二组选胆拖': "Q2CDT",
    '前二直选': "Q2Z",
    '前三组选': "Q3C",
    '前三组选胆拖': "Q3CDT",
    '前三直选': "Q3Z",
}

const MarkSix_GameMathKey = {
    "特码A": "SA",
    "特码B": "SB",
    "特码-种类": 'BS',
    "特码-色波": "C",
    "色波-半波": "C",
    "色波-半半波": "C",
    "特肖-生肖": "SX",
    "头尾数": "SHT",
    "正码-选号": "NG",
    "正码-种类": "NG",
    "五行": "FX",
    "平特一肖": "GSX",
    "平特尾数": "GST",
    "正肖-生肖": "GX",
    "7色波-种类": "SC",
    "总肖-种类": "XC",

    "合肖": "GRPX",
    "正码特": "numGeneralBingo",
    "正码1-6": "	numGeneral126",
    "自选不中	": "noneBingo",
    "二连肖": "	twoXiaosBingo",
    "三连肖	": "threeXiaosBingo",
    "四连肖": "	fourXiaosBingo",
    "五连肖	": "fiveXiaosBingo",
    "二连尾": "	twoTailsBingo",
    "三连尾": "threeTailsBingo",
    "四连尾": "fourTailsBingo",
    "五连尾": "fiveTailsBingo",
    "连码": "lianMa",
}

const D3_GameMathKey = {
    "3D直选": "NIO3",
    "3D组三单式": "GRP3",
    "3D组三复式": "GRP3",
    "3D组六": "GRP6",
}

const KL10F_GameMathKey = {
    "首位数投": 'ST1',
    "首位红投": 'RT1',
    "二连直": 'DC2',
    "二连组": 'CC2',
    "前三直": 'DT3',
    "前三组": 'CT3',
    "快乐二": 'KL2',
    "快乐三": 'KL3',
    "快乐四": 'KL4',
    "快乐五": 'KL5',
}

const PL3_SSL_GameMathKey = {
    '三星-直选复式': 'NIO3',
    '三星-直选和值': 'NS3',
    '三星-组三复式': 'GRP3',
    '三星-组六复式': 'GRP6',
    '三星-组三和值': 'G3S',
    '三星-组六和值': 'G6S',
    '二星-前二直选': 'F2IO',
    '二星-后二直选': 'L2IO',
    '二星-前二组选': 'F2',
    '二星-后二组选': 'L2',
    '定位胆-定位胆': 'SP',
    '不定位-一码不定位': 'NS1P',
    '不定位-二码不定位': 'NS2P',
    '大小单双-前二大小单双': 'F2BSOE',
    '大小单双-后二大小单双': 'L2BSOE'
}

const PCDD_GameMathKey = {
    '混合': 'MIX',
    '波色': 'BS',
    '豹子': 'BZ',
    '特码包三': 'SP3',
    '特码': 'SP',
}


const K3_GameMathKey = {
    '和值': 'HZ',
    '三同号通选': 'STHTX',
    '三同号单选': 'STHDX',
    '三不同号': 'SBTH',
    '三连号通选': 'SLHTX',
    '二同号复选': 'ETHFX',
    '二同号单选': 'ETHDX',
    '二不同号': 'EBTH',
    '和值大小单双': 'DXDS',
    '二不同号胆拖': 'EBTHDT',
    '猜一个号': 'CYG',
}


const GameSetingSpecialSymbolic = {
    SA_NOT_SET: 0,
    ZHU: '猪',
    GOU: '狗',
    JI: '鸡',
    HOU: '猴',
    YANG: '羊',
    MA: '马',
    SHE: '蛇',
    LONG: '龙',
    TU: '兔',
    HU: '虎',
    NIU: '牛',
    SHU: '鼠',
    TAIL0: '0尾'
}

function getGameSetingSpecialSymbolicWithKey(key) {
    return [GameSetingSpecialSymbolic[key]]
}

function getGameMathKeyWithTitle(title, cpName) {
    "use strict";
    switch (cpName) {
        case 'HF_LFSSC':
        case 'HF_CQSSC':
        case 'HF_TJSSC':
        case 'HF_XJSSC':
        case 'HF_JXSSC': {
            return SSC_GameMathKey[title]
        }
            break
        case 'HF_LFPK10':
        case 'HF_BJPK10': {
            return BJPK10_GameMathKey[title]
        }
            break
        case 'MARK_SIX': {
            return MarkSix_GameMathKey[title]
        }
            break
        // case 'X3D': {
        //     return D3_GameMathKey[title]
        // }
        //     break

        case 'HF_LFD11':
        case 'HF_GDD11':
        case 'HF_AHD11':
        case 'HF_JXD11':
        case 'HF_SDD11':
        case 'HF_SHD11': {
            return D11X5_GameMathKey[title]
        }
            break
        case 'HF_CQKL10F':
        case 'HF_TJKL10F':
        case 'HF_GDKL10F': {
            return KL10F_GameMathKey[title]
        }
            break
        case 'HF_LF28':
        case 'HF_SG28':
        case 'HF_BJ28': {
            return PCDD_GameMathKey[title]
        }
            break
        case 'HF_JSK3':
        case 'HF_GXK3':
        case 'HF_AHK3': {
            return K3_GameMathKey[title]
        }
            break
        case 'X3D':
        case 'HF_SHSSL':
        case 'PL3': {
            return PL3_SSL_GameMathKey[title]
        }
            break
        case 'HF_LFKLPK': {
            return HappyPoker_GameMathKey[title]
        }
            break
    }
}

export {
    GameUniqueId,
    SSC_GameMathKey,
    BJPK10_GameMathKey,
    D11X5_GameMathKey,
    MarkSix_GameMathKey,
    D3_GameMathKey,
    K3_GameMathKey,
    getGameSetingSpecialSymbolicWithKey,
    getGameMathKeyWithTitle
}