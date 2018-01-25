//inicialización de firebase
firebase.initializeApp({
    apiKey: "AIzaSyCfqUYJmd_6kLztbO6kSnn4fm5w6Rvma4o",
    authDomain: "presion-glucosa.firebaseapp.com",
    projectId: "presion-glucosa"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

/*configuración de la aplicación*/
var vm = new Vue({
    el: '#registro',
    mounted: function () {
       this.getClientes();
    },
    data: {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaNacimiento: '',
        sexo:'',
        fechaHora: '',
        telefonoCliente: '',
        sys: '',
        dia: '',
        pulso: '',
        glucosa: '',
        ayunas: '',

        clientes: [],

        mediciones:[],

        medicionesCliente: []
    },
    methods:{
        getClientes: function () {
            db.collection("Clientes").get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    vm.clientes.push(doc.data()) ;
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        },
        agregarCliente: function (nombre, apellido, telefono, fechaNacimiento, sexo) {
            db.collection("Clientes").add({
                Nombre: nombre,
                Apellido: apellido,
                Telefono: parseInt(telefono),
                FechaNacimiento: fechaNacimiento,
                Sexo: sexo
            })
            .then(function(docRef) {

                console.log("datos guardados" + docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

            this.nombre = "";
            this.apellido = "";
            this.telefono = "";
            this.fechaNacimiento = "";
            this.sexo = "";

        },
        guardarMedicion: function (telefonoCliente, sys, dia, pulso, glucosa, ayunas) {
            var f = new Date();
            var fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear() + " " + f.getHours()+":"+f.getMinutes();
            db.collection('Mediciones/').add({
                telefono: parseInt(telefonoCliente),
                sys: parseInt(sys),
                dia: parseInt(dia),
                pulso: parseInt(pulso),
                glucosa: parseInt(glucosa),
                ayunas: ayunas,
                fecha: fecha
            })
            .then(function(docRef) {

                console.log("datos guardados" + docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            this.telefono = '';
            this.sys = '';
            this.dia = '';
            this.pulso = '';
            this.glucosa = '';
            this.ayunas = '';
        },

        leerMediciones: function (telefono) {
            db.collection("Mediciones").where("telefono", "==", telefono)
            .get().then(function(querySnapshot) {
                tablaHistorial.innerHTML = '';
                querySnapshot.forEach(function(doc) {
                    vm.medicionesCliente.push(doc.data()) ;
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }
    },
    computed:{
        todaLaInfo: function () {


            return this.nombre && this.apellido && this.telefono && this.fechaNacimiento && this.sexo;
        },
        todaLaMedicion: function () {
            return this.sys && this.dia && this.pulso && this.glucosa && this.ayunas;
        }
    }
});