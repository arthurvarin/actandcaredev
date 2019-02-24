import React, { Component }  from 'react';
import {Image, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

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
  section2: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '30%',
    fontSize: 14
  },
  sectionborder2: {
    marginLeft: 45,
    marginRight: 45,
    paddingTop: 7,
    flexGrow: 1,
    width: '20%',
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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 7,
    color: '#00bfff'
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
  intheboxespace: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '10px',
    margin: 15
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
    marginLeft: 45,
    borderWidth: 1,
    height: '50px',
    borderColor: 'black',
    width: '13s%',
    textAlign: 'center',
    },
  border: {
    fontSize: 8,
    padding: 9,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    alignContent: 'center',
    width: '10%'
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
    jumpline: {
      margin: 40
    },
    jumplinebig: {
      margin: 90,
      patting: 15,
      fontSize:15,
      color: 'white'
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
}
});



export default class MissionModal extends Component {
  constructor(props){
    super(props);
     let listemissions = this.props.missions.map((mission, index) =>
       <View>
       <View style={styles.row}>
       <Text style={styles.borderleft}>{mission.nomission}</Text>
       <Text style={styles.border}>{mission.datededebut}</Text>
       <Text style={styles.border}>{mission.type}</Text>
       <Text style={styles.border1}>{mission.nomdupraticien}</Text>
       <Text style={styles.border1}>{mission.specialite}</Text>
       <Text style={styles.border2}>{mission.remuneration}</Text>
       <Text style={styles.border2}>{mission.commission}</Text>
       </View>
       {this.addspace(index)}
       </View>

     );

     console.log(listemissions)

    this.state ={




     mission: listemissions,


     endofdoc:
     <View>
     <View style={styles.row}>
       <View style={styles.section2}>
         <Text style={styles.titre2}>Pour l'Etablissement</Text>
       </View>
       <View style={styles.section2}>
       <Text style={styles.titre2}>Pour ACT&CARE</Text>
       </View>
     </View>
     <View style={styles.row}>
       <View style={styles.sectionborder2}>
             <Text style={styles.inthebox}>M. Mme (nom du signataire) : </Text>
             <Text style={styles.intheboxespace}> </Text>
             <Text style={styles.intheboxmention}>Mention manuscrite "Bon pour accord" </Text>
             <Text style={styles.intheboxespace}> </Text>
             <Text style={styles.inthebox}>Date : </Text>
             <Text style={styles.intheboxsignature}>Signature : </Text>
       </View>
       <View style={styles.sectionborder2}>
             <Text style={styles.inthebox}>Mme. Aurelie BARJON</Text>
             <Text style={styles.intheboxespace}> </Text>
             <Text style={styles.inthebox}>Gérante ACT&CARE </Text>
             <Text style={styles.intheboxespace}> </Text>
             <Text style={styles.inthebox}>Date : </Text>
             <Text style={styles.intheboxsignature}>Signature : </Text>
       </View>
     </View>
     <View style={styles.column}>
     <Text style={styles.intheboxespace}> </Text>
     </View>
     </View>

    }
  };

  addspace(index){
    let toreturn;
    if(index=== 5){
      toreturn = <Text style={styles.jumplinebig}> </Text>;
    }
    if( index === 19 || index === 26 || index === 32 || index === 39){
      toreturn = <Text style={styles.jumplinebig}> </Text>;
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
                <Text style={styles.devis}>DEVIS</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.section2}>
                <Text style={styles.double}>Devis n°: {this.props.nodevis}</Text>
                </View>
                <View style={styles.section2}>
                <Text style={styles.double}>REF client : {this.props.refclient}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.section1}>
                <View>
                <Text style={styles.list}>Nom de l'établissement : {this.props.nomdetablissement}</Text>
                <Text style={styles.list}>N° FINESS : {this.props.nofiness}</Text>
                <Text style={styles.list}>Contact : {this.props.contact}</Text>
                <Text style={styles.list}>E-mail : {this.props.email}</Text>
                <Text style={styles.list}>Adresse : {this.props.adresse}</Text>
                </View>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.titre}>LA COMMANDE</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.borderleft}>N° MISSION</Text>
                <Text style={styles.border}>DATE DE MISSION</Text>
                <Text style={styles.border}>TYPE    DE MISSION</Text>
                <Text style={styles.border1}>NOM DU PRATICIEN</Text>
                <Text style={styles.border1}>SPÉCIALITÉ</Text>
                <Text style={styles.border2}>RÉMUNÉRATION DU PRATICIEN NET EN €</Text>
                <Text style={styles.border2}>MONTANT DE LA COMMISSION HT EN €</Text>
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
