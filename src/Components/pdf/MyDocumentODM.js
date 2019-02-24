import React, { Component }  from 'react';
import {Image, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  section1: {
    margin: 10,
    padding: 10,
    width: '100%',
    fontSize: 14,
    textAlign: 'center'
  },
  sectionborder1: {
    padding: 10,
    width: '85%',
    fontSize: 14,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 45
  },
  sectionborder1bis: {
    marginLeft: 45,
    marginRight: 45,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    width: '85%',
    fontSize: 14,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  section2: {
    padding: 10,
    flexGrow: 1,
    width: '30%',
    fontSize: 14
  },
  sectionborder2: {
    marginLeft: 45,
    marginRight: 45,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    flexGrow: 1,
    width: '30%',
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'black',
  },
  sectionborder2droite: {
    marginLeft: 15,
    paddingTop: 7,
    flexGrow: 1,
    width: '300px',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  section3: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '30%',
    fontSize: 14,
    textAlign: 'left'
  },
  logostyle: {
    height: '30%',
    width: '60%'
  },
  date: {
    marginTop: '30px',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    color: '#4d4d4d'
  },
  double: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    color: '#4d4d4d'
  },
  devis: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    color: '#00bfff'
  },
  titre: {
    fontSize: 18,
    textAlign: 'center',
    padding: '10px',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
    color: '#00bfff'
  },
  titre2: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#00bfff'
  },
  titre3: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 7
  },
  list: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '200px',
    marginTop: 7
  },
  inthebox: {
    fontSize: 10,
    textAlign: 'left',
    marginLeft: '10px',
    marginTop: 2
  },
  intheboxcenter: {
    fontSize: 10,
    textAlign: 'center',
    marginLeft: '10px',
    marginTop: 2
  },
  intheboxnom: {
    fontSize: 14,
    textAlign: 'center',
    marginLeft: '10px',
    marginTop: 2,
    marginBottom: 6
  },
  intheboxtel: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: '10px',
    marginTop: 2,
    marginBottom: 6
  },
  intheboxmail: {
    fontSize: 10,
    textAlign: 'center',
    marginLeft: '10px',
    marginBottom: 6
  },
  intheboxespace: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '10px',
    margin: 15
  },
  intheboxminiespace: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '10px',
    margin: 3
  },
  intheboxsignature: {
    fontSize: 10,
    textAlign: 'left',
    marginLeft: '10px',
    marginBottom: 50,
    marginTop: 6
  },
  intheboxmention: {
    fontSize: 8,
    textAlign: 'left',
    marginLeft: '10px'
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
  borderleft: {
    fontSize: 8,
    padding: 9,
    marginLeft: 75,
    borderWidth: 1,
    height: '50px',
    textAlign: 'center',
    borderColor: 'black',
    width: '14%'
    },
  border: {
    fontSize: 8,
    padding: 9,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    alignContent: 'center',
    width: '11%'
    },
    border2: {
      fontSize: 8,
      padding: 9,
      borderWidth: 1,
      borderColor: 'black',
      textAlign: 'center',
      width: '16%'
      },
    border1: {
        fontSize: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        width: '11%'
    },
    footer: {
      fontSize: 7,
      color: 'grey',
      textAlign: 'center'
    },
    footerX: {
      position: 'absolute',
      fontSize: 12,
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey'
    },
  footerZ: {
    position: 'absolute',
    fontSize: 7,
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
  footerY: {
    position: 'absolute',
    fontSize: 7,
    bottom: 33,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
    jumpline: {
      margin: 50,
      patting: 5,
      fontSize:5,
      color: 'white'
    },
    jumplinebig: {
      margin: 70,
      patting: 5,
      fontSize:10,
      color: 'white'
    }
});


export default class MissionModal extends Component {
  constructor(props){
    super(props);
     let listemissions = this.props.missions.map((mission, index) =>
       <View>
       {this.addspace(index)}
       <View style={styles.row}>
       <Text style={styles.borderleft}>{mission.nomission}</Text>
       <Text style={styles.border}>{mission.datededebut}</Text>
       <Text style={styles.border}>{mission.type}</Text>
       <Text style={styles.border1}>{mission.heurededebut}</Text>
       <Text style={styles.border1}>{mission.heuredefin}</Text>
       <Text style={styles.border2}>{mission.remuneration}</Text>
       </View>

       </View>

     );

     console.log(listemissions)

    this.state ={

     mission: listemissions,

     endofdoc:
     <View>

     <Text style={styles.intheboxespace}> </Text>
     <View style={styles.row}>
       <View style={styles.sectionborder2}>
         <Text style={styles.titre2}>LIEU DE LA MISSION </Text>
       </View>
       <View style={styles.sectionborder2}>
       <Text style={styles.titre2}>LE CONTACT CHEZ ACT&CARE </Text>
       </View>
     </View>
     <View style={styles.row}>
       <View style={styles.sectionborder2}>
             <Text style={styles.inthebox}>Centre hospitalier : </Text>
             <Text style={styles.intheboxminiespace}> </Text>
             <Text style={styles.intheboxcenter}>{this.props.nomdusite} </Text>
             <Text style={styles.intheboxcenter}>{this.props.adresseetablissement} </Text>
             <Text style={styles.intheboxminiespace}> </Text>
             <Text style={styles.intheboxminiespace}> </Text>
             <Text style={styles.intheboxmention}>Contact sur place </Text>
             <Text style={styles.intheboxminiespace}> </Text>
             <Text style={styles.intheboxcenter}>Nom : {this.props.nomcontact} </Text>
             <Text style={styles.intheboxcenter}>E-mail : {this.props.emailcontact} </Text>
             <Text style={styles.intheboxcenter}>Tel : {this.props.telcontact} </Text>
             <Text style={styles.intheboxminiespace}> </Text>
       </View>
       <View style={styles.sectionborder2}>
             <Text style={styles.intheboxespace}> </Text>
             <Text style={styles.intheboxnom}>Marie Bourdaud</Text>
             <Text style={styles.intheboxmail}>marie.bourdaud@actandcare.fr </Text>
             <Text style={styles.intheboxtel}>01 79 73 88 00</Text>
             <Text style={styles.intheboxespace}> </Text>
       </View>
     </View>
     <Text style={styles.intheboxespace}> </Text>
     <View style={styles.sectionborder1bis}>
       <Text style={styles.titre2}>COMPLÉMENT D’INFORMATIONS </Text>
     </View>
     <View style={styles.row}>

       <View style={styles.sectionborder1}>
             <Text style={styles.inthebox}>Merci d’avoir rejoint le réseau d’Act&Care ! Nous sommes ravis de vous compter parmi nous. </Text>
             <Text style={styles.inthebox}>Pour votre information, l’hôpital prendra en charge les différents frais associés à cette mission : restaurations, frais de
transport, hébergement. </Text>
             <Text style={styles.intheboxminiespace}> </Text>
             <Text style={styles.inthebox}>Pour rappel : vous êtes rémunéré par le Centre hospitalier. Veillez à signer un contrat de travail avant de
commencer votre mission. Pour tout activité libérale vous devez avoir souscrit à une assurance responsabilité
civile. En travaillant avec Act&Care vous vous engagez à être en règle avec le statut de médecin remplaçant
( âge, PH temps partiel, repos de sécurité, inscription à l’ordre)  </Text>
             <Text style={styles.intheboxminiespace}> </Text>
             <Text style={styles.inthebox}>Nous sommes à votre disposition pour répondre à toutes vos questions ! </Text>
             <Text style={styles.intheboxminiespace}> </Text>
             <Text style={styles.intheboxcenter}>Nous vous souhaitons une très bonne mission !</Text>
       </View>
     </View>
     </View>

    }
  };

  addspace(index){
    let toreturn;
    if(index=== 8){
      toreturn = <Text style={styles.jumplinebig}>X</Text>;
    }
    if( index === 21 || index === 35 || index === 49 ){
      toreturn = <Text style={styles.jumplinebig}>X</Text>;
    }
    return toreturn;
  }



  render(){

    console.log(this)

    return(

      <Document>
        <Page size="A4" style={styles.page}>
              <View style={styles.row}>
                <View style={styles.section2}>
                <Image src="https://i1.wp.com/actandcare.fr/wp-content/uploads/2017/07/Correction-de-lobjectif-.png"/>
                </View>
                <View style={styles.section2}>
                <Text style={styles.intheboxespace}> </Text>
                <Text style={styles.date}>Le {this.props.date}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.devis}>ORDRE DE MISSION</Text>
              </View>
              <Text style={styles.intheboxespace}> </Text>
              <View style={styles.row}>
                <Text style={styles.double}>MEDECIN : {"Dr. "+this.props.nommedecin}</Text>
              </View>
              <Text style={styles.intheboxespace}> </Text>
              <View style={styles.row}>
                <Text style={styles.double}>SPÉCIALITÉ : {this.props.specialite}</Text>
              </View>

              <Text style={styles.intheboxespace}> </Text>

              <View style={styles.row}>
                <Text style={styles.titre}>DETAIL DE LA MISSION</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.borderleft}>N° MISSION</Text>
                <Text style={styles.border}>DATE DE MISSION</Text>
                <Text style={styles.border}>TYPE    DE MISSION</Text>
                <Text style={styles.border1}>HEURE DE DÉBUT</Text>
                <Text style={styles.border1}>HEURE DE FIN</Text>
                <Text style={styles.border2}>RÉMUNÉRATION DU PRATICIEN NET EN €</Text>
              </View>
                {this.state.mission}
                <Text
                        style={styles.footerX}
                        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                        fixed
                      />
                <Text
                        style={styles.footerY}
                        fixed
                      >SARL Act&Care - 42 rue de Maubeuge - 75009 PAris - 01 79 73 88 00</Text>
                <Text
                        style={styles.footerZ}
                        fixed
                      >Capital social de 30 000 € - RCS de Paris 825 306 251 - SIRET 825 306 251 00018 - code Ape 7112B</Text>


        </Page>
        <Page>
        {this.state.endofdoc}
        <Text
                style={styles.footerX}
                render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                fixed
              />
        <Text
                style={styles.footerY}
                fixed
              >SARL Act&Care - 42 rue de Maubeuge - 75009 PAris - 01 79 73 88 00</Text>
        <Text
                style={styles.footerZ}
                fixed
              >Capital social de 30 000 € - RCS de Paris 825 306 251 - SIRET 825 306 251 00018 - code Ape 7112B</Text>

        </Page>
      </Document>
    )

  }


}
