import { StyleSheet } from "react-native";

export const MainStyle = StyleSheet.create ({
    // Body
    body: {
        flex:1,
        backgroundColor:'#a5bee6',
    },

    // Cards
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: '5%',
        paddingHorizontal: '2%',
    },
    cardView: {
        flexBasis: '48%',
        marginHorizontal: '1%',
        marginBottom: '2%',
    },
    card: { 
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff'
    },
    cardAddText: {
        fontFamily: 'Mina-Regular',
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
    },
    cardTitle: {
        fontFamily: 'Mina-Bold',
        fontSize: 35,
        textAlign: 'center',
    },
    cardSubtitle: {
        fontFamily: 'Mina-Regular',
        fontSize: 15,
        textAlign: 'center',
    },
    icon: {
        textAlign: 'center',
    },

    // Modal
    modalHeader: {
        width: '100%',
        height: 56,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeaderText: {
        fontSize: 30,
        fontFamily: 'Mina-Bold',
        color: '#0456d9',
    },
    modalInput: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '5%',
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: '3%',
        fontFamily: 'Mina-Regular',
        color: '#0456d9',
    },
    sectionContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: '5%',
        marginTop: '5%',
        paddingHorizontal: '10%',
        paddingBottom: '5%',
        backgroundColor: '#fff',
        borderRadius: 40,
      },
      sectionContainerText: {
        fontFamily: 'Mina-Regular',
        color: '#0456d9',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '2%',
      },
      buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: '2%',
        marginVertical: '5%',
      },
      modalButton: {
        flex: 1,
        backgroundColor: '#fff',
        margin: '1%',
        paddingVertical: '4%',
        borderRadius: 40,
      },
      modalButtonText: {
        fontFamily: 'Mina-Bold',
        color: '#0456d9',
        textAlign: 'center',
        fontSize: 18,
      },
});