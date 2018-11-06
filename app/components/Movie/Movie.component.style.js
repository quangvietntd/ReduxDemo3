import { StyleSheet } from 'react-native';
import common from '../../styles/common.style';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    header: {
        marginLeft: 20,
        color: theme.HEADER_COLOR,
        fontSize: theme.FONT_SIZE_LARGE,
        fontWeight: 'bold'
    },
    title: {
        marginLeft: 20,
        fontSize: theme.FONT_SIZE_LARGE,
        color: theme.TITLE_COLOR,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1
    },
    ...common


});

export default styles;