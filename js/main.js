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
new Vue({
    el: 'registro',

    data: {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaNacimiento: '',
        sexo:'',

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
        }
    },
    computed:{
        todaLaInfo: function () {
            return this.nombre && this.apellido && this.telefono && this.fechaNacimiento && this.sexo;
        }
    }
});