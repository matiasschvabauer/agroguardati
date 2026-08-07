const catalogo = [
  {
    id: 1,
    nombre: "Tractor Serie MF 8S",
    categoria: "Tractores",
    marca: "Massey Ferguson",
    estado: "Nuevo",
    imagen: "https://www.agriculture.com/thmb/w_SJtsIQZwHjsB_chSQjaRUQa44=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MF21PV004DS-8S-668A9974-2000-62bd66c5a44247a883951dd366b41576.jpg",
    descripcionCorta: "Potencia, confort y eficiencia de vanguardia para las labores más exigentes.",
    descripcionLarga: "El tractor Serie MF 8S ofrece una nueva era de tractores confiables y fáciles de usar, brindando un nuevo nivel de confort en la cabina y conectividad total. Diseñado para agricultores que buscan la máxima potencia con el menor consumo de combustible.",
    especificaciones: {
      "Potencia": "205 - 265 CV",
      "Transmisión": "Dyna-E-Power o Dyna-7",
      "Capacidad de Levante": "Hasta 10.000 kg",
      "Motor": "AGCO Power 7.4 L, 6 cilindros"
    }
  },
  {
    id: 2,
    nombre: "Cosechadora Axial Flow 150",
    categoria: "Cosechadoras",
    marca: "Case IH",
    estado: "Usado",
    imagen: "https://agricolanoroeste.com.ar/wp-content/uploads/2025/10/Linea250-3.jpg",
    descripcionCorta: "Máxima productividad y calidad de grano en cualquier condición de cosecha.",
    descripcionLarga: "La Serie Axial-Flow 150 está diseñada para las demandas de los productores que buscan rendimiento en diversas condiciones y cultivos. Con su legendario diseño de un solo rotor, garantiza una trilla suave, lo que resulta en más granos de alta calidad.",
    especificaciones: {
      "Potencia": "299 CV",
      "Capacidad del Tanque": "8.800 L",
      "Plataforma": "Hasta 30 pies",
      "Sistema de Limpieza": "Cross Flow"
    }
  },
  {
    id: 3,
    nombre: "Sembradora Monumental",
    categoria: "Sembradoras",
    marca: "Agrometal",
    estado: "Nuevo",
    imagen: "https://maquinac.com/wp-content/uploads/2016/07/Sembradora-Achilli-Di-Battista-Monumental-AT-8300.jpg",
    descripcionCorta: "Precisión extrema para una siembra perfecta en granos gruesos.",
    descripcionLarga: "La sembradora de precisión ideal para el productor moderno. Ofrece un copiado del terreno inigualable y una distribución de semillas exacta, asegurando un stand de plantas uniforme y maximizando el rendimiento por hectárea.",
    especificaciones: {
      "Distancia entre hileras": "35 cm / 52,5 cm / 70 cm",
      "Tolvas": "Gran capacidad para semillas y fertilizante",
      "Dosificador": "Neumático de alta precisión",
      "Chasis": "Articulado"
    }
  },
  {
    id: 4,
    nombre: "Pulverizador Patriot 250",
    categoria: "Pulverizadores",
    marca: "Case IH",
    estado: "Usado",
    imagen: "https://cnhi-p-001-delivery.sitecorecontenthub.cloud/api/public/content/c919edd131144f529f3396fb089b091d?v=23d30870",
    descripcionCorta: "Aplicación precisa y eficiente con excelente estabilidad de botalón.",
    descripcionLarga: "El Patriot 250 Extreme se destaca por su excelente distribución de peso, ofreciendo una menor compactación del suelo. Su sistema de pulverización de alta precisión asegura que cada gota llegue al objetivo, optimizando el uso de agroquímicos.",
    especificaciones: {
      "Capacidad del Tanque": "2.500 Litros",
      "Ancho de labor": "27 metros",
      "Motor": "165 CV",
      "Transmisión": "Hidrostática 4x4"
    }
  },
  {
    id: 5,
    nombre: "Tractor John Deere 6J",
    categoria: "Tractores",
    marca: "John Deere",
    estado: "Nuevo",
    imagen: "https://www.deere.com.ar/assets/images/region-3/products/tractors/mid/6j-series/6115j/trator_6115j_campo_plantadeira_large_464239a53c1bef87af7b588dd43573de619ac4e3.jpg",
    descripcionCorta: "Versatilidad y durabilidad comprobada para tareas agrícolas y ganaderas.",
    descripcionLarga: "La Serie 6J representa la unión de la tecnología con la confiabilidad. Cuenta con un sistema hidráulico eficiente y transmisión versátil que lo hace perfecto para labores que requieren agilidad y robustez en el día a día del campo.",
    especificaciones: {
      "Potencia": "110 - 200 CV",
      "Transmisión": "PowrQuad o SyncroPlus",
      "Bomba Hidráulica": "110 o 155 L/min",
      "Cabina": "Climatizada con visión 360"
    }
  },
  {
    id: 6,
    nombre: "Cosechadora John Deere 1175",
    categoria: "Cosechadoras",
    marca: "John Deere",
    estado: "Usado",
    imagen: "images/WhatsApp Image 2026-05-08 at 20.36.45.jpeg",
    imagenes: [
      "images/WhatsApp Image 2026-05-08 at 20.36.45.jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.45 (1).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.45 (2).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.54 (1).jpeg"
    ],
    descripcionCorta: "Cosechadora John Deere 1175 ideal para pequeños y medianos productores.",
    descripcionLarga: "Esta cosechadora John Deere se encuentra en excelentes condiciones operativas, lista para salir al campo. Equipada con motor John Deere potente y sistema de trilla de alta eficiencia que minimiza las pérdidas. Mantenimiento al día con repuestos originales.",
    especificaciones: {
      "Motor": "John Deere 6 cilindros turbo",
      "Potencia": "170 CV",
      "Plataforma": "19 pies",
      "Transmisión": "Mecánica"
    }
  },
  {
    id: 7,
    nombre: "Niveladora de Arrastre Grosspal",
    categoria: "Herramientas",
    marca: "Grosspal",
    estado: "Usado",
    imagen: "images/WhatsApp Image 2026-05-08 at 20.36.53 (1).jpeg",
    imagenes: [
      "images/WhatsApp Image 2026-05-08 at 20.36.53 (1).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.53 (2).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.53 (3).jpeg"
    ],
    descripcionCorta: "Niveladora de arrastre Grosspal, robusta y eficiente para nivelación de suelos.",
    descripcionLarga: "Niveladora de arrastre Grosspal en óptimo estado de conservación y funcionamiento. Chasis ultra resistente diseñado para soportar las tareas de emparejamiento más exigentes. Sistema hidráulico completo funcionando sin pérdidas.",
    especificaciones: {
      "Marca": "Grosspal",
      "Modelo": "N-3",
      "Ancho de hoja": "3.6 metros",
      "Accionamiento": "Hidráulico completo"
    }
  },
  {
    id: 8,
    nombre: "Mixer TAURUS 250",
    categoria: "Herramientas",
    marca: "Taurus",
    estado: "Usado",
    imagen: "images/WhatsApp Image 2026-05-08 at 20.36.47.jpeg",
    imagenes: [
      "images/WhatsApp Image 2026-05-08 at 20.36.47.jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.47 (1).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.47 (2).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.47 (3).jpeg"
    ],
    descripcionCorta: "Mixer distribuidor de forraje Taurus, ideal para alimentación de ganado.",
    descripcionLarga: "Mixer Taurus diseñado para un mezclado uniforme y descarga rápida. Chasis reforzado y tolva con recubrimiento especial contra la corrosión. Sistema de sinfines de alta resistencia para un picado preciso y eficiente.",
    especificaciones: {
      "Capacidad": "10 m³",
      "Sistema de mezcla": "Sinfines horizontales",
      "Descarga": "Cinta transportadora lateral",
      "Rodado": "Para neumáticos rodado 16.5"
    }
  },
  {
    id: 9,
    nombre: "Acoplado Volcador Verde Agroguardati",
    categoria: "Acoplados",
    marca: "Agroguardati",
    estado: "Nuevo",
    imagen: "images/WhatsApp Image 2026-05-08 at 20.36.19.jpeg",
    imagenes: [
      "images/WhatsApp Image 2026-05-08 at 20.36.19.jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.19 (1).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.18 (2).jpeg"
    ],
    descripcionCorta: "Acoplado volcador bi-vuelco de gran resistencia para múltiples cargas.",
    descripcionLarga: "Acoplado volcador nuevo fabricado con materiales de alta calidad. Capacidad de carga ideal para transporte de granos, tierra, herramientas y materiales diversos. Sistema de vuelco ágil y seguro.",
    especificaciones: {
      "Capacidad de Carga": "4.000 kg",
      "Tipo": "Bi-vuelco lateral",
      "Rodado": "Dual de 16 pulgadas",
      "Chasis": "Acero reforzado"
    }
  },
  {
    id: 10,
    nombre: "Sembradora Gherardi G-230",
    categoria: "Sembradoras",
    marca: "Gherardi",
    estado: "Usado",
    imagen: "images/WhatsApp Image 2026-05-08 at 20.36.57 (2).jpeg",
    imagenes: [
      "images/WhatsApp Image 2026-05-08 at 20.36.57 (2).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.57 (3).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.57 (4).jpeg"
    ],
    descripcionCorta: "Sembradora de granos finos y gruesos Gherardi en perfecto estado operativo.",
    descripcionLarga: "Sembradora de precisión Gherardi G-230. Ofrece una distribución de semilla uniforme con dosificadores regulables y tolvas de gran autonomía. Ideal para siembra directa con óptimo comportamiento en rastrojos pesados.",
    especificaciones: {
      "Líneas": "18 líneas a 52 cm",
      "Dosificación": "Placas mecánicas y neumáticas",
      "Tolvas": "Granos y fertilizante en línea"
    }
  },
  {
    id: 11,
    nombre: "Tractor Massey Ferguson 290",
    categoria: "Tractores",
    marca: "Massey Ferguson",
    estado: "Usado",
    imagen: "images/WhatsApp Image 2026-05-08 at 20.36.55 (2).jpeg",
    imagenes: [
      "images/WhatsApp Image 2026-05-08 at 20.36.55 (2).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.55 (3).jpeg",
      "images/WhatsApp Image 2026-05-08 at 20.36.17.jpeg"
    ],
    descripcionCorta: "Tractor Massey Ferguson 290 clásico, robustez y economía de mantenimiento.",
    descripcionLarga: "Tractor Massey Ferguson 290 usado, ideal para labores secundarias del campo, ganadería o mantenimiento general. Mecánica simple y confiable con repuestos económicos y de fácil acceso.",
    especificaciones: {
      "Motor": "Perkins 4 cilindros",
      "Potencia": "85 CV",
      "Transmisión": "8 de avance + 2 de retroceso",
      "Tracción": "4x2"
    }
  },
  {
    id: 12,
    nombre: "Mini Tractor Corta Césped",
    categoria: "Tractores",
    marca: "Agroguardati",
    estado: "Usado",
    imagen: "images/Mini tractores corta césped/WhatsApp Image 2026-08-06 at 08.37.57.jpeg",
    imagenes: [
      "images/Mini tractores corta césped/WhatsApp Image 2026-08-06 at 08.37.57.jpeg",
      "images/Mini tractores corta césped/WhatsApp Image 2026-08-06 at 08.37.58.jpeg",
      "images/Mini tractores corta césped/WhatsApp Image 2026-08-06 at 08.38.01.jpeg",
      "images/Mini tractores corta césped/asdadfgfa.jpeg"
    ],
    descripcionCorta: "Mini tractor corta césped ideal para el mantenimiento de parques, jardines y grandes superficies.",
    descripcionLarga: "Mini tractor corta césped diseñado para brindar máxima comodidad y rendimiento en el mantenimiento de parques, áreas verdes y parquizados. Excelente maniobrabilidad, corte uniforme y motor confiable.",
    especificaciones: {
      "Tipo": "Mini tractor corta césped",
      "Uso": "Mantenimiento de parques y jardines",
      "Sistema de corte": "Plataforma de alta eficiencia",
      "Estado": "Excelente estado de conservación"
    }
  },
  {
    id: 13,
    nombre: "Tractor Case IH 205 HP con Piloto (8.000 hs)",
    categoria: "Tractores",
    marca: "Case IH",
    estado: "Usado",
    imagen: "images/Tractor CASE 205 HP CON PILOTO 8000 hs/WhatsApp Image 2026-08-06 at 08.28.31 (1).jpeg",
    imagenes: [
      "images/Tractor CASE 205 HP CON PILOTO 8000 hs/WhatsApp Image 2026-08-06 at 08.28.31 (1).jpeg",
      "images/Tractor CASE 205 HP CON PILOTO 8000 hs/WhatsApp Image 2026-08-06 at 08.28.31.jpeg",
      "images/Tractor CASE 205 HP CON PILOTO 8000 hs/WhatsApp Image 2026-08-06 at 08.28.32 (1).jpeg",
      "images/Tractor CASE 205 HP CON PILOTO 8000 hs/WhatsApp Image 2026-08-06 at 08.28.32 (2).jpeg",
      "images/Tractor CASE 205 HP CON PILOTO 8000 hs/WhatsApp Image 2026-08-06 at 08.28.32.jpeg"
    ],
    descripcionCorta: "Tractor Case IH de 205 HP equipado con piloto automático y 8.000 hs de trabajo.",
    descripcionLarga: "Tractor Case IH de 205 HP en excelente estado general. Cuenta con sistema de piloto automático incorporado para una agricultura de precisión óptima y 8.000 horas de uso comprobadas. Mantenimiento y servicios al día.",
    especificaciones: {
      "Potencia": "205 HP",
      "Marca": "Case IH",
      "Equipamiento": "Piloto Automático",
      "Horas de Uso": "8.000 hs",
      "Estado": "Usado en muy buen estado"
    }
  },
  {
    id: 14,
    nombre: "Tractor John Deere 3550 Doble Tracción",
    categoria: "Tractores",
    marca: "John Deere",
    estado: "Usado",
    imagen: "images/Tractor JD 3550 doble tracción doble embrague en excelente estado de conservación/WhatsApp Image 2026-08-06 at 08.29.18 (1).jpeg",
    imagenes: [
      "images/Tractor JD 3550 doble tracción doble embrague en excelente estado de conservación/WhatsApp Image 2026-08-06 at 08.29.18 (1).jpeg",
      "images/Tractor JD 3550 doble tracción doble embrague en excelente estado de conservación/WhatsApp Image 2026-08-06 at 08.29.18 (2).jpeg",
      "images/Tractor JD 3550 doble tracción doble embrague en excelente estado de conservación/WhatsApp Image 2026-08-06 at 08.29.18.jpeg"
    ],
    descripcionCorta: "Tractor John Deere 3550 con doble tracción y doble embrague en impecable estado.",
    descripcionLarga: "Tractor John Deere 3550 equipado con doble tracción (4x4) y sistema de doble embrague. Reconocido por su alta resistencia, fuerza de tiro y confiabilidad en las labores del campo. Se encuentra en excelente estado de conservación operativo.",
    especificaciones: {
      "Modelo": "John Deere 3550",
      "Tracción": "Doble Tracción (4x4)",
      "Embrague": "Doble embrague",
      "Marca": "John Deere",
      "Estado": "Excelente estado de conservación"
    }
  }
,
  {
    id: 15,
    nombre: "Tractor Zanello 230c Motor Cummins",
    categoria: "Tractores",
    marca: "Zanello",
    estado: "Usado",
    imagen: "images/Tractor Zanello 230c/img_1.jpg",
    imagenes: [
      "images/Tractor Zanello 230c/img_1.jpg",
      "images/Tractor Zanello 230c/img_2.jpg",
      "images/Tractor Zanello 230c/img_3.jpg",
      "images/Tractor Zanello 230c/img_4.jpg",
      "images/Tractor Zanello 230c/img_5.jpg",
      "images/Tractor Zanello 230c/img_6.jpg",
      "images/Tractor Zanello 230c/img_7.jpg",
      "images/Tractor Zanello 230c/img_8.jpg",
      "images/Tractor Zanello 230c/img_9.jpg",
      "images/Tractor Zanello 230c/img_10.jpg",
      "images/Tractor Zanello 230c/img_11.jpg",
      "images/Tractor Zanello 230c/img_12.jpg",
      "images/Tractor Zanello 230c/img_13.jpg"
    ],
    descripcionCorta: "Tractor Zanello 230c con motor Cummins, año 1999. Muy buen estado, listo para trabajar.",
    descripcionLarga: "Tractor Zanello 230c equipado con motor Cummins de 130 HP. Cuenta con 9.000 horas de trabajo comprobadas. Unidad en muy buen estado de conservación y lista para incorporarse a las tareas del campo.",
    especificaciones: {
      "Motor": "Cummins 130 HP",
      "Año": "1999",
      "Horas de Trabajo": "9.000 hs",
      "Estado": "Usado en muy buen estado"
    }
  },
  {
    id: 16,
    nombre: "Desmalezadora Bernardin 3 M de Corte Nueva",
    categoria: "Herramientas",
    marca: "Bernardin",
    estado: "Nuevo",
    imagen: "images/Desmalezadora Bernardin 3M/img_1.jpg",
    imagenes: [
      "images/Desmalezadora Bernardin 3M/img_1.jpg",
      "images/Desmalezadora Bernardin 3M/img_2.jpg",
      "images/Desmalezadora Bernardin 3M/img_3.jpg",
      "images/Desmalezadora Bernardin 3M/img_4.jpg",
      "images/Desmalezadora Bernardin 3M/img_5.jpg",
      "images/Desmalezadora Bernardin 3M/img_6.jpg",
      "images/Desmalezadora Bernardin 3M/img_7.jpg",
      "images/Desmalezadora Bernardin 3M/img_8.jpg",
      "images/Desmalezadora Bernardin 3M/img_9.jpg",
      "images/Desmalezadora Bernardin 3M/img_10.jpg",
      "images/Desmalezadora Bernardin 3M/img_11.jpg",
      "images/Desmalezadora Bernardin 3M/img_12.jpg",
      "images/Desmalezadora Bernardin 3M/img_13.jpg",
      "images/Desmalezadora Bernardin 3M/img_14.jpg",
      "images/Desmalezadora Bernardin 3M/img_15.jpg",
      "images/Desmalezadora Bernardin 3M/img_16.jpg",
      "images/Desmalezadora Bernardin 3M/img_17.jpg"
    ],
    descripcionCorta: "Desmalezadora Bernardin con 3 metros de ancho de corte, año 2026. Unidad totalmente nueva.",
    descripcionLarga: "Desmalezadora Bernardin 0km con ancho de trabajo de 3 metros. Robusta estructura diseñada para desmalezado de alta exigencia, chasis reforzado y caja multiplicadora de alta durabilidad.",
    especificaciones: {
      "Marca": "Bernardin",
      "Ancho de corte": "3.00 metros",
      "Año": "2026",
      "Estado": "Nuevo (0 km)"
    }
  },
  {
    id: 17,
    nombre: "Tolva Cerealera Sola y Brusa (8 tn)",
    categoria: "Acoplados",
    marca: "Sola y Brusa",
    estado: "Usado",
    imagen: "images/Tolva Sola y Brusa/img_1.jpg",
    imagenes: [
      "images/Tolva Sola y Brusa/img_1.jpg",
      "images/Tolva Sola y Brusa/img_2.jpg",
      "images/Tolva Sola y Brusa/img_3.jpg",
      "images/Tolva Sola y Brusa/img_4.jpg",
      "images/Tolva Sola y Brusa/img_5.jpg",
      "images/Tolva Sola y Brusa/img_6.jpg",
      "images/Tolva Sola y Brusa/img_7.jpg",
      "images/Tolva Sola y Brusa/img_8.jpg",
      "images/Tolva Sola y Brusa/img_9.jpg",
      "images/Tolva Sola y Brusa/img_10.jpg",
      "images/Tolva Sola y Brusa/img_11.jpg",
      "images/Tolva Sola y Brusa/img_12.jpg",
      "images/Tolva Sola y Brusa/img_13.jpg"
    ],
    descripcionCorta: "Tolva cerealera Sola y Brusa de 8 toneladas de capacidad, año 1996. Excelente oportunidad.",
    descripcionLarga: "Tolva cerealera Sola y Brusa con capacidad para 8 toneladas. Chasis en muy buen estado, sin picaduras, tubo de descarga y balanza opcional. Ideal para cosecha y transporte de granos.",
    especificaciones: {
      "Marca": "Sola y Brusa",
      "Capacidad": "8 toneladas",
      "Año": "1996",
      "Estado": "Usado"
    }
  },
  {
    id: 18,
    nombre: "Acoplado Tanque Combinado 3000 Lts San Juan",
    categoria: "Acoplados",
    marca: "San Juan",
    estado: "Nuevo",
    imagen: "images/Acoplado Tanque San Juan/img_1.jpg",
    imagenes: [
      "images/Acoplado Tanque San Juan/img_1.jpg",
      "images/Acoplado Tanque San Juan/img_2.jpg",
      "images/Acoplado Tanque San Juan/img_3.jpg",
      "images/Acoplado Tanque San Juan/img_4.jpg",
      "images/Acoplado Tanque San Juan/img_5.jpg",
      "images/Acoplado Tanque San Juan/img_6.jpg",
      "images/Acoplado Tanque San Juan/img_7.jpg",
      "images/Acoplado Tanque San Juan/img_8.jpg",
      "images/Acoplado Tanque San Juan/img_9.jpg",
      "images/Acoplado Tanque San Juan/img_10.jpg",
      "images/Acoplado Tanque San Juan/img_11.jpg",
      "images/Acoplado Tanque San Juan/img_12.jpg",
      "images/Acoplado Tanque San Juan/img_13.jpg"
    ],
    descripcionCorta: "Acoplado tanque combinado de 3.000 Lts para combustible y 750 Lts para agua con bauleras. Nuevo 2026.",
    descripcionLarga: "Acoplado tanque combinado fabricado por Plegados San Juan. Capacidad de 3.000 litros para combustible y tanque auxiliar de 750 litros para agua. Incluye dos bauleras laterales reforzadas. Unidad totalmente nueva.",
    especificaciones: {
      "Capacidad Combustible": "3.000 Litros",
      "Capacidad Agua": "750 Litros",
      "Equipamiento": "2 bauleras laterales",
      "Año": "2026",
      "Estado": "Nuevo (0 km)"
    }
  },
  {
    id: 19,
    nombre: "Niveladora TBEH N6 2R",
    categoria: "Herramientas",
    marca: "TBEH",
    estado: "Usado",
    imagen: "images/Niveladora TBEH N6/img_1.jpg",
    imagenes: [
      "images/Niveladora TBEH N6/img_1.jpg",
      "images/Niveladora TBEH N6/img_2.jpg",
      "images/Niveladora TBEH N6/img_3.jpg",
      "images/Niveladora TBEH N6/img_4.jpg",
      "images/Niveladora TBEH N6/img_5.jpg",
      "images/Niveladora TBEH N6/img_6.jpg",
      "images/Niveladora TBEH N6/img_7.jpg",
      "images/Niveladora TBEH N6/img_8.jpg",
      "images/Niveladora TBEH N6/img_9.jpg",
      "images/Niveladora TBEH N6/img_10.jpg",
      "images/Niveladora TBEH N6/img_11.jpg",
      "images/Niveladora TBEH N6/img_12.jpg",
      "images/Niveladora TBEH N6/img_13.jpg"
    ],
    descripcionCorta: "Niveladora TBEH N6 2R año 2020. Muy poco uso y en impecable estado general.",
    descripcionLarga: "Niveladora de arrastre TBEH modelo N6 2R. Año 2020 con muy poco uso. Chasis reforzado de alta estabilidad, rodado doble y accionamiento hidráulico completo. Impecable estado operativo.",
    especificaciones: {
      "Marca": "TBEH",
      "Modelo": "N6 2R",
      "Año": "2020",
      "Estado": "Usado en muy buen estado"
    }
  },
  {
    id: 20,
    nombre: "Lancha Guadalupe 470 Inscripta con Tráiler",
    categoria: "Embarcaciones",
    marca: "Guadalupe",
    estado: "Usado",
    imagen: "images/Guadalupe 470/img_1.jpg",
    imagenes: [
      "images/Guadalupe 470/img_1.jpg",
      "images/Guadalupe 470/img_2.jpg",
      "images/Guadalupe 470/img_3.jpg",
      "images/Guadalupe 470/img_4.jpg",
      "images/Guadalupe 470/img_5.jpg",
      "images/Guadalupe 470/img_6.jpg",
      "images/Guadalupe 470/img_7.jpg",
      "images/Guadalupe 470/img_8.jpg"
    ],
    descripcionCorta: "Tracker Guadalupe 470 Full año 2023 con tráiler completo, luces y posa cañas. Súper liviano y resistente.",
    descripcionLarga: "Tracker Guadalupe 470 Full en Honeycomb color rojo y blanco. Equipada con 6 posa cañas, bolsillos laterales, tráiler completo con paragolpes y luces. Embarcación super liviana, resistente e inscripta.",
    especificaciones: {
      "Modelo": "Guadalupe 470 Full",
      "Material": "Honeycomb",
      "Año": "2023",
      "Equipamiento": "6 posa cañas, tráiler con luces",
      "Estado": "Usado impecable"
    }
  },
  {
    id: 21,
    nombre: "Inoculador Mezclador Micelli",
    categoria: "Herramientas",
    marca: "Micelli",
    estado: "Usado",
    imagen: "images/Inoculador Micelli/img_1.jpg",
    imagenes: [
      "images/Inoculador Micelli/img_1.jpg",
      "images/Inoculador Micelli/img_2.jpg",
      "images/Inoculador Micelli/img_3.jpg",
      "images/Inoculador Micelli/img_4.jpg",
      "images/Inoculador Micelli/img_5.jpg",
      "images/Inoculador Micelli/img_6.jpg",
      "images/Inoculador Micelli/img_7.jpg",
      "images/Inoculador Micelli/img_8.jpg",
      "images/Inoculador Micelli/img_9.jpg",
      "images/Inoculador Micelli/img_10.jpg",
      "images/Inoculador Micelli/img_11.jpg",
      "images/Inoculador Micelli/img_12.jpg"
    ],
    descripcionCorta: "Inoculador mezclador Micelli año 2019 en muy buen estado general.",
    descripcionLarga: "Inoculador mezclador de semillas Micelli año 2019. Equipo diseñado para un tratamiento rápido y uniforme de semillas previo a la siembra. Excelente estado de conservación y listo para usar.",
    especificaciones: {
      "Marca": "Micelli",
      "Tipo": "Inoculador Mezclador de Semillas",
      "Año": "2019",
      "Estado": "Usado en muy buen estado"
    }
  }
,
  {
    id: 15,
    nombre: "Tractor Zanello 230c Motor Cummins",
    categoria: "Tractores",
    marca: "Zanello",
    estado: "Usado",
    imagen: "images/Tractor Zanello 230c/img_1.jpg",
    imagenes: [
      "images/Tractor Zanello 230c/img_1.jpg",
      "images/Tractor Zanello 230c/img_2.jpg",
      "images/Tractor Zanello 230c/img_3.jpg",
      "images/Tractor Zanello 230c/img_4.jpg",
      "images/Tractor Zanello 230c/img_5.jpg",
      "images/Tractor Zanello 230c/img_6.jpg",
      "images/Tractor Zanello 230c/img_7.jpg",
      "images/Tractor Zanello 230c/img_8.jpg",
      "images/Tractor Zanello 230c/img_9.jpg",
      "images/Tractor Zanello 230c/img_10.jpg",
      "images/Tractor Zanello 230c/img_11.jpg",
      "images/Tractor Zanello 230c/img_12.jpg",
      "images/Tractor Zanello 230c/img_13.jpg"
    ],
    descripcionCorta: "Tractor Zanello 230c con motor Cummins, año 1999. Muy buen estado, listo para trabajar.",
    descripcionLarga: "Tractor Zanello 230c equipado con motor Cummins de 130 HP. Cuenta con 9.000 horas de trabajo comprobadas. Unidad en muy buen estado de conservación y lista para incorporarse a las tareas del campo.",
    especificaciones: {
      "Motor": "Cummins 130 HP",
      "Año": "1999",
      "Horas de Trabajo": "9.000 hs",
      "Estado": "Usado en muy buen estado"
    }
  },
  {
    id: 16,
    nombre: "Desmalezadora Bernardin 3 M de Corte Nueva",
    categoria: "Herramientas",
    marca: "Bernardin",
    estado: "Nuevo",
    imagen: "images/Desmalezadora Bernardin 3M/img_1.jpg",
    imagenes: [
      "images/Desmalezadora Bernardin 3M/img_1.jpg",
      "images/Desmalezadora Bernardin 3M/img_2.jpg",
      "images/Desmalezadora Bernardin 3M/img_3.jpg",
      "images/Desmalezadora Bernardin 3M/img_4.jpg",
      "images/Desmalezadora Bernardin 3M/img_5.jpg",
      "images/Desmalezadora Bernardin 3M/img_6.jpg",
      "images/Desmalezadora Bernardin 3M/img_7.jpg",
      "images/Desmalezadora Bernardin 3M/img_8.jpg",
      "images/Desmalezadora Bernardin 3M/img_9.jpg",
      "images/Desmalezadora Bernardin 3M/img_10.jpg",
      "images/Desmalezadora Bernardin 3M/img_11.jpg",
      "images/Desmalezadora Bernardin 3M/img_12.jpg",
      "images/Desmalezadora Bernardin 3M/img_13.jpg",
      "images/Desmalezadora Bernardin 3M/img_14.jpg",
      "images/Desmalezadora Bernardin 3M/img_15.jpg",
      "images/Desmalezadora Bernardin 3M/img_16.jpg",
      "images/Desmalezadora Bernardin 3M/img_17.jpg"
    ],
    descripcionCorta: "Desmalezadora Bernardin con 3 metros de ancho de corte, año 2026. Unidad totalmente nueva.",
    descripcionLarga: "Desmalezadora Bernardin 0km con ancho de trabajo de 3 metros. Robusta estructura diseñada para desmalezado de alta exigencia, chasis reforzado y caja multiplicadora de alta durabilidad.",
    especificaciones: {
      "Marca": "Bernardin",
      "Ancho de corte": "3.00 metros",
      "Año": "2026",
      "Estado": "Nuevo (0 km)"
    }
  },
  {
    id: 17,
    nombre: "Tolva Cerealera Sola y Brusa (8 tn)",
    categoria: "Acoplados",
    marca: "Sola y Brusa",
    estado: "Usado",
    imagen: "images/Tolva Sola y Brusa/img_1.jpg",
    imagenes: [
      "images/Tolva Sola y Brusa/img_1.jpg",
      "images/Tolva Sola y Brusa/img_2.jpg",
      "images/Tolva Sola y Brusa/img_3.jpg",
      "images/Tolva Sola y Brusa/img_4.jpg",
      "images/Tolva Sola y Brusa/img_5.jpg",
      "images/Tolva Sola y Brusa/img_6.jpg",
      "images/Tolva Sola y Brusa/img_7.jpg",
      "images/Tolva Sola y Brusa/img_8.jpg",
      "images/Tolva Sola y Brusa/img_9.jpg",
      "images/Tolva Sola y Brusa/img_10.jpg",
      "images/Tolva Sola y Brusa/img_11.jpg",
      "images/Tolva Sola y Brusa/img_12.jpg",
      "images/Tolva Sola y Brusa/img_13.jpg"
    ],
    descripcionCorta: "Tolva cerealera Sola y Brusa de 8 toneladas de capacidad, año 1996. Excelente oportunidad.",
    descripcionLarga: "Tolva cerealera Sola y Brusa con capacidad para 8 toneladas. Chasis en muy buen estado, sin picaduras, tubo de descarga y balanza opcional. Ideal para cosecha y transporte de granos.",
    especificaciones: {
      "Marca": "Sola y Brusa",
      "Capacidad": "8 toneladas",
      "Año": "1996",
      "Estado": "Usado"
    }
  },
  {
    id: 18,
    nombre: "Acoplado Tanque Combinado 3000 Lts San Juan",
    categoria: "Acoplados",
    marca: "San Juan",
    estado: "Nuevo",
    imagen: "images/Acoplado Tanque San Juan/img_1.jpg",
    imagenes: [
      "images/Acoplado Tanque San Juan/img_1.jpg",
      "images/Acoplado Tanque San Juan/img_2.jpg",
      "images/Acoplado Tanque San Juan/img_3.jpg",
      "images/Acoplado Tanque San Juan/img_4.jpg",
      "images/Acoplado Tanque San Juan/img_5.jpg",
      "images/Acoplado Tanque San Juan/img_6.jpg",
      "images/Acoplado Tanque San Juan/img_7.jpg",
      "images/Acoplado Tanque San Juan/img_8.jpg",
      "images/Acoplado Tanque San Juan/img_9.jpg",
      "images/Acoplado Tanque San Juan/img_10.jpg",
      "images/Acoplado Tanque San Juan/img_11.jpg",
      "images/Acoplado Tanque San Juan/img_12.jpg",
      "images/Acoplado Tanque San Juan/img_13.jpg"
    ],
    descripcionCorta: "Acoplado tanque combinado de 3.000 Lts para combustible y 750 Lts para agua con bauleras. Nuevo 2026.",
    descripcionLarga: "Acoplado tanque combinado fabricado por Plegados San Juan. Capacidad de 3.000 litros para combustible y tanque auxiliar de 750 litros para agua. Incluye dos bauleras laterales reforzadas. Unidad totalmente nueva.",
    especificaciones: {
      "Capacidad Combustible": "3.000 Litros",
      "Capacidad Agua": "750 Litros",
      "Equipamiento": "2 bauleras laterales",
      "Año": "2026",
      "Estado": "Nuevo (0 km)"
    }
  },
  {
    id: 19,
    nombre: "Niveladora TBEH N6 2R",
    categoria: "Herramientas",
    marca: "TBEH",
    estado: "Usado",
    imagen: "images/Niveladora TBEH N6/img_1.jpg",
    imagenes: [
      "images/Niveladora TBEH N6/img_1.jpg",
      "images/Niveladora TBEH N6/img_2.jpg",
      "images/Niveladora TBEH N6/img_3.jpg",
      "images/Niveladora TBEH N6/img_4.jpg",
      "images/Niveladora TBEH N6/img_5.jpg",
      "images/Niveladora TBEH N6/img_6.jpg",
      "images/Niveladora TBEH N6/img_7.jpg",
      "images/Niveladora TBEH N6/img_8.jpg",
      "images/Niveladora TBEH N6/img_9.jpg",
      "images/Niveladora TBEH N6/img_10.jpg",
      "images/Niveladora TBEH N6/img_11.jpg",
      "images/Niveladora TBEH N6/img_12.jpg",
      "images/Niveladora TBEH N6/img_13.jpg"
    ],
    descripcionCorta: "Niveladora TBEH N6 2R año 2020. Muy poco uso y en impecable estado general.",
    descripcionLarga: "Niveladora de arrastre TBEH modelo N6 2R. Año 2020 con muy poco uso. Chasis reforzado de alta estabilidad, rodado doble y accionamiento hidráulico completo. Impecable estado operativo.",
    especificaciones: {
      "Marca": "TBEH",
      "Modelo": "N6 2R",
      "Año": "2020",
      "Estado": "Usado en muy buen estado"
    }
  },
  {
    id: 20,
    nombre: "Lancha Guadalupe 470 Inscripta con Tráiler",
    categoria: "Embarcaciones",
    marca: "Guadalupe",
    estado: "Usado",
    imagen: "images/Guadalupe 470/img_1.jpg",
    imagenes: [
      "images/Guadalupe 470/img_1.jpg",
      "images/Guadalupe 470/img_2.jpg",
      "images/Guadalupe 470/img_3.jpg",
      "images/Guadalupe 470/img_4.jpg",
      "images/Guadalupe 470/img_5.jpg",
      "images/Guadalupe 470/img_6.jpg",
      "images/Guadalupe 470/img_7.jpg",
      "images/Guadalupe 470/img_8.jpg"
    ],
    descripcionCorta: "Tracker Guadalupe 470 Full año 2023 con tráiler completo, luces y posa cañas. Súper liviano y resistente.",
    descripcionLarga: "Tracker Guadalupe 470 Full en Honeycomb color rojo y blanco. Equipada con 6 posa cañas, bolsillos laterales, tráiler completo con paragolpes y luces. Embarcación super liviana, resistente e inscripta.",
    especificaciones: {
      "Modelo": "Guadalupe 470 Full",
      "Material": "Honeycomb",
      "Año": "2023",
      "Equipamiento": "6 posa cañas, tráiler con luces",
      "Estado": "Usado impecable"
    }
  },
  {
    id: 21,
    nombre: "Inoculador Mezclador Micelli",
    categoria: "Herramientas",
    marca: "Micelli",
    estado: "Usado",
    imagen: "images/Inoculador Micelli/img_1.jpg",
    imagenes: [
      "images/Inoculador Micelli/img_1.jpg",
      "images/Inoculador Micelli/img_2.jpg",
      "images/Inoculador Micelli/img_3.jpg",
      "images/Inoculador Micelli/img_4.jpg",
      "images/Inoculador Micelli/img_5.jpg",
      "images/Inoculador Micelli/img_6.jpg",
      "images/Inoculador Micelli/img_7.jpg",
      "images/Inoculador Micelli/img_8.jpg",
      "images/Inoculador Micelli/img_9.jpg",
      "images/Inoculador Micelli/img_10.jpg",
      "images/Inoculador Micelli/img_11.jpg",
      "images/Inoculador Micelli/img_12.jpg"
    ],
    descripcionCorta: "Inoculador mezclador Micelli año 2019 en muy buen estado general.",
    descripcionLarga: "Inoculador mezclador de semillas Micelli año 2019. Equipo diseñado para un tratamiento rápido y uniforme de semillas previo a la siembra. Excelente estado de conservación y listo para usar.",
    especificaciones: {
      "Marca": "Micelli",
      "Tipo": "Inoculador Mezclador de Semillas",
      "Año": "2019",
      "Estado": "Usado en muy buen estado"
    }
  }
];
