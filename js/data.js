const catalogo = [
  {
    id: 5,
    nombre: "Tractor John Deere 6J",
    categoria: "Tractores",
    marca: "John Deere",
    estado: "Nuevo",
    modelo3d: "https://res.cloudinary.com/pfskomq5/raw/upload/v1787352709/odfk5npmskuhczywryzv.glb",
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402390/ppkewsxmkf0uwqi1tn7g.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402390/ppkewsxmkf0uwqi1tn7g.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402397/b8kssap68yfkjd1rk8fk.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402404/y3fxb8m99tqtpnw5vcer.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402408/av14dt0yih4iyt7daurs.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402419/x1wg1zq8imd7vfngga6h.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402419/x1wg1zq8imd7vfngga6h.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402424/k25oxx6foasoq5d1xgye.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402427/ejkahvzoqwlddskleka5.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402433/maa4bg467sfmlvf8b2sn.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402433/maa4bg467sfmlvf8b2sn.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402438/oodqg890vgwozmltfrbu.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402442/ojlbl2z485x8cs9guuv1.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402447/huruqftbpcdfxsov0ukf.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402470/mo2hvs0ddho0rrz9xnuk.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402470/mo2hvs0ddho0rrz9xnuk.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402482/nyt4veb3e0vhndlou7gj.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402488/yolik7givsohskvakgyb.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402510/s8ovl0zxp1dnn297vzcj.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402510/s8ovl0zxp1dnn297vzcj.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402518/f40hw7j145gg1bhtwedh.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402525/g8mpzkhof5g068zgic0m.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402541/dvio6rigjrsvutt3cqtd.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402541/dvio6rigjrsvutt3cqtd.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402550/i8dfhvdv0q1w4tljhxzk.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402555/qow7ylz3abvu39xx6sfr.jpg"
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
    modelo3d: "https://res.cloudinary.com/pfskomq5/raw/upload/v1787354980/jxjwld9mj6mh4rttvdh3.glb",
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786401866/qwfs3tmxa9azriapv6dc.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401866/qwfs3tmxa9azriapv6dc.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401876/fqcwnd5ufxxoszgwtjcd.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401881/mzl9mhww3xfbkswyn3hz.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401889/e2nv6vhncisb3ecuawol.jpg"
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
    modelo3d: "https://res.cloudinary.com/pfskomq5/raw/upload/v1787355000/uuh9w49gomfwasjrhbn8.glb",
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786401902/anvojddt5zt762sa9fyi.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401902/anvojddt5zt762sa9fyi.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401909/szzvrkvgcqp7dqxwnveo.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401913/stw6ps0dzxac5by8uj1v.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401918/d1x4diuspwofknxhvrbo.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401924/dj4c3uzviqax4mveeiwe.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786401935/cdaymn64u3yfhaqstlda.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401935/cdaymn64u3yfhaqstlda.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401937/rdvklqguombi82eyxxao.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401942/jd4ofd7lkvzlzfobivqb.jpg"
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
  },
  {
    id: 15,
    nombre: "Tractor Zanello 230c Motor Cummins",
    categoria: "Tractores",
    marca: "Zanello",
    estado: "Usado",
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786401954/l9hrobdgtkt4gnoczylt.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401954/l9hrobdgtkt4gnoczylt.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401961/lstc5jaftcqw5qehqig6.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401968/xgn5fx9azlkb26o3ylb3.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401975/tiv7mic7a9l0hxgysrgj.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786401989/uk5eac6bhkhczm7zfjud.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402000/qrq78wnlwkdmbqvllssw.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402000/qrq78wnlwkdmbqvllssw.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402011/uwsakomlbecdwxmdr4ap.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402019/xn1esjesai23a4lemnvn.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402027/kwtvsopnw0ti6espeeyn.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402037/u0cmhtdpptablia2exkq.jpg"
    ],
    descripcionCorta: "Desmalezadora Bernardin con 3 metros de ancho de corte, año 2026. Unidad totalmente nueva.",
    descripcionLarga: "Desmalezadora Bernardin 0km con ancho de trabajo de 3 metros. Robusta estructura diseñada para desmalezado de alta exigencia, chasis reinforced y caja multiplicadora de alta durabilidad.",
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402044/yiseqqqydf1vzw5m47a8.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402044/yiseqqqydf1vzw5m47a8.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402052/p8cmcvefhkd2zn1bel2f.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402067/xcehgq05pve45cleevkz.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402077/v4cqb8kn50hoovlvlsrf.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402083/iwxfp3gzs2h6zxomhqni.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402092/uy6ytsthzwfktmn76f6o.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402092/uy6ytsthzwfktmn76f6o.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402094/hxbsznu1byzbux1iexig.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402102/tndtngs1kywdfekqevpv.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402107/rvhwoavco70m3tgq6rvn.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402119/lhvuzzxsfnrrizgsbhhg.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402126/zyjjwszguqwlfy2fkufc.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402126/zyjjwszguqwlfy2fkufc.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402130/jjcxod1ad3clhbh0hlas.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402139/dp1wwck3qwuhc6fh8ss7.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402147/bsoawqf1zadcasbjjazd.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402156/w1pukghhwn05glj1dhyl.jpg"
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
    modelo3d: "https://res.cloudinary.com/pfskomq5/raw/upload/v1787353064/xpbgd1xkumzy43qnai9d.glb",
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402161/qnwi8kqll7iansypluys.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402161/qnwi8kqll7iansypluys.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402167/nftdq7qth1hstrug1f3k.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402179/q1flynusdiaa66jff5xn.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402182/ovb0e5rdddlv7r9kunbn.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402193/xvdm1dcuq9z23bl6yoib.jpg"
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
    imagen: "https://res.cloudinary.com/pfskomq5/image/upload/v1786402200/jx9xrcpojedvhe42lycf.jpg",
    imagenes: [
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402200/jx9xrcpojedvhe42lycf.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402209/xvbpyqlj8apkudq0zmcl.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402215/zo7jotmpanai2qwqdean.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402223/pl2xb79st3nqncdakegl.jpg",
      "https://res.cloudinary.com/pfskomq5/image/upload/v1786402226/yzsesdxwgzbidsxvdufw.jpg"
    ],
    descripcionCorta: "Inoculador mezclador Micelli año 2019 en muy buen estado general.",
    descripcionLarga: "Inoculador mezclador de semillas Micelli año 2019. Equipo diseñado para un tratamiento rápido y uniforme de semillas previo a la siembra. Excelente estado de conservación y listo para usar.",
    especificaciones: {
      "Marca": "Micelli",
      "Tipo": "Inoculador Mezclador de Semillas",
      "Año": "2019",
      "Estado": "Usado en muy buen estado"
    }
  },
  // --- PRODUCTOS NUEVOS DE MARCAS (100 MODELOS) ---
  {
      "id": 101,
      "nombre": "Elevador de Rollos Tango",
      "categoria": "Herramientas",
      "marca": "Industrias Tango",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819004/vrj13famu8ekp3ctvrvg.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819004/vrj13famu8ekp3ctvrvg.jpg"
      ],
      "descripcionCorta": "Elevador de rollos con chasis reforzado, lanza regulable y cilindro hidráulico de alta velocidad de carga.",
      "descripcionLarga": "Elevador de rollos con chasis reforzado, lanza regulable y cilindro hidráulico de alta velocidad de carga. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Chasis": "Tubular reforzado",
          "Accionamiento": "Cilindro hidráulico incorporado",
          "Capacidad": "1 Rollo grande",
          "Enganche": "Lanza regulable"
      }
  },
  {
      "id": 102,
      "nombre": "Desmalezadora de Arrastre Tango 2 Metros",
      "categoria": "Herramientas",
      "marca": "Industrias Tango",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819001/e4uerqe4tii5qk4lnmcj.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819001/e4uerqe4tii5qk4lnmcj.jpg"
      ],
      "descripcionCorta": "Desmalezadora de arrastre de 2.00 m de corte, caja de engranajes de alta resistencia en baño de aceite y zafe de seguridad.",
      "descripcionLarga": "Desmalezadora de arrastre de 2.00 m de corte, caja de engranajes de alta resistencia en baño de aceite y zafe de seguridad. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho de Corte": "2.00 metros",
          "Caja": "Engranajes cónicos en baño de aceite",
          "Transmisión": "Cardán con zafe",
          "Patines": "Regulables cambiables"
      }
  },
  {
      "id": 103,
      "nombre": "Chimangos y Sinfines de Carga Tango",
      "categoria": "Herramientas",
      "marca": "Industrias Tango",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818993/tgsp6sqcuzodmc3i3hux.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818993/tgsp6sqcuzodmc3i3hux.jpg"
      ],
      "descripcionCorta": "Sinfines elevadores de granos y fertilizantes con tubo de 160 y 200 mm, balanceo dinámico y levante por malacate.",
      "descripcionLarga": "Sinfines elevadores de granos y fertilizantes con tubo de 160 y 200 mm, balanceo dinámico y levante por malacate. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Diámetro Tubo": "160 / 200 mm",
          "Largo": "8 a 16 metros",
          "Mando": "Hidráulico / Explosión / Toma de fuerza",
          "Levante": "Malacate mecánico"
      }
  },
  {
      "id": 104,
      "nombre": "Desmalezadora Tango 3 Puntos 1.5 Metros",
      "categoria": "Herramientas",
      "marca": "Industrias Tango",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818995/prvleiywno9q1qukbct9.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818995/prvleiywno9q1qukbct9.jpg"
      ],
      "descripcionCorta": "Desmalezadora acople de 3 puntos categoría II de 1.50 m con rueda trasera de apoyo oscilante.",
      "descripcionLarga": "Desmalezadora acople de 3 puntos categoría II de 1.50 m con rueda trasera de apoyo oscilante. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho de Corte": "1.50 metros",
          "Enganche": "Tres puntos Cat. II",
          "Cuchillas": "Oscilantes de acero templado",
          "Rueda": "Trasera de apoyo y giro"
      }
  },
  {
      "id": 105,
      "nombre": "Desmalezadora de Arrastre Tango 1.5 Metros",
      "categoria": "Herramientas",
      "marca": "Industrias Tango",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818998/ctuglzxqy7qt4jszbhng.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818998/ctuglzxqy7qt4jszbhng.jpg"
      ],
      "descripcionCorta": "Desmalezadora de arrastre compacta para mantenimiento de lotes, callejones y áreas parquizadas.",
      "descripcionLarga": "Desmalezadora de arrastre compacta para mantenimiento de lotes, callejones y áreas parquizadas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho de Corte": "1.50 metros",
          "Chasis": "Monocasco de chapa reforzada",
          "Rodado": "Lateral con neumáticos",
          "Levante": "Manual / Hidráulico"
      }
  },
  {
      "id": 106,
      "nombre": "Grúa de Levante Tango 1, 2 y 3 Movimientos",
      "categoria": "Herramientas",
      "marca": "Industrias Tango",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819006/h1jk5jposgajwk9qbwet.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819006/h1jk5jposgajwk9qbwet.jpg"
      ],
      "descripcionCorta": "Grúa agrícola/vial para movimiento de bolsones big bag y motores, con pluma telescópica hidráulica.",
      "descripcionLarga": "Grúa agrícola/vial para movimiento de bolsones big bag y motores, con pluma telescópica hidráulica. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "Hasta 2.000 kg",
          "Movimientos": "1, 2 o 3 hidráulicos",
          "Pluma": "Extensible",
          "Enganche": "Tres puntos o arrastre"
      }
  },
  {
      "id": 107,
      "nombre": "Rolo Desterronador Transportable Hidráulico",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818974/n4b2qszd52nhb5jtoz8c.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818974/n4b2qszd52nhb5jtoz8c.jpg"
      ],
      "descripcionCorta": "Rolo desterronador y emparejador de suelo con cilindros hidráulicos para plegado rápido a transporte.",
      "descripcionLarga": "Rolo desterronador y emparejador de suelo con cilindros hidráulicos para plegado rápido a transporte. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Sistema": "Transportable hidráulico",
          "Chasis": "Tubo estructural",
          "Cuchillas": "Helicoidales / Rectas"
      }
  },
  {
      "id": 108,
      "nombre": "Rolo Desterronador con Peine y Rabasto",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818971/h0clwbzv3jyem9jss9i6.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818971/h0clwbzv3jyem9jss9i6.jpg"
      ],
      "descripcionCorta": "Equipo combinado de rolo con peine desmalezador y rabasto nivelador para acabado de cama de siembra.",
      "descripcionLarga": "Equipo combinado de rolo con peine desmalezador y rabasto nivelador para acabado de cama de siembra. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Equipamiento": "Rolo + Peine + Rabasto",
          "Regulación": "Presión y altura independiente",
          "Accionamiento": "Hidráulico"
      }
  },
  {
      "id": 109,
      "nombre": "Rastra Doble Acción Desencontrada JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818964/zjgkjbix7znufqawfmc0.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818964/zjgkjbix7znufqawfmc0.jpg"
      ],
      "descripcionCorta": "Rastra pesada desencontrada para roturación profunda de rastrojos voluminosos y apertura de suelos vírgenes.",
      "descripcionLarga": "Rastra pesada desencontrada para roturación profunda de rastrojos voluminosos y apertura de suelos vírgenes. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Discos": "24'' / 26''",
          "Ejes": "Acero tratado 4140",
          "Separación": "230 mm"
      }
  },
  {
      "id": 110,
      "nombre": "Rastra de Tiro Excéntrico Transportable Refinadora",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818970/hnud8wctld7rnjxpguuf.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818970/hnud8wctld7rnjxpguuf.jpg"
      ],
      "descripcionCorta": "Rastra excéntrica ágil para refinamiento y control mecánico de malezas con levante hidráulico central.",
      "descripcionLarga": "Rastra excéntrica ágil para refinamiento y control mecánico de malezas con levante hidráulico central. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Tipo": "Tiro excéntrico",
          "Transporte": "Rodado central hidráulico",
          "Bancadas": "Doble rodamiento blindado"
      }
  },
  {
      "id": 111,
      "nombre": "Descompactador de Suelo con Cuchillas y Rolos",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818948/rrngkt1sf7cho7xke1zg.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818948/rrngkt1sf7cho7xke1zg.jpg"
      ],
      "descripcionCorta": "Descompactador subsolador con cuchillas delanteras de corte y rolo trasero triturador de terrones.",
      "descripcionLarga": "Descompactador subsolador con cuchillas delanteras de corte y rolo trasero triturador de terrones. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Profundidad": "Hasta 50 cm",
          "Timones": "Curvos con punteras cambiables",
          "Rolo": "Desterronador posterior"
      }
  },
  {
      "id": 112,
      "nombre": "Cincel Chasis 100x100 JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818946/rc38j1tiwqfe9dv3vgw7.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818946/rc38j1tiwqfe9dv3vgw7.jpg"
      ],
      "descripcionCorta": "Arado de cinceles conservacionista con arcos de acero elástico y chasis reforzado de 100x100 mm.",
      "descripcionLarga": "Arado de cinceles conservacionista con arcos de acero elástico y chasis reforzado de 100x100 mm. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Chasis": "Estructural 100x100 mm",
          "Arcos": "Acero elástico forjado",
          "Filas": "3 Filas escalonadas"
      }
  },
  {
      "id": 113,
      "nombre": "Acoplado Trailer de 4 a 6 TT JyM Moro",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818937/cehf9eoisso8inuhun4s.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818937/cehf9eoisso8inuhun4s.jpg"
      ],
      "descripcionCorta": "Trailer balancín de transporte de cargas generales y herramientas con barandas rebatibles y piso reforzado.",
      "descripcionLarga": "Trailer balancín de transporte de cargas generales y herramientas con barandas rebatibles y piso reforzado. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4 a 6 Toneladas",
          "Suspensión": "Balancín tandem",
          "Piso": "Chapa rayada"
      }
  },
  {
      "id": 114,
      "nombre": "Trailer Basculante para Bobcat o Vehículos 4 TT",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818980/xbyoubujhkfa9altxqa3.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818980/xbyoubujhkfa9altxqa3.jpg"
      ],
      "descripcionCorta": "Trailer basculante de carga directa sin rampas para minicargadoras bobcat y maquinaria ligera.",
      "descripcionLarga": "Trailer basculante de carga directa sin rampas para minicargadoras bobcat y maquinaria ligera. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4 Toneladas",
          "Accionamiento": "Plataforma basculante",
          "Frenos": "Opcionales"
      }
  },
  {
      "id": 115,
      "nombre": "Trailer Basculante para Bobcat 4 a 6 TT Reforzado",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818982/lehi5thyplefsrus1uz3.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818982/lehi5thyplefsrus1uz3.jpg"
      ],
      "descripcionCorta": "Versión reforzada de trailer basculante de gran estabilidad para traslado seguro de miniexcavadoras.",
      "descripcionLarga": "Versión reforzada de trailer basculante de gran estabilidad para traslado seguro de miniexcavadoras. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4 a 6 TT",
          "Chasis": "Perfil UPN y viga doble",
          "Enganche": "Regulable en altura"
      }
  },
  {
      "id": 116,
      "nombre": "Trailer Camilla Basculante Homologado JyM Moro",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818986/o2vqnie8hmgmkidwfvqu.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818986/o2vqnie8hmgmkidwfvqu.jpg"
      ],
      "descripcionCorta": "Camilla de auxilio y transporte vehicular homologada con sistema de luces y enganche reglamentario.",
      "descripcionLarga": "Camilla de auxilio y transporte vehicular homologada con sistema de luces y enganche reglamentario. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Homologación": "Apto patentamiento / tránsito",
          "Piso": "Chapa estampada antideslizante",
          "Sistema": "Basculante"
      }
  },
  {
      "id": 117,
      "nombre": "Trailer Balancín con Elásticos Homologado",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818978/mdldzxngirsjrgktrt9p.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818978/mdldzxngirsjrgktrt9p.jpg"
      ],
      "descripcionCorta": "Trailer balancín con suspensión elástica progresiva y sistema de frenos para transporte interurbano.",
      "descripcionLarga": "Trailer balancín con suspensión elástica progresiva y sistema de frenos para transporte interurbano. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Suspensión": "Elásticos reforzados balancín",
          "Capacidad": "Hasta 5 Toneladas",
          "Homologado": "Sí"
      }
  },
  {
      "id": 118,
      "nombre": "Acoplado Rural JyM Moro 3, 4 y 5 Metros",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818930/wveks4gshv3m1r5ghf4h.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818930/wveks4gshv3m1r5ghf4h.jpg"
      ],
      "descripcionCorta": "Acoplado de cuatro ruedas con aro giratorio a bolillas para transporte agrícola general.",
      "descripcionLarga": "Acoplado de cuatro ruedas con aro giratorio a bolillas para transporte agrícola general. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Largo": "3, 4 y 5 metros",
          "Dirección": "Aro giratorio a bolillas",
          "Barandas": "Volcables desmontables"
      }
  },
  {
      "id": 119,
      "nombre": "Acoplado Volcador 4 a 6 TT JyM Moro",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818942/ko7kjxzp7csp8esz0ico.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818942/ko7kjxzp7csp8esz0ico.jpg"
      ],
      "descripcionCorta": "Acoplado con sistema hidráulico de descarga telescópico de gran ángulo para descarga rápida.",
      "descripcionLarga": "Acoplado con sistema hidráulico de descarga telescópico de gran ángulo para descarga rápida. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4 a 6 Toneladas",
          "Descarga": "Vuelco hidráulico trasero",
          "Compuerta": "Apertura pendular"
      }
  },
  {
      "id": 120,
      "nombre": "Tolva Transportadora de Granos y Fertilizantes 4 a 14 TT",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818976/ejuft2s0kyctg3npohdo.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818976/ejuft2s0kyctg3npohdo.jpg"
      ],
      "descripcionCorta": "Tolva autodescargable y de abastecimiento de sembradoras con tubo sinfín orientable.",
      "descripcionLarga": "Tolva autodescargable y de abastecimiento de sembradoras con tubo sinfín orientable. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4 a 14 Toneladas",
          "Tubo": "Sinfín hidráulico abatible",
          "División": "Doble compartimento"
      }
  },
  {
      "id": 121,
      "nombre": "Acoplado Tanque Combinado con Baulera JyM Moro",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818934/mxiqokt7r4jk7ktrt6ua.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818934/mxiqokt7r4jk7ktrt6ua.jpg"
      ],
      "descripcionCorta": "Tanque cisterna para gasoil y agua con baulera delantera porta herramientas y motobomba.",
      "descripcionLarga": "Tanque cisterna para gasoil y agua con baulera delantera porta herramientas y motobomba. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "2.000 a 4.000 Litros",
          "Baulera": "Delantera hermética con cerradura",
          "Rompeolas": "Interiores"
      }
  },
  {
      "id": 122,
      "nombre": "Acoplado Tanque para Combustible de Chapa",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818935/tnolrl3vkykiazniwxw5.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818935/tnolrl3vkykiazniwxw5.jpg"
      ],
      "descripcionCorta": "Cisterna de chapa de acero de gran durabilidad con soporte para surtidor y manguera.",
      "descripcionLarga": "Cisterna de chapa de acero de gran durabilidad con soporte para surtidor y manguera. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Material": "Chapa de acero SAE 1010",
          "Capacidad": "1.500 a 5.000 L",
          "Rodado": "Simple / Balancín"
      }
  },
  {
      "id": 123,
      "nombre": "Acoplado Taller Móvil JyM Moro",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818932/av9fohchzvnr8qbvorwz.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818932/av9fohchzvnr8qbvorwz.jpg"
      ],
      "descripcionCorta": "Unidad de mantenimiento de campo equipada con cajoneras, banco de trabajo con morsa y bauleras.",
      "descripcionLarga": "Unidad de mantenimiento de campo equipada con cajoneras, banco de trabajo con morsa y bauleras. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Uso": "Taller y auxilio mecánico",
          "Cajoneras": "Montadas sobre rodamientos",
          "Techo": "A dos aguas con alero"
      }
  },
  {
      "id": 124,
      "nombre": "Acoplado Multifunción con Jaula Desmontable",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818928/yff9tmepmpqkqzvxt4k1.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818928/yff9tmepmpqkqzvxt4k1.jpg"
      ],
      "descripcionCorta": "Acoplado con jaula desmontable que permite usarlo tanto para traslado de animales como playo.",
      "descripcionLarga": "Acoplado con jaula desmontable que permite usarlo tanto para traslado de animales como playo. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Jaula": "Desmontable con puertas guillotina",
          "Piso": "Chapa lisa / semillada",
          "Versatilidad": "Doble propósito"
      }
  },
  {
      "id": 125,
      "nombre": "Trailer Transporte de Caballos Cuello de Cisne",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818984/iimjyyisadnxiqwmtong.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818984/iimjyyisadnxiqwmtong.jpg"
      ],
      "descripcionCorta": "Trailer especial tipo cuello de cisne para traslado seguro y confortable de equinos con divisiones acolchadas.",
      "descripcionLarga": "Trailer especial tipo cuello de cisne para traslado seguro y confortable de equinos con divisiones acolchadas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Enganche": "Cuello de cisne sobre caja",
          "Capacidad": "2 a 4 Caballos",
          "Rampa": "Trasera asistida"
      }
  },
  {
      "id": 126,
      "nombre": "Acoplado Vaquero Ganadero JyM Moro",
      "categoria": "Acoplados",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818939/by5nw2c219chvcldncqo.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818939/by5nw2c219chvcldncqo.jpg"
      ],
      "descripcionCorta": "Acoplado ganadero reforzado con cargador y puerta guillotina para hacienda vacuna y porcina.",
      "descripcionLarga": "Acoplado ganadero reforzado con cargador y puerta guillotina para hacienda vacuna y porcina. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Tipo": "Vaquero ganadero",
          "Piso": "Madera dura con rejilla",
          "Ventilación": "Laterales ventilados"
      }
  },
  {
      "id": 127,
      "nombre": "Desmalezadora de Arrastre 1500, 1750, 2000 mm",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818954/ll5mbrolleptcxbbijbx.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818954/ll5mbrolleptcxbbijbx.jpg"
      ],
      "descripcionCorta": "Desmalezadora pesada de arrastre disponible en tres anchos de corte para desmonte liviano y pasturas.",
      "descripcionLarga": "Desmalezadora pesada de arrastre disponible en tres anchos de corte para desmonte liviano y pasturas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho": "1.50 / 1.75 / 2.00 m",
          "Caja": "De mando sobredimensionada",
          "Patines": "Regulables en altura"
      }
  },
  {
      "id": 128,
      "nombre": "Desmalezadora de 3m con Ala Rebatible JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818952/wcp5w6pmgklv9x4wlerv.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818952/wcp5w6pmgklv9x4wlerv.jpg"
      ],
      "descripcionCorta": "Desmalezadora articulada de gran ancho de corte con ala rebatible hidráulica para paso por tranqueras.",
      "descripcionLarga": "Desmalezadora articulada de gran ancho de corte con ala rebatible hidráulica para paso por tranqueras. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho de Corte": "3.00 metros",
          "Plegado": "Ala rebatible por cilindro",
          "Rendimiento": "Alta velocidad de trabajo"
      }
  },
  {
      "id": 129,
      "nombre": "Niveladora de Arrastre JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818958/cshmqez03iszhsykybx1.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818958/cshmqez03iszhsykybx1.jpg"
      ],
      "descripcionCorta": "Niveladora de arrastre para mantenimiento de caminos internos, desagües y nivelación de parcelas.",
      "descripcionLarga": "Niveladora de arrastre para mantenimiento de caminos internos, desagües y nivelación de parcelas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Vertedera": "Giro 360° con cuchilla cambiable",
          "Comandos": "Hidráulicos completos",
          "Chasis": "Monoviga pesado"
      }
  },
  {
      "id": 130,
      "nombre": "Pala Hidráulica con Ruedas Laterales JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818960/auktlu9q40tisks8djhc.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818960/auktlu9q40tisks8djhc.jpg"
      ],
      "descripcionCorta": "Pala de arrastre para movimiento de tierra y limpieza de canales con rodado exterior para mayor estabilidad.",
      "descripcionLarga": "Pala de arrastre para movimiento de tierra y limpieza de canales con rodado exterior para mayor estabilidad. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "1.5 a 3.0 m³",
          "Rodado": "Lateral exterior",
          "Carga y Vuelco": "Hidráulico"
      }
  },
  {
      "id": 131,
      "nombre": "Pala Hidráulica con Ruedas Traseras JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818962/kujezoxeufybeggof3pt.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818962/kujezoxeufybeggof3pt.jpg"
      ],
      "descripcionCorta": "Pala de arrastre compacta con ruedas ubicadas detrás del balde para corte al ras de bordes y taludes.",
      "descripcionLarga": "Pala de arrastre compacta con ruedas ubicadas detrás del balde para corte al ras de bordes y taludes. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Diseño": "Ruedas traseras para corte al borde",
          "Capacidad": "1.5 a 2.5 m³",
          "Cuchilla": "Acero boro templado"
      }
  },
  {
      "id": 132,
      "nombre": "Rastra Enganche de 3 Puntos JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818966/doevxypoj5cttwvzqnuj.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818966/doevxypoj5cttwvzqnuj.jpg"
      ],
      "descripcionCorta": "Rastra de levante hidráulico de tres puntos para huertas, viñedos y superficies reducidas.",
      "descripcionLarga": "Rastra de levante hidráulico de tres puntos para huertas, viñedos y superficies reducidas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Acople": "3 Puntos Cat. I / II",
          "Discos": "Dentados y lisos",
          "Maniobra": "Excelente en cabeceras"
      }
  },
  {
      "id": 133,
      "nombre": "Rastra Tiro Excéntrico con Enganche JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818968/xvzrwhjxxdco9o780jhr.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818968/xvzrwhjxxdco9o780jhr.jpg"
      ],
      "descripcionCorta": "Rastra excéntrica articulada con tiro compensado para preparación uniforme del suelo.",
      "descripcionLarga": "Rastra excéntrica articulada con tiro compensado para preparación uniforme del suelo. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Tiro": "Excéntrico compensado",
          "Chasis": "Vigas tubulares",
          "Regulación": "Traba angular mecánica"
      }
  },
  {
      "id": 134,
      "nombre": "Niveladora de 3 Puntos JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818956/npzbrw4imxcvax0q1g18.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818956/npzbrw4imxcvax0q1g18.jpg"
      ],
      "descripcionCorta": "Cuchilla niveladora montada al tres puntos del tractor para cunetas, emparejado y limpieza.",
      "descripcionLarga": "Cuchilla niveladora montada al tres puntos del tractor para cunetas, emparejado y limpieza. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Acople": "3 Puntos",
          "Ángulo": "Regulable en corte y vuelco",
          "Hoja": "Reversible"
      }
  },
  {
      "id": 135,
      "nombre": "Cincel de 3 y 5 Púas 3 Puntos JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818945/jxegylitmfarwwv8owgm.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818945/jxegylitmfarwwv8owgm.jpg"
      ],
      "descripcionCorta": "Subsolador liviano de 3 a 5 timones para tractores de baja y media potencia.",
      "descripcionLarga": "Subsolador liviano de 3 a 5 timones para tractores de baja y media potencia. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Púas": "3 o 5 intercambiables",
          "Montaje": "Tres puntos trasero",
          "Penetración": "Hasta 40 cm"
      }
  },
  {
      "id": 136,
      "nombre": "Desmalezadora de 3 Puntos JyM Moro",
      "categoria": "Herramientas",
      "marca": "JyM Moro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818950/gxn8dvbxiw0cipaaflpq.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818950/gxn8dvbxiw0cipaaflpq.jpg"
      ],
      "descripcionCorta": "Desmalezadora suspendida para limpieza rápida de rastrojos livianos y espacios confinados.",
      "descripcionLarga": "Desmalezadora suspendida para limpieza rápida de rastrojos livianos y espacios confinados. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Enganche": "3 Puntos",
          "Transmisión": "Caja a engranajes cónicos",
          "Cuchillas": "Acero tratadas"
      }
  },
  {
      "id": 137,
      "nombre": "Pala Cargadora Toolking TK 930",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819054/dxcbnh7clhrduuyfsovu.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819054/dxcbnh7clhrduuyfsovu.jpg"
      ],
      "descripcionCorta": "Pala cargadora frontal con balde de 1.5 m³, motor turbo diésel de 115 HP, tracción 4x4 y cabina con aire acondicionado.",
      "descripcionLarga": "Pala cargadora frontal con balde de 1.5 m³, motor turbo diésel de 115 HP, tracción 4x4 y cabina con aire acondicionado. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "3.000 kg",
          "Balde": "1.5 m³",
          "Motor": "Diésel Turbo 115 HP",
          "Tracción": "4x4"
      }
  },
  {
      "id": 138,
      "nombre": "Pala Cargadora Toolking TK 930 E",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819057/khxyzj60zweztwgl6ahr.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819057/khxyzj60zweztwgl6ahr.jpg"
      ],
      "descripcionCorta": "Pala cargadora frontal serie especial con joystick hidráulico, mayor despeje de descarga y frenos de disco.",
      "descripcionLarga": "Pala cargadora frontal serie especial con joystick hidráulico, mayor despeje de descarga y frenos de disco. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "3.000 kg",
          "Balde": "1.5 m³",
          "Comandos": "Joystick Hidráulico",
          "Frenos": "Disco en 4 ruedas"
      }
  },
  {
      "id": 139,
      "nombre": "Pala Cargadora Toolking TK 938",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819060/w80q39gqreytrcs98vep.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819060/w80q39gqreytrcs98vep.jpg"
      ],
      "descripcionCorta": "Pala pesada para canteras y movimientos de gran volumen. Motor diésel de 130 HP y balde de 1.8 m³.",
      "descripcionLarga": "Pala pesada para canteras y movimientos de gran volumen. Motor diésel de 130 HP y balde de 1.8 m³. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "3.500 kg",
          "Balde": "1.8 m³",
          "Motor": "Turbo Diésel 130 HP",
          "Cabina": "ROPS / FOPS A/C"
      }
  },
  {
      "id": 140,
      "nombre": "Pala Cargadora Toolking TK 946",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819062/hdzl8lnvrk4xviglaisp.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819062/hdzl8lnvrk4xviglaisp.jpg"
      ],
      "descripcionCorta": "Pala de alta producción con balde de 2.2 m³, potencia de 160 HP y transmisión automática Powershift.",
      "descripcionLarga": "Pala de alta producción con balde de 2.2 m³, potencia de 160 HP y transmisión automática Powershift. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4.200 kg",
          "Balde": "2.2 m³",
          "Potencia": "160 HP Turbo",
          "Transmisión": "Powershift"
      }
  },
  {
      "id": 141,
      "nombre": "Pala Cargadora Toolking TK 956",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819066/nmlzmaridntetdv73eyl.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819066/nmlzmaridntetdv73eyl.jpg"
      ],
      "descripcionCorta": "Pala cargadora pesada de 5 toneladas para trabajo severo. Balde de 3.0 m³ y motor de 220 HP Intercooler.",
      "descripcionLarga": "Pala cargadora pesada de 5 toneladas para trabajo severo. Balde de 3.0 m³ y motor de 220 HP Intercooler. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "5.000 kg",
          "Balde": "3.0 m³",
          "Motor": "220 HP Intercooler",
          "Peso": "17.000 kg"
      }
  },
  {
      "id": 142,
      "nombre": "Minipala Cargadora Toolking TK 75",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819052/nox8u6i8osnnoarvzloq.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819052/nox8u6i8osnnoarvzloq.jpg"
      ],
      "descripcionCorta": "Minicargadora compacta sobre ruedas con motor Kubota diésel de 50 HP y enganche rápido universal de accesorios.",
      "descripcionLarga": "Minicargadora compacta sobre ruedas con motor Kubota diésel de 50 HP y enganche rápido universal de accesorios. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Carga Operativa": "850 kg",
          "Balde": "0.45 m³",
          "Motor": "Kubota Diésel 50 HP",
          "Comandos": "Joystick"
      }
  },
  {
      "id": 143,
      "nombre": "Manipulador Telescópico Toolking HA735",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819026/xzyhfwz2edcuzd6fejv9.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819026/xzyhfwz2edcuzd6fejv9.jpg"
      ],
      "descripcionCorta": "Elevador telescópico agrícola/vial de 7 metros de alcance, tracción 4x4 integral y dirección en las 4 ruedas.",
      "descripcionLarga": "Elevador telescópico agrícola/vial de 7 metros de alcance, tracción 4x4 integral y dirección en las 4 ruedas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Alcance Altura": "7.0 m",
          "Capacidad": "3.500 kg",
          "Tracción": "4x4",
          "Giro": "3 Modos de dirección"
      }
  },
  {
      "id": 144,
      "nombre": "Manipulador Telescópico Toolking H735 PRO",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819024/e31rbho5uqemlok7g1m2.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819024/e31rbho5uqemlok7g1m2.jpg"
      ],
      "descripcionCorta": "Versión profesional con bomba hidráulica de pistones de caudal variable, autonivelación y cámara de retroceso.",
      "descripcionLarga": "Versión profesional con bomba hidráulica de pistones de caudal variable, autonivelación y cámara de retroceso. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Alcance": "7.0 m",
          "Capacidad": "3.500 kg",
          "Bomba": "Pistones Axiales 140 L/min",
          "Nivelación": "Autonivelante"
      }
  },
  {
      "id": 145,
      "nombre": "Manipulador Telescópico Toolking H1840 PRO",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819022/i3kh9vq7bgikhcgclw0o.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819022/i3kh9vq7bgikhcgclw0o.jpg"
      ],
      "descripcionCorta": "Manipulador de gran alcance de 18 metros con estabilizadores frontales para construcción y montaje.",
      "descripcionLarga": "Manipulador de gran alcance de 18 metros con estabilizadores frontales para construcción y montaje. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Alcance Altura": "18.0 m",
          "Capacidad": "4.000 kg",
          "Estabilizadores": "Hidráulicos",
          "Motor": "Perkins Turbo Diésel"
      }
  },
  {
      "id": 146,
      "nombre": "Autoelevador Toolking TK 2545 Diésel",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819034/vlxd7k2pt4sqoi9olplu.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819034/vlxd7k2pt4sqoi9olplu.jpg"
      ],
      "descripcionCorta": "Autoelevador todo terreno de 2.5 toneladas con torre triple triplex de 4.5 metros y desplazador lateral.",
      "descripcionLarga": "Autoelevador todo terreno de 2.5 toneladas con torre triple triplex de 4.5 metros y desplazador lateral. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "2.500 kg",
          "Torre": "Triplex 4.5 m",
          "Motor": "Diésel 4 cilindros",
          "Desplazador": "Lateral incluido"
      }
  },
  {
      "id": 147,
      "nombre": "Autoelevador Toolking TK 2548 Diésel",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819037/zujkietxo1zqwp8tnypa.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819037/zujkietxo1zqwp8tnypa.jpg"
      ],
      "descripcionCorta": "Autoelevador industrial de 2.5 toneladas con mástil de 4.8 metros para almacenamiento en altura.",
      "descripcionLarga": "Autoelevador industrial de 2.5 toneladas con mástil de 4.8 metros para almacenamiento en altura. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "2.500 kg",
          "Torre": "Triplex 4.8 m",
          "Motor": "Diésel",
          "Rodado": "Neumático"
      }
  },
  {
      "id": 148,
      "nombre": "Autoelevador Toolking TK 2560 Diésel",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819040/wq5as6cwzi34cejx6vxn.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819040/wq5as6cwzi34cejx6vxn.jpg"
      ],
      "descripcionCorta": "Autoelevador de 2.5 toneladas con torre alta de 6.0 metros, transmisión automática y asiento con suspensión.",
      "descripcionLarga": "Autoelevador de 2.5 toneladas con torre alta de 6.0 metros, transmisión automática y asiento con suspensión. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "2.500 kg",
          "Torre": "Triplex 6.0 m",
          "Transmisión": "Automática Powershift"
      }
  },
  {
      "id": 149,
      "nombre": "Autoelevador Toolking TK 3545 Diésel",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819043/cjguwpm2skybrtczpnti.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819043/cjguwpm2skybrtczpnti.jpg"
      ],
      "descripcionCorta": "Autoelevador pesado de 3.5 toneladas con mástil de 4.5 metros y motor diésel de alto torque para paletizados pesados.",
      "descripcionLarga": "Autoelevador pesado de 3.5 toneladas con mástil de 4.5 metros y motor diésel de alto torque para paletizados pesados. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "3.500 kg",
          "Torre": "Triplex 4.5 m",
          "Motor": "Isuzu Diésel",
          "Uñas": "1.200 mm"
      }
  },
  {
      "id": 150,
      "nombre": "Autoelevador Eléctrico Toolking 2545",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819017/y63afmg7ag0emsmexygm.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819017/y63afmg7ag0emsmexygm.jpg"
      ],
      "descripcionCorta": "Autoelevador 100% eléctrico a batería para depósitos cerrados, silencioso y sin emisiones de humo.",
      "descripcionLarga": "Autoelevador 100% eléctrico a batería para depósitos cerrados, silencioso y sin emisiones de humo. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "2.500 kg",
          "Propulsión": "100% Eléctrico",
          "Torre": "Triplex 4.5 m",
          "Emisiones": "Cero"
      }
  },
  {
      "id": 151,
      "nombre": "Retroexcavadora Combinada Toolking TK 388",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819046/jduvhg3k1ao53dnyw2ql.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819046/jduvhg3k1ao53dnyw2ql.jpg"
      ],
      "descripcionCorta": "Retroexcavadora 4x4 con balde delantero de 1.0 m³ y brazo excavador trasero de 4.5 metros de profundidad.",
      "descripcionLarga": "Retroexcavadora 4x4 con balde delantero de 1.0 m³ y brazo excavador trasero de 4.5 metros de profundidad. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Profundidad": "4.5 m",
          "Balde Frontal": "1.0 m³",
          "Motor": "Cummins 100 HP",
          "Tracción": "4x4"
      }
  },
  {
      "id": 152,
      "nombre": "Tractor Cortacésped Toolking TK 66",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819048/gjcp0rpdvsghe6dbepxr.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819048/gjcp0rpdvsghe6dbepxr.jpg"
      ],
      "descripcionCorta": "Tractor giro cero con plataforma de corte de 66 pulgadas (1.68 m), motor de 27 HP y 3 cuchillas.",
      "descripcionLarga": "Tractor giro cero con plataforma de corte de 66 pulgadas (1.68 m), motor de 27 HP y 3 cuchillas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho de Corte": "66'' (1.68 m)",
          "Motor": "Nafta 27 HP",
          "Transmisión": "Hidrostática Giro Cero"
      }
  },
  {
      "id": 153,
      "nombre": "Tractor Cortacésped Toolking TK 108",
      "categoria": "Herramientas",
      "marca": "Toolking",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819031/j7f9mcu3wiotxc6zede6.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819031/j7f9mcu3wiotxc6zede6.jpg"
      ],
      "descripcionCorta": "Tractor cortacésped industrial para mantenimiento de grandes extensiones, corte flotante y chasis reforzado.",
      "descripcionLarga": "Tractor cortacésped industrial para mantenimiento de grandes extensiones, corte flotante y chasis reforzado. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho de Corte": "72'' (1.83 m)",
          "Motor": "31 HP",
          "Dirección": "Palancas hidráulicas dobles"
      }
  },
  {
      "id": 154,
      "nombre": "Rastra Desencontrada Corti Razor 700",
      "categoria": "Herramientas",
      "marca": "Corti S.A.",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818868/gzjg1bp2uzqoqkvzvlqd.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818868/gzjg1bp2uzqoqkvzvlqd.jpg"
      ],
      "descripcionCorta": "Rastra desencontrada pesada para corte de rastrojos voluminosos con bancadas en baño de aceite.",
      "descripcionLarga": "Rastra desencontrada pesada para corte de rastrojos voluminosos con bancadas en baño de aceite. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Discos": "26'' / 28''",
          "Bancadas": "Baño de aceite con doble retén",
          "Chasis": "Vigas tubulares"
      }
  },
  {
      "id": 155,
      "nombre": "Cuchilla Niveladora Corti Terra 304 / 314 (4 Ruedas)",
      "categoria": "Herramientas",
      "marca": "Corti S.A.",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818872/ytqcylilaz4s8y4xesna.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818872/ytqcylilaz4s8y4xesna.jpg"
      ],
      "descripcionCorta": "Niveladora de arrastre con 4 ruedas en tándem balancín y 3 movimientos hidráulicos independientes.",
      "descripcionLarga": "Niveladora de arrastre con 4 ruedas en tándem balancín y 3 movimientos hidráulicos independientes. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Rodado": "4 Ruedas en balancín",
          "Movimientos": "3 Hidráulicos",
          "Vertedera": "Acero tratado"
      }
  },
  {
      "id": 156,
      "nombre": "Rastra Desencontrada Corti Serie 3000",
      "categoria": "Herramientas",
      "marca": "Corti S.A.",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818870/k6mrbnfhrjk2bv2uegpc.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818870/k6mrbnfhrjk2bv2uegpc.jpg"
      ],
      "descripcionCorta": "Rastra de doble acción para preparación y refinamiento uniforme de cama de siembra.",
      "descripcionLarga": "Rastra de doble acción para preparación y refinamiento uniforme de cama de siembra. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Discos": "24'' / 26''",
          "Separación": "230 mm",
          "Levante": "Cilindro hidráulico"
      }
  },
  {
      "id": 157,
      "nombre": "Rastra Tiro Excéntrico Corti K-90",
      "categoria": "Herramientas",
      "marca": "Corti S.A.",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818863/bmkbgwfi0qvfpdabqifm.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818863/bmkbgwfi0qvfpdabqifm.jpg"
      ],
      "descripcionCorta": "Rastra excéntrica articulada de tiro compensado y ejes de discos de acero SAE 4140.",
      "descripcionLarga": "Rastra excéntrica articulada de tiro compensado y ejes de discos de acero SAE 4140. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Tipo": "Tiro Excéntrico",
          "Ejes": "Acero SAE 4140",
          "Cojinetes": "Servicio severo"
      }
  },
  {
      "id": 158,
      "nombre": "Descompactador Subsolador Corti Modelo SAV",
      "categoria": "Herramientas",
      "marca": "Corti S.A.",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818865/qdbyuli91kird4cmfezd.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818865/qdbyuli91kird4cmfezd.jpg"
      ],
      "descripcionCorta": "Subsolador para roturación de piso de arado con timones parabólicos y zafe automático por sobrecarga.",
      "descripcionLarga": "Subsolador para roturación de piso de arado con timones parabólicos y zafe automático por sobrecarga. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Timones": "Parabólicos con púas cambiables",
          "Seguridad": "Zafe automático",
          "Rolo": "Trasero desterronador"
      }
  },
  {
      "id": 159,
      "nombre": "Bancadas en Baño de Aceite Corti",
      "categoria": "Herramientas",
      "marca": "Corti S.A.",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818859/l2u5p7avdpuuoiv8elyk.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818859/l2u5p7avdpuuoiv8elyk.jpg"
      ],
      "descripcionCorta": "Bancadas originales con retén dúo-cono de lubricación permanente para rastras de discos.",
      "descripcionLarga": "Bancadas originales con retén dúo-cono de lubricación permanente para rastras de discos. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Lubricación": "Baño de aceite permanente",
          "Sellado": "Retén dúo-cono",
          "Material": "Fundición nodular"
      }
  },
  {
      "id": 160,
      "nombre": "Rolos Trituradores Corti Línea Cosmos",
      "categoria": "Herramientas",
      "marca": "Corti S.A.",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818861/vpx59vecahim7bxqofbw.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818861/vpx59vecahim7bxqofbw.jpg"
      ],
      "descripcionCorta": "Rolo picador de rastrojo y control de malezas con cuchillas templadas en disposición helicoidal.",
      "descripcionLarga": "Rolo picador de rastrojo y control de malezas con cuchillas templadas en disposición helicoidal. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Cuchillas": "Helicoidales templadas",
          "Lastre": "Apto carga de agua",
          "Chasis": "Plegable"
      }
  },
  {
      "id": 161,
      "nombre": "Sembradora Monumental Air Drill",
      "categoria": "Sembradoras",
      "marca": "Monumental",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818912/fgtavmjllnujeok3mkhf.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818912/fgtavmjllnujeok3mkhf.jpg"
      ],
      "descripcionCorta": "Sembradora Air Drill para granos finos, soja y pasturas con tolva central de hasta 13.500 litros y transporte sin desarme.",
      "descripcionLarga": "Sembradora Air Drill para granos finos, soja y pasturas con tolva central de hasta 13.500 litros y transporte sin desarme. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Modelos": "8.300 / 10.000 / 12.000 / 16.000",
          "Tolva": "Hasta 13.500 L",
          "Dosificación": "Variable",
          "Transporte": "En carretón sin desarme"
      }
  },
  {
      "id": 162,
      "nombre": "Sembradora Monumental Línea Tándem",
      "categoria": "Sembradoras",
      "marca": "Monumental",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818917/eiidwv4vyy3cvhupu7aj.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818917/eiidwv4vyy3cvhupu7aj.jpg"
      ],
      "descripcionCorta": "Sembradora modular de doble chasis articulado para granos finos y gruesos con excelente copiado de terreno.",
      "descripcionLarga": "Sembradora modular de doble chasis articulado para granos finos y gruesos con excelente copiado de terreno. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Configuración": "Módulos en tándem",
          "Distanciamiento": "17.5 / 19 / 21 / 35 / 52.5 cm",
          "Chasis": "Tubular reforzado"
      }
  },
  {
      "id": 163,
      "nombre": "Sembradora Monumental Tiro de Punta",
      "categoria": "Sembradoras",
      "marca": "Monumental",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818926/kjn839jl6odj74xzuhac.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818926/kjn839jl6odj74xzuhac.jpg"
      ],
      "descripcionCorta": "Sembradora con sistema de tiro de punta para rápido transporte por caminos rurales con solo 3.50 m de ancho.",
      "descripcionLarga": "Sembradora con sistema de tiro de punta para rápido transporte por caminos rurales con solo 3.50 m de ancho. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho Transporte": "3.50 m",
          "Cuerpos": "Paralelogramo articulado",
          "Fertilización": "Simple o doble"
      }
  },
  {
      "id": 164,
      "nombre": "Sembradora Monumental Autotrailer",
      "categoria": "Sembradoras",
      "marca": "Monumental",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818914/ykmopicvbdi9pzdqwath.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818914/ykmopicvbdi9pzdqwath.jpg"
      ],
      "descripcionCorta": "Sembradora con plegado hidráulico total desde la cabina en menos de 2 minutos para paso ágil lote a lote.",
      "descripcionLarga": "Sembradora con plegado hidráulico total desde la cabina en menos de 2 minutos para paso ágil lote a lote. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Plegado": "Hidráulico Autotrailer",
          "Tiempo": "< 2 min",
          "Tolvas": "Grano y fertilizante"
      }
  },
  {
      "id": 165,
      "nombre": "Sembradora Monumental Tambera",
      "categoria": "Sembradoras",
      "marca": "Monumental",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818922/vuqtigblmpyvw2tjnsl3.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818922/vuqtigblmpyvw2tjnsl3.jpg"
      ],
      "descripcionCorta": "Sembradora desarrollada para pasturas, verdeos, alfalfa y grano fino con cajón alfalfero de dosificación milimétrica.",
      "descripcionLarga": "Sembradora desarrollada para pasturas, verdeos, alfalfa y grano fino con cajón alfalfero de dosificación milimétrica. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Uso": "Pasturas, Tambo e Intersiembra",
          "Cajón Alfalfero": "Incorporado",
          "Penetración": "Cuerpo reforzado"
      }
  },
  {
      "id": 166,
      "nombre": "Sembradora Monumental Semillera",
      "categoria": "Sembradoras",
      "marca": "Monumental",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818919/op4af4dg56edrrbtttg4.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818919/op4af4dg56edrrbtttg4.jpg"
      ],
      "descripcionCorta": "Sembradora de alta precisión para granos gruesos con dosificadores neumáticos/mecánicos y corte línea por línea.",
      "descripcionLarga": "Sembradora de alta precisión para granos gruesos con dosificadores neumáticos/mecánicos y corte línea por línea. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Dosificación": "Neumática / Mecánica grano a grano",
          "Monitoreo": "Surco por surco",
          "Fertilización": "Profunda lateral"
      }
  },
  {
      "id": 167,
      "nombre": "Acoplado Carretón Marpla 4 Tn",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818875/qiq3mxghnlolqzllfpn2.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818875/qiq3mxghnlolqzllfpn2.jpg"
      ],
      "descripcionCorta": "Carretón con piso de chapa antideslizante y rampas traseras para minicargadoras y tractores chicos.",
      "descripcionLarga": "Carretón con piso de chapa antideslizante y rampas traseras para minicargadoras y tractores chicos. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4.000 kg",
          "Piso": "Chapa antideslizante",
          "Rampas": "Abatibles",
          "Ejes": "2 Ejes balancín"
      }
  },
  {
      "id": 168,
      "nombre": "Acoplado Carretón Marpla 8 Tn",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818877/ozbxrcg0adhx4g46kpst.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818877/ozbxrcg0adhx4g46kpst.jpg"
      ],
      "descripcionCorta": "Carretón de servicio pesado con vigas IPN reforzadas para palas cargadoras y retroexcavadoras.",
      "descripcionLarga": "Carretón de servicio pesado con vigas IPN reforzadas para palas cargadoras y retroexcavadoras. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "8.000 kg",
          "Estructura": "Vigas IPN",
          "Frenos": "En 4 ruedas"
      }
  },
  {
      "id": 169,
      "nombre": "Acoplado Jaula Ganadera Marpla",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818881/uqg8mtjfvwop3qwyyl3x.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818881/uqg8mtjfvwop3qwyyl3x.jpg"
      ],
      "descripcionCorta": "Acoplado ganadero con piso de madera y enrejado para traslado de hacienda.",
      "descripcionLarga": "Acoplado ganadero con piso de madera y enrejado para traslado de hacienda. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Tipo": "Ganadero",
          "Piso": "Madera y rejilla metálica",
          "Puertas": "Guillotina y lateral"
      }
  },
  {
      "id": 170,
      "nombre": "Acoplado Jaula Marpla Desmontable Balancín",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818879/pvmtlquwybuhmjxpoxqn.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818879/pvmtlquwybuhmjxpoxqn.jpg"
      ],
      "descripcionCorta": "Jaula desmontable con balancín central que permite retirar la estructura y utilizarlo como playo.",
      "descripcionLarga": "Jaula desmontable con balancín central que permite retirar la estructura y utilizarlo como playo. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Tipo": "Jaula desmontable",
          "Suspensión": "Balancín central",
          "Uso": "Hacienda o carga general"
      }
  },
  {
      "id": 171,
      "nombre": "Acoplado Playo Marpla 4 Tn",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818883/fbezkd2azevtwb5jnixz.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818883/fbezkd2azevtwb5jnixz.jpg"
      ],
      "descripcionCorta": "Acoplado rural de uso múltiple con piso de chapa, barandas volcables y aro giratorio a bolillas.",
      "descripcionLarga": "Acoplado rural de uso múltiple con piso de chapa, barandas volcables y aro giratorio a bolillas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4.000 kg",
          "Barandas": "Volcables / Desmontables",
          "Giro": "Aro 360°"
      }
  },
  {
      "id": 172,
      "nombre": "Acoplado Semillero Marpla 14 Tn con Chimango",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818885/uzgglbth0cc9yfhbyyoq.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818885/uzgglbth0cc9yfhbyyoq.jpg"
      ],
      "descripcionCorta": "Tolva semillera con división para semilla y fertilizante y tubo sinfín de descarga orientable.",
      "descripcionLarga": "Tolva semillera con división para semilla y fertilizante y tubo sinfín de descarga orientable. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "14 Toneladas (18 m³)",
          "División": "Doble",
          "Descarga": "Sinfín hidráulico 200 mm"
      }
  },
  {
      "id": 173,
      "nombre": "Acoplado Taller Móvil Marpla",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818887/c8s7ipet1d7t4p88g0xa.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818887/c8s7ipet1d7t4p88g0xa.jpg"
      ],
      "descripcionCorta": "Módulo rodante para auxilio mecánico de cosechadoras y tractores con bauleras y banco de trabajo.",
      "descripcionLarga": "Módulo rodante para auxilio mecánico de cosechadoras y tractores con bauleras y banco de trabajo. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Equipamiento": "Bauleras herméticas y banco con morsa",
          "Uso": "Mantenimiento en campo"
      }
  },
  {
      "id": 174,
      "nombre": "Acoplado Tanque Marpla con Depósito Delantero",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818888/gmfn2pwqlpkp9ct1yql1.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818888/gmfn2pwqlpkp9ct1yql1.jpg"
      ],
      "descripcionCorta": "Tanque cisterna para gasoil con baulera frontal porta bomba y almacenamiento de herramientas.",
      "descripcionLarga": "Tanque cisterna para gasoil con baulera frontal porta bomba y almacenamiento de herramientas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Tanque": "Chapa de acero",
          "Depósito": "Frontal integrado",
          "Uso": "Combustible y auxilio"
      }
  },
  {
      "id": 175,
      "nombre": "Acoplado Tanque Marpla Especial Doble Baulera",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818890/vsaxhycevv2cwm4csfpv.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818890/vsaxhycevv2cwm4csfpv.jpg"
      ],
      "descripcionCorta": "Tanque cisterna de combustible con doble baulera lateral y soporte para bomba de despacho.",
      "descripcionLarga": "Tanque cisterna de combustible con doble baulera lateral y soporte para bomba de despacho. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "3.000 / 5.000 L",
          "Bauleras": "Dobles laterales",
          "Rompeolas": "Interiores"
      }
  },
  {
      "id": 176,
      "nombre": "Acoplado Tanque Marpla MD 1500",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818891/a18di2ziy9kn8x4f7nsw.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818891/a18di2ziy9kn8x4f7nsw.jpg"
      ],
      "descripcionCorta": "Tanque cisterna metálico compacto de 1.500 litros para abastecimiento en lote.",
      "descripcionLarga": "Tanque cisterna metálico compacto de 1.500 litros para abastecimiento en lote. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "1.500 Litros",
          "Material": "Chapa de acero reforzada",
          "Rodado": "Eje simple"
      }
  },
  {
      "id": 177,
      "nombre": "Acoplado Tanque Completo Marpla",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818874/guukxp2b7urrahob0jdw.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818874/guukxp2b7urrahob0jdw.jpg"
      ],
      "descripcionCorta": "Unidad completa con kit de despacho de combustible, manguera, filtro y surtidor.",
      "descripcionLarga": "Unidad completa con kit de despacho de combustible, manguera, filtro y surtidor. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Equipamiento": "Bomba + Manguera + Pico automático",
          "Capacidad": "Hasta 4.000 L"
      }
  },
  {
      "id": 178,
      "nombre": "Acoplado Volcador Batea Marpla Vuelco Trasero",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818893/brtgfj1hstsd3nkjf5wa.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818893/brtgfj1hstsd3nkjf5wa.jpg"
      ],
      "descripcionCorta": "Batea con cilindro telescópico de vuelco trasero y compuerta automática para áridos y silaje.",
      "descripcionLarga": "Batea con cilindro telescópico de vuelco trasero y compuerta automática para áridos y silaje. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Vuelco": "Hidráulico trasero",
          "Compuerta": "Apertura automática",
          "Capacidad": "6 a 10 Tn"
      }
  },
  {
      "id": 179,
      "nombre": "Chasis con Tanque Plástico Marpla 1100 Lts",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818895/fxpykyr92htzfvpkgkzl.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818895/fxpykyr92htzfvpkgkzl.jpg"
      ],
      "descripcionCorta": "Acoplado con tanque de polietileno rotomoldeado resistente a fertilizantes líquidos y agua.",
      "descripcionLarga": "Acoplado con tanque de polietileno rotomoldeado resistente a fertilizantes líquidos y agua. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "1.100 Litros",
          "Tanque": "Polietileno con protección UV",
          "Eje": "Simple reforzado"
      }
  },
  {
      "id": 180,
      "nombre": "Chasis con Tanque Plástico Marpla 1750 Lts",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818897/wrksl18tlpu8q8tckbc9.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818897/wrksl18tlpu8q8tckbc9.jpg"
      ],
      "descripcionCorta": "Chasis anticorrosivo con tanque plástico de 1.750 litros para abastecimiento de pulverización.",
      "descripcionLarga": "Chasis anticorrosivo con tanque plástico de 1.750 litros para abastecimiento de pulverización. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "1.750 Litros",
          "Material": "Polietileno virgen",
          "Uso": "Fertilizante y agua"
      }
  },
  {
      "id": 181,
      "nombre": "Chasis con Tanque Plástico Marpla 2200 Lts",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818898/fkngahhrnzgcexukka1z.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818898/fkngahhrnzgcexukka1z.jpg"
      ],
      "descripcionCorta": "Acoplado tanque plástico mediano de 2.200 litros con rompeolas integrados.",
      "descripcionLarga": "Acoplado tanque plástico mediano de 2.200 litros con rompeolas integrados. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "2.200 Litros",
          "Rodado": "Balancín",
          "Tanque": "Rotomoldeado reforzado"
      }
  },
  {
      "id": 182,
      "nombre": "Chasis con Tanque Plástico Marpla 3500 Lts",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818900/hou8eyhkrwwi3nzw9cbc.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818900/hou8eyhkrwwi3nzw9cbc.jpg"
      ],
      "descripcionCorta": "Acoplado cisterna plástico de 3.500 litros con balancín y base porta motobomba.",
      "descripcionLarga": "Acoplado cisterna plástico de 3.500 litros con balancín y base porta motobomba. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "3.500 Litros",
          "Suspensión": "Balancín",
          "Soporte": "Porta motobomba"
      }
  },
  {
      "id": 183,
      "nombre": "Chasis con Tanque Plástico Marpla 3500 Lts (Sin Porta Lata)",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818901/ymoqjohluifv9xw03ey4.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818901/ymoqjohluifv9xw03ey4.jpg"
      ],
      "descripcionCorta": "Versión estándar de 3.500 litros optimizada para traslado de agua y riego en explotaciones agropecuarias.",
      "descripcionLarga": "Versión estándar de 3.500 litros optimizada para traslado de agua y riego en explotaciones agropecuarias. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "3.500 Litros",
          "Configuración": "Estándar sin accesorios laterales"
      }
  },
  {
      "id": 184,
      "nombre": "Chasis con Tanque Plástico Marpla 5500 Lts",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818903/rfts3ew4aqk0ss1txfm7.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818903/rfts3ew4aqk0ss1txfm7.jpg"
      ],
      "descripcionCorta": "Acoplado tanque de gran capacidad para alta autonomía de pulverizadoras autopropulsadas.",
      "descripcionLarga": "Acoplado tanque de gran capacidad para alta autonomía de pulverizadoras autopropulsadas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "5.500 Litros",
          "Rodado": "Balancín alta flotación",
          "Enganche": "Regulable"
      }
  },
  {
      "id": 185,
      "nombre": "Palón Nivelador para Corrales Marpla",
      "categoria": "Herramientas",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818905/hqquxajypbtft5dgcbyz.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818905/hqquxajypbtft5dgcbyz.jpg"
      ],
      "descripcionCorta": "Palón de arrastre para limpieza y nivelación de corrales de feedlot, caminos y tambos.",
      "descripcionLarga": "Palón de arrastre para limpieza y nivelación de corrales de feedlot, caminos y tambos. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Uso": "Limpieza de corrales y nivelación",
          "Vertedera": "Chapa de alta resistencia"
      }
  },
  {
      "id": 186,
      "nombre": "Tolva Silera Marpla",
      "categoria": "Acoplados",
      "marca": "Marpla",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818909/fwd4whrto7hq9vgm3zc4.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818909/fwd4whrto7hq9vgm3zc4.jpg"
      ],
      "descripcionCorta": "Acoplado tolva para silaje y granos con descarga por compuerta de guillotina rápida.",
      "descripcionLarga": "Acoplado tolva para silaje y granos con descarga por compuerta de guillotina rápida. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "Tolva para silaje y forraje",
          "Descarga": "Inferior / Lateral rápida"
      }
  },
  {
      "id": 187,
      "nombre": "Fertilizadora de Arrastre Bernardin Vortex 4000",
      "categoria": "Herramientas",
      "marca": "Bernardin",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818858/s35leb8dj87erzne06s3.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818858/s35leb8dj87erzne06s3.jpg"
      ],
      "descripcionCorta": "Fertilizadora al voleo de platos dobles con dosificación de alta precisión y distribución uniforme hasta 36 metros.",
      "descripcionLarga": "Fertilizadora al voleo de platos dobles con dosificación de alta precisión y distribución uniforme hasta 36 metros. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4.000 Litros",
          "Ancho Labor": "Hasta 36 m",
          "Dosificación": "Doble plato distribuidor",
          "Tolva": "Acero inoxidable / Polietileno"
      }
  },
  {
      "id": 188,
      "nombre": "Carro Fertilizador Bernardin Quasar",
      "categoria": "Herramientas",
      "marca": "Bernardin",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788818856/fiuo51ldzkbrt2gy9u72.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788818856/fiuo51ldzkbrt2gy9u72.jpg"
      ],
      "descripcionCorta": "Distribuidor de fertilizantes granulados y enmiendas con cinta transportadora de dosificación proporcional al avance.",
      "descripcionLarga": "Distribuidor de fertilizantes granulados y enmiendas con cinta transportadora de dosificación proporcional al avance. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Distribución": "Platos centrífugos",
          "Accionamiento": "Hidráulico / Toma de fuerza",
          "Chasis": "Tubular reforzado"
      }
  },
  {
      "id": 189,
      "nombre": "Acoplado Playo Metalúrgica Mauro 1.5 Tn (1 Eje)",
      "categoria": "Acoplados",
      "marca": "Metalúrgica Mauro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819868/yjxa5kepg1pl5cjo0fqy.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819868/yjxa5kepg1pl5cjo0fqy.jpg"
      ],
      "descripcionCorta": "Acoplado playo de 1 eje de alta maniobrabilidad para cargas livianas, tareas de granja y transporte rural.",
      "descripcionLarga": "Acoplado playo de 1 eje de alta maniobrabilidad para cargas livianas, tareas de granja y transporte rural. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "1.500 kg",
          "Ejes": "1 Eje macizo",
          "Piso": "Chapa antideslizante",
          "Barandas": "Volcables"
      }
  },
  {
      "id": 190,
      "nombre": "Acoplado Playo Metalúrgica Mauro 4 Tn (2 Ejes)",
      "categoria": "Acoplados",
      "marca": "Metalúrgica Mauro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819870/nc4gcr783v4tkffvz2vc.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819870/nc4gcr783v4tkffvz2vc.jpg"
      ],
      "descripcionCorta": "Acoplado playo balancín de 4 toneladas con barandas perimetrales volcables y lanza con resorte.",
      "descripcionLarga": "Acoplado playo balancín de 4 toneladas con barandas perimetrales volcables y lanza con resorte. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "4.000 kg",
          "Ejes": "2 Ejes balancín",
          "Dimensiones": "4.00 x 2.00 metros",
          "Chasis": "Perfil UPN"
      }
  },
  {
      "id": 191,
      "nombre": "Acoplado Jaula Ganadera Metalúrgica Mauro (2 Ejes)",
      "categoria": "Acoplados",
      "marca": "Metalúrgica Mauro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819871/xj4an2l3mpqgubd8fvdc.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819871/xj4an2l3mpqgubd8fvdc.jpg"
      ],
      "descripcionCorta": "Acoplado jaula de dos ejes balancín para transporte de animales con piso de madera y cargador trasero.",
      "descripcionLarga": "Acoplado jaula de dos ejes balancín para transporte de animales con piso de madera y cargador trasero. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "Hacienda general",
          "Suspensión": "2 Ejes balancín",
          "Puertas": "Guillotina y rampa"
      }
  },
  {
      "id": 192,
      "nombre": "Acoplado Tanque para Combustible Metalúrgica Mauro 1.500 Lts",
      "categoria": "Acoplados",
      "marca": "Metalúrgica Mauro",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819872/rnsuawrsgepviq8jc4rt.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819872/rnsuawrsgepviq8jc4rt.jpg"
      ],
      "descripcionCorta": "Tanque cisterna para combustible montado sobre chasis de un eje con rompeolas interior y soporte para bomba.",
      "descripcionLarga": "Tanque cisterna para combustible montado sobre chasis de un eje con rompeolas interior y soporte para bomba. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Capacidad": "1.500 Litros",
          "Tanque": "Chapa de acero soldada",
          "Uso": "Combustible diésel"
      }
  },
  {
      "id": 193,
      "nombre": "Cinta Transportadora BG GIN 170 Cargador de Sembradora",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819968/rl5fhfzp3rczwjiq7wdb.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819968/rl5fhfzp3rczwjiq7wdb.jpg"
      ],
      "descripcionCorta": "Cargador con banda de goma vulcanizada en V de 170 mm para carga rápida de tolvas cuidando el poder germinativo.",
      "descripcionLarga": "Cargador con banda de goma vulcanizada en V de 170 mm para carga rápida de tolvas cuidando el poder germinativo. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Banda": "170 mm vulcanizada en V",
          "Rendimiento": "Hasta 45 Tn/h",
          "Accionamiento": "Motor orbital hidráulico"
      }
  },
  {
      "id": 194,
      "nombre": "Cinta Transportadora BG MAR-C 10",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819974/cnonfjm2thrc8qcvp8qk.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819974/cnonfjm2thrc8qcvp8qk.jpg"
      ],
      "descripcionCorta": "Cinta cargadora liviana de semillas y fertilizantes de fácil maniobra para un solo operario.",
      "descripcionLarga": "Cinta cargadora liviana de semillas y fertilizantes de fácil maniobra para un solo operario. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Ancho Banda": "100 / 160 mm",
          "Mando": "Hidráulico / Eléctrico / Explosión",
          "Tolva": "Bajo perfil"
      }
  },
  {
      "id": 195,
      "nombre": "Cinta Transportadora BG CO 40 de Bultos y Bolsas",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819960/bz0lr0bmfhveq8saujsq.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819960/bz0lr0bmfhveq8saujsq.jpg"
      ],
      "descripcionCorta": "Cinta transportadora con chasis cóncavo tipo cuna para estiba segura de bolsas de 50 kg y paquetes.",
      "descripcionLarga": "Cinta transportadora con chasis cóncavo tipo cuna para estiba segura de bolsas de 50 kg y paquetes. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Diseño": "Cuna cóncava anti-caída",
          "Capacidad": "Bolsas y bultos",
          "Largo": "6 a 12 metros"
      }
  },
  {
      "id": 196,
      "nombre": "Cinta Transportadora BG Multifunción Granel y Bolsas",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819974/cnonfjm2thrc8qcvp8qk.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819974/cnonfjm2thrc8qcvp8qk.jpg"
      ],
      "descripcionCorta": "Cinta versátil para movimiento combinado de granos sueltos y bultos en depósitos y plantas de acopio.",
      "descripcionLarga": "Cinta versátil para movimiento combinado de granos sueltos y bultos en depósitos y plantas de acopio. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Uso": "Cereal a granel y bolsas",
          "Banda": "Banda lisa / nervada",
          "Regulación": "Altura regulable"
      }
  },
  {
      "id": 197,
      "nombre": "Transportador BG de Pastura y Alimentos Húmedos",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819968/rl5fhfzp3rczwjiq7wdb.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819968/rl5fhfzp3rczwjiq7wdb.jpg"
      ],
      "descripcionCorta": "Transportador con laterales cerrados para forraje verde, silaje picado y alimentos balanceados húmedos.",
      "descripcionLarga": "Transportador con laterales cerrados para forraje verde, silaje picado y alimentos balanceados húmedos. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Aplicación": "Forraje y pastura picada",
          "Resistencia": "Anticorrosiva para humedad"
      }
  },
  {
      "id": 198,
      "nombre": "Plataforma Transportadora BG FLLIPER FLY 3000",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819965/o51cewo3lxqoy8f094tz.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819965/o51cewo3lxqoy8f094tz.jpg"
      ],
      "descripcionCorta": "Plataforma para descarga en altura desde autodescargables a camiones o silos con caudal superior a 80 Tn/h.",
      "descripcionLarga": "Plataforma para descarga en altura desde autodescargables a camiones o silos con caudal superior a 80 Tn/h. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Caudal": "> 80 Tn/h",
          "Tránsito": "Sin compactación de suelo",
          "Elevación": "Hidráulica"
      }
  },
  {
      "id": 199,
      "nombre": "Cinta Transportadora BG CAR-53 Alimentador Continuo",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819955/ajpvu6vjdlxuzxbmquom.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819955/ajpvu6vjdlxuzxbmquom.jpg"
      ],
      "descripcionCorta": "Alimentador continuo con batea extra ancha para embolsadoras de grano seco y forraje desde camiones.",
      "descripcionLarga": "Alimentador continuo con batea extra ancha para embolsadoras de grano seco y forraje desde camiones. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Uso": "Alimentación de embolsadoras",
          "Batea": "Extra ancha de bajo perfil"
      }
  },
  {
      "id": 200,
      "nombre": "Kit de Transformación de Chimango a Cinta BG",
      "categoria": "Herramientas",
      "marca": "Industrias BG",
      "estado": "Nuevo",
      "imagen": "https://res.cloudinary.com/pfskomq5/image/upload/v1788819971/vabbfdclk2fpanqxlihs.jpg",
      "imagenes": [
          "https://res.cloudinary.com/pfskomq5/image/upload/v1788819971/vabbfdclk2fpanqxlihs.jpg"
      ],
      "descripcionCorta": "Kit completo para transformar cualquier sinfín existente a cinta transportadora de goma y evitar roturas.",
      "descripcionLarga": "Kit completo para transformar cualquier sinfín existente a cinta transportadora de goma y evitar roturas. Equipo 0km oficial con garantía directa de fábrica. Consultar por planes de financiación y disponibilidad.",
      "especificaciones": {
          "Incluye": "Banda vulcanizada + Rolos engomados + Boca",
          "Compatibilidad": "Universal"
      }
  }
];
