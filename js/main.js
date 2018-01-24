new Vue({
    el: 'registro',
    data: {
        nombre: '',
        apellido: '',
        telefono: '',
        fechaNacimiento: '',
        sexo:''
    },
    methods:{
        agregarCliente: function (nombre, apellido, telefono, fechaNacimiento, sexo) {
            console.info(nombre, apellido, telefono, fechaNacimiento, sexo);
            nombre = '';
            apellido = '';
            telefono = '';
            fechaNacimiento = '';
            sexo = '';
        }
    },
    computed:{
        todaLaInfo: function () {
            return this.nombre && this.apellido && this.telefono && this.fechaNacimiento && this.sexo;
        }
    }
});