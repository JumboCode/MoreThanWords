import { StyleSheet } from 'react-native'

export const iosStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    image: {
        marginBottom: '-2%',
        marginTop: "-20%",
        position: 'relative',
    },
    inputContainer: {
        flex: 0.6,
        position: 'relative',
        width: '70%'
        
    },
    emailField: {
        position: 'absolute',
        marginTop: '0%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '15%',
        paddingRight: '40%',
        borderRadius: 2, 
        marginLeft: '-50%',
        height: '25%',
        width: '116%',

        alignItems: 'center'
    },
    inputField: {
        position: 'absolute',
        marginTop: '22%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '15%',
        paddingRight: '40%',
        borderRadius: 2, 
        marginLeft: '-50%',
        height: '15%',
        width: '116%',
        alignItems: 'center'
    },
    button: {
        marginVertical: 3,
        paddingLeft: '25%',
        paddingRight: '25%',
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        backgroundColor: '#FF3D3D',
        marginTop: '-8%',
        borderRadius: 5,
        fontWeight: 'bold',
    },
    buttonBackground: {
        color: 'white',
    },
    forgot: {
        marginTop: '3%',
        fontSize: 10,
    },
    noAccount: {
        marginTop: '10%',
        fontSize: 12,
    }
})

export const androidStyles = StyleSheet.create({ 
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    image: {
        marginBottom: '-2%',
        marginTop: "-20%",
        position: 'absolute',
    },
    inputContainer: {
        flex: 0.6,
        position: 'relative',
        width: '70%'
        
    },
    emailField: {
        position: 'relative',
        marginTop: '0%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '15%',
        paddingRight: '40%',
        paddingTop: '5%',
        paddingBottom: '5%',
        borderRadius: 2, 
        marginLeft: '-8%',
        height: '150%',
        width: '116%',
        alignItems: 'center'
    },
    inputField: {
        position: 'relative',
        marginTop: '15%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '15%',
        paddingRight: '40%',
        paddingTop: '5%',
        paddingBottom: '5%',
        borderRadius: 2, 
        marginLeft: '-8%',
        height: '100%',
        width: '116%',
        alignItems: 'center'
    },
    button: {
        marginVertical: 3,
        paddingLeft: '25%',
        paddingRight: '25%',
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        backgroundColor: '#FF3D3D',
        marginTop: '30%',
        borderRadius: 5,
    },
    buttonBackground: {
        color: '#FF3D3D'
    },
    forgot: {
        marginTop: '3%',
        fontSize: 10,
    },
    noAccount: {
        marginTop: '10%',
        fontSize: 12,
    }
})