/**
 * Created by Sam on 2016/12/13.
 */
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const commonStyles = StyleSheet.create({
    numberViewStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        marginTop: 10,
        marginBottom:5,
        marginRight: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0.5,
        borderColor:'#cccccc'
    },
    numberViewSelectedStyle: {
        borderRadius: 30,
        marginTop: 10,
        marginBottom:5,
        marginRight: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4492d',
    },
    numberViewTitleStyle: {
        color: '#f4492d',
        fontSize:18,
        // fontWeight:'bold'
    },
    numberViewTitleSelectedStyle: {
        color: '#ffffff',
        fontSize:18,
        fontWeight:'bold'
    }

});

export default commonStyles;