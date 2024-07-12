

$(document).ready(function() {

  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {

    // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
    var rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(value)) {
        return false;
    }
  
    // Validar el dígito verificador
    var rutSinGuion = value.replace("-", "");
    var rut = rutSinGuion.slice(0, -1);
    var dv = rutSinGuion.slice(-1);
    var factor = 2;
    var sum = 0;
    for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut.charAt(i)) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }
    var dvCalculado = 11 - (sum % 11);
    dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

    return dv === dvCalculado;
  }, "El RUT no es válido (escriba sin puntos y con guión)");

  // Agregar método de validación para correo
  $.validator.addMethod("emailCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

  }, 'El formato del correo no es válido');
  
  // Agregar método de validación para que un campo sólo acepte 
  // letras y espacios en blanco, pero no números ni símbolos,
  // ideal para campos como nombres y apellidos
  $.validator.addMethod("soloLetras", function(value, element) {

    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);

  }, "Sólo se permiten letras y espacios en blanco.");

 
  // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
 if(document.getElementById('rut')) {
  document.getElementById('rut').addEventListener('keyup', function(e) {
    e.target.value = e.target.value.toUpperCase();
  });

 }

  // Validar formulario con JQuery
  $("#formulario-registro").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true
      },
      nombre: {
        required: true,
        soloLetras: true,     
        minlength: 5,
        maxlength: 15,
      },
      apellido: {
        required: true,
        soloLetras: true,
        minlength: 5,
        maxlength: 15,
      },
      correo: {
        required: true,
        emailCompleto: true,
      },direccion: {
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 15,
      },
      password2: {
        required: true,
        minlength: 5,
        maxlength: 15,
        equalTo: "#password",
      },
    }, // --> Fin de reglas
    messages: {
      rut: {
        required: "El RUT es un campo requerido",
        rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
      },
      nombre: {
        required: "El nombre es un campo requerido",
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        minlength: "El nombre debe tener un mínimo de 5 caracteres",
        maxlength: "El nombre debe tener un máximo de 15 caracteres"
      },
      apellido: {
        required: "El apellido es un campo requerido",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
        minlength: "El apellido debe tener un mínimo de 5 caracteres",
        maxlength: "El apellido debe tener un máximo de 15 caracteres"
      },
      correo: {
        required: "El correo es un campo requerido",
        email: "El formato del correo no es válido",
      }, 
      direccion: {
        required: "La dirección es un campo requerido",
        minlength: "La dirección debe tener un mínimo de 5 caracteres",
        maxlength: "La dirección debe tener un máximo de 50 caracteres"

      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      password2: {
        required: "Repetir contraseña es un campo requerido",
        minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
        equalTo: "Debe repetir la contraseña escrita anteriormente",
      },
    }, 
  });
  
});

$(document).ready(function() {
  // Agregar método de validación para correo
  $.validator.addMethod("emailCompleto", function(value, element) {
    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Validar correo electrónico con la expresión regular
    return regex.test(value);
  }, 'El formato del correo no es válido');

  // Validar formulario de ingreso con JQuery
  $("#formulario-ingreso").validate({
    rules: {
      cuenta: {
        required: true,
        emailCompleto: true,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 15,
      }
    },
    messages: {
      cuenta: {
        required: "El campo de cuenta es requerido",
        email: "El formato del correo no es válido",
        
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      }
    }
  });

  $("#formulario_misdatos").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true
      },
      nombre: {
        required: true,
        soloLetras: true,     
        minlength: 5,
        maxlength: 15,
      },
      apellido: {
        required: true,
        soloLetras: true,
        minlength: 5,
        maxlength: 15,
      },
      correo: {
        required: true,
        emailCompleto: true,
      },direccion: {
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 15,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 15,
        equalTo: "#password1",
      },
    }, // --> Fin de reglas
    messages: {
      rut: {
        required: "El RUT es un campo requerido",
        rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
      },
      nombre: {
        required: "El nombre es un campo requerido",
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        minlength: "El nombre debe tener un mínimo de 5 caracteres",
        maxlength: "El nombre debe tener un máximo de 15 caracteres"
      },
      apellido: {
        required: "El apellido es un campo requerido",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
        minlength: "El apellido debe tener un mínimo de 5 caracteres",
        maxlength: "El apellido debe tener un máximo de 15 caracteres"
      },
      correo: {
        required: "El correo es un campo requerido",
        email: "El formato del correo no es válido",
      }, 
      direccion: {
        required: "La direccion es un campo requerido",
        minlength: "La direccion debe tener un mínimo de 5 caracteres",
        maxlength: "La direccion debe tener un máximo de 50 caracteres"

      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      password: {
        required: "Repetir contraseña es un campo requerido",
        minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
        equalTo: "Debe repetir la contraseña escrita anteriormente",
      },
    }, 
  });
  
});



$("#formulario-bodega").validate({
  rules: {
    categoria: {
      required: true,

    },
    nombre: {
      required: true,
    },
    cantidad: {
      required: true,
      number:true,
      min:0,

    },
  }, // --> Fin de reglas
  messages: {
    categoria: {
      required: "El campo categoría es obligatorio"
    },
    nombre: {
      required: "El campo nombre es obligatorio"
    },
    cantidad: {
      required: "El campo cantidad es obligatorio",
      number: "La cantidad debe ser un número entero",
      min:"La cantidad debe ser igual o mayor que cero"

      
    },
  }, 
});


$(document).ready(function() {
    $('#mformulario-adminusuarios').on('submit', function(e) {
        // Evita que el formulario se envíe
        e.preventDefault();

        // Verifica si algún radio button está seleccionado
        if ($('input[name="usuario"]:checked').length > 0) {
            $('#message').text('');
            // Aquí puedes proceder a enviar el fsormulario
        } else {
            $('#message').text('Por favor, selecciona un tipo de usuario.');
        }
    });
});


$("#formulario-adminusuarios").validate({
  rules: {
    id:{
      required:true,
      number:true,
      min:0,
    },
    rut: {
      required: true,
      rutChileno: true
    },
    nombre: {
      required: true,
      soloLetras: true,     
      minlength: 5,
      maxlength: 15,
    },
    apellido: {
      required: true,
      soloLetras: true,
      minlength: 5,
      maxlength: 15,
    },
    correo: {
      required: true,
      emailCompleto: true,
    },direccion: {
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      required: true,
      minlength: 5,
      maxlength: 15,
    },
    password: {
      required: true,
      minlength: 5,
      maxlength: 15,
      equalTo: "#password1",
    },
  }, // --> Fin de reglas
  messages: {
    id:{
      required:"El ID es un campo requerido",
      number:"El ID debe ser un número entero",
      min:"El ID debe ser igual o mayor que cero"
    },
    rut: {
      required: "El RUT es un campo requerido",
      rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
    },
    nombre: {
      required: "El nombre es un campo requerido",
      soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
      minlength: "El nombre debe tener un mínimo de 5 caracteres",
      maxlength: "El nombre debe tener un máximo de 15 caracteres"
    },
    apellido: {
      required: "El apellido es un campo requerido",
      soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
      minlength: "El apellido debe tener un mínimo de 5 caracteres",
      maxlength: "El apellido debe tener un máximo de 15 caracteres"
    },
    correo: {
      required: "El correo es un campo requerido",
      email: "El formato del correo no es válido",
    }, 
    direccion: {
      required: "La dirección es un campo requerido",
      minlength: "La dirección debe tener un mínimo de 5 caracteres",
      maxlength: "La dirección debe tener un máximo de 50 caracteres"

    },
    password: {
      required: "La contraseña es un campo requerido",
      minlength: "La contraseña debe tener un mínimo de 5 caracteres",
      maxlength: "La contraseña debe tener un máximo de 15 caracteres",
    },
    password2: {
      required: "Repetir contraseña es un campo requerido",
      minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
      maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
      equalTo: "Debe repetir la contraseña escrita anteriormente",
    },
  }, 
});
$("#formulario-productos").validate({
  rules: {
    id:{
      required:true,
      number:true,
      min:0,
    },
    categoria: {
      required: true,
    },
    nombre: {
      required: true,
    },
    descripcion: {
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    precio: {
      required: true,
      number: true,
      min:0
    },descuentoSubscriptor: {
      required: true,
      number: true,
      min:0,
      max:100
    },descuentoOferta: {
      required: true,
      number: true,
      min:0,
      max:100
    },
  },
  messages: {
    id:{
      required:"El ID es un campo requerido",
      number:"El ID debe ser un número entero",
      min:"El ID debe ser igual o mayor que cero"
    },
    categoria: {
      required: "El campo categoría es un requerido",
    },
    nombre: {
      required: "El nombre es un campo requerido",
    },
    descripcion: {
      required: "La descripción es un campo requerido",
      minlength: "La descripción debe tener un mínimo de 5 caracteres",
      maxlength: "La descripción debe tener un máximo de 50 caracteres"
    },
    precio: {
      required: "El precio es un campo requerido",
      number:"El precio debe ser un número",
      min:"El precio debe ser igual o mayor que cero"
    }, 
    descuentoSubscriptor: {
      required: "El descuento de subscriptor es un campo requerido",
      number:"El descuento debe ser un número",
      min:"El descuento debe ser igual o mayor que cero",
      max:"El descuento debe ser menor o igual que cien"
    },
    descuentoOferta: {
      required: "El descuento de oferta es un campo requerido",
      number:"El descuento debe ser un número",
      min:"El descuento debe ser igual o mayor que cero",
      max:"El descuento debe ser menor o igual que cien" 
    
    },
  }, 
});



