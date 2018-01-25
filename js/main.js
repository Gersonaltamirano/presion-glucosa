/*configuración de Firebase*/
var config = {
    apiKey: "AIzaSyCfqUYJmd_6kLztbO6kSnn4fm5w6Rvma4o",
    authDomain: "presion-glucosa.firebaseapp.com",
    databaseURL: "https://presion-glucosa.firebaseio.com",
    projectId: "presion-glucosa",
    storageBucket: "presion-glucosa.appspot.com",
    messagingSenderId: "1015462401964"
};
firebase.initializeApp(config);

var db = firebase.database();

/*configuración de la aplicación*/
var vm = new Vue({
    el: 'registro',

    mounted: function () {
        db.ref('Clientes/').on('value', function (snapshot) {
           vm.clientes = [];
           var objeto = snapshot.val();
           for(var propiedad in objeto) {
               vm.clientes.unshift({
                   '.key': propiedad,
                   nombre: objeto[propiedad].nombre,
                   apellido: objeto[propiedad].apellido,
                   telefono: objeto[propiedad].telefono,
                   fechaNacimiento: objeto[propiedad].fechaNacimiento,
                   sexo: objeto[propiedad].sexo,
               })
           }
        });
        db.ref('Mediciones/').on('value', function (snapshot) {
            vm.mediciones = [];
            var objeto = snapshot.val();
            for(var propiedad in objeto) {
                vm.mediciones.unshift({
                    '.key': propiedad,
                    nombre: objeto[propiedad].nombre,
                    apellido: objeto[propiedad].apellido,
                    telefono: objeto[propiedad].telefono,
                    fechaNacimiento: objeto[propiedad].fechaNacimiento,
                    sexo: objeto[propiedad].sexo,
                })
            }
        });
    },

    data: {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaNacimiento: '',
        sexo:'',
        telefonoCliente: '',
        sys: '',
        dia: '',
        pulso: '',
        glucosa: '',
        ayunas: '',

        clientes: []
    },
    methods:{
        agregarCliente: function (nombre, apellido, telefono, fechaNacimiento, sexo) {

            db.ref('Clientes/').push({
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                fechaNacimiento: fechaNacimiento,
                sexo: sexo
            });

            this.nombre = '';
            this.apellido = '';
            this.telefono = '';
            this.fechaNacimiento = '';
            this.sexo = '';
        },
        guardarMedicion: function (telefonoCliente, sys, dia, pulso, glucosa, ayunas) {

            db.ref('Mediciones/').push({
                telefono: telefonoCliente,
                sys: sys,
                dia: dia,
                pulso: pulso,
                glucosa: glucosa,
                ayunas: ayunas
            });

            this.telefono = '';
            this.sys = '';
            this.dia = '';
            this.pulso = '';
            this.glucosa = '';
            this.ayunas = '';
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