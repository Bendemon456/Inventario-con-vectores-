class Producto {
    constructor(codigo, nombre, cantidad, precio) {
        this.codigo=codigo;
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
    }

  info() {
    let texto = "";
    for (let i = 0;i<this.objeto.length;i++) {
        texto += this.objeto[i].info();
    }
    return texto;
}

    infohtml(){
        return "<h3>Codigo" + this.codigo + "</h3><p> " +
         this.nombre+ " " +this.cantidad+" "+
         this.precio+"</p>";
    }

}

class Inventario {

    constructor() {
        this.objeto=[];
    }

    agregar(producto) {
        this.objeto.push(producto);
    }

    info(){
        return this.objeto;
    }

    buscar(codigo) {

        for (let i = 0;i<this.objeto.length;i++) {

            if (codigo==this.objeto[i].codigo) {
                return this.objeto[i];
            }

        }

        return null;
    }

    eliminar(codigo) {

        let aux=[];

        for (let i=0;i<this.objeto.length;i++) {

            if (this.objeto[i].codigo!=codigo) {
                aux.push(this.objeto[i]);
            }

        }

        this.objeto=aux;
    }

    agregarInicio(producto) {

        let aux=[];

        aux.push(producto);

        for (let i=0;i<this.objeto.length;i++) {
            aux.push(this.objeto[i]);
        }

        this.objeto=aux;
    }

    listar() {

        let texto = "";

        for (let i=0;i<this.objeto.length;i++) {
            texto += this.objeto[i].infohtml();
        }

        return texto;
    }

    extraerPrimero() {

        if (this.objeto.length==0) {
            return null;
        }

        let primero=this.objeto[0];
        let aux=[];

        for (let i=1;i<this.objeto.length;i++) {
            aux.push(this.objeto[i]);
        }

        this.objeto=aux;

        return primero;
    }
 listarinverso(){
    let texto="";
    for(let i=this.objeto.length-1; i>=0; i--){
        texto += this.objeto[i].infohtml();
    }
    return texto;
}

buscarcodigo(codigo) {
    let inicio = 0;
    let fin = this.objeto.length - 1;
    while (inicio <= fin){
        let mitad = Math.floor((inicio + fin)/2);
        if (this.objeto[mitad].codigo==Number(codigo)){
            return this.objeto[mitad].infohtml();
        }
        if (Number(codigo) < this.objeto[mitad].codigo){
            fin=mitad-1;
        } else {
            inicio=mitad+1;
        }
    }
    return null
}

eliminarcodigo(codigo) {
    let inicio = 0;
    let fin = this.objeto.length - 1;
    while (inicio <= fin) {
        let mitad=Math.floor((inicio + fin) / 2);
        if (this.objeto[mitad].codigo==Number(codigo)) {
            for (let i = mitad;i<this.objeto.length-1; i++) {
                this.objeto[i]=this.objeto[i+1];
            }
            this.objeto.pop();
            return true;
        }
        if (Number(codigo)<this.objeto[mitad].codigo) {
            fin=mitad-1;
        } else {
            inicio=mitad+1;
        }
    }
    return false;
}

extraerUltimo() {
    if (this.objeto.length == 0) {
        return null;
    }
    return this.objeto.pop();
}

}
let inventario = new Inventario();

function agregarproducto() {
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let cantidad = document.getElementById("cantidad").value;
    let precio = document.getElementById("precio").value;

    let nuevo = new Producto(
        Number(codigo),
        nombre,
        Number(cantidad),
        Number(precio)
    );
    if (inventario.agregar(nuevo)) {
        document.getElementById("detalles").innerHTML=nuevo.infohtml();
    }
}
function listarproductos() {
    document.getElementById("detalles").innerHTML=inventario.listar();
}
function listarInverso() {
    document.getElementById("detalles").innerHTML=inventario.listarinverso();
}
function listarTexto() {
    document.getElementById("detalles").textContent = inventario.info();
}

function buscarproducto() {
    let codigo = document.getElementById("codigo").value;
    let resultado = inventario.buscarcodigo(codigo);

    if (resultado == null) {
        document.getElementById("detalles").textContent = "Producto no encontrado";
    } else {
        document.getElementById("detalles").innerHTML = resultado;
    }
}

function eliminarproducto() {
    let codigo=document.getElementById("codigo").value;
    let resultado=inventario.eliminarcodigo(codigo);
    if (resultado) {
        document.getElementById("detalles").textContent="eliminado";
    } else {
        document.getElementById("detalles").textContent="no encontrado";
    }
}

function extraerprimero() {
    let producto=inventario.extraerPrimero();
    if (producto==null) {
        document.getElementById("detalles").textContent="Inventario vacío";
    } else {
        document.getElementById("detalles").innerHTML=producto.infohtml();
    }
}

function extraerultimo() {
    let producto=inventario.extraerUltimo();
    if (producto==null) {
        document.getElementById("detalles").textContent="Inventario vacío";
    } else {
        document.getElementById("detalles").innerHTML=producto.infohtml();
    }
}
