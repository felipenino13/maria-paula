# María Paula — Invitación digital de quince años

## Contexto del proyecto

Este proyecto tiene como objetivo crear una tarjeta de invitación digital para la celebración de los quince años de María Paula. La tecnología indicada para su desarrollo es **vinext**.

La invitación debe transmitir elegancia y reflejar la preferencia de la cumpleañera por el **azul noche**, con elementos relacionados con **la luna y las flores**. En la carpeta `src/` hay fotografías suministradas como recursos para el diseño.

Este documento reúne el contexto inicial recibido el **20 de septiembre de 2026**, distingue los datos confirmados de las decisiones pendientes y sirve como base para el diseño y desarrollo posteriores.

## Información recibida del evento

| Dato | Información |
| --- | --- |
| Cumpleañera | María Paula |
| Celebración | Quince años |
| Fecha | 17 de octubre de 2026 |
| Lugar | Castilla Gourmet |
| Dirección | [Cra. 78 # 7D-30](https://www.google.com/maps/place/Castilla+Gourmet+Eventos/@4.6373098,-74.1445317,891m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e3f9d9f733179b1:0x9a4d3dadcc96ca9!8m2!3d4.6373045!4d-74.1419568!16s%2Fg%2F11h4y5hm2d?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D) |
| Ciudad | Bogotá |
| Hora de llegada e inicio | Pendiente de confirmar |
| Código de vestuario | Elegante |
| Colores reservados | Azul y negro para la quinceañera |
| Regalos | Lluvia de sobres |
| Preferencia de color para el diseño | Azul noche |
| Motivos visuales | La luna y flores |
| Canción elegida | [«Vals de amor», de Joan Sebastian](https://www.youtube.com/watch?v=3PuMsRrjvRc) |
| Confirmar asistencia | Whatsapp numero +57 Pendiente |
| Fecha limite para confirmar asistencia | Dato pendiente |

No se han proporcionado horario ni datos de confirmación de asistencia.

## Dirección visual inicial

- **Estilo:** elegante y acorde con una celebración de quince años.
- **Color principal:** azul noche, según la preferencia expresada por la cumpleañera.
- **Elementos:** luna y flores, integrados con las fotografías suministradas.
- **Fotografías:** seleccionar con la persona responsable cuáles usar como portada y cuáles, si aplica, en una galería.

Los colores complementarios, la tipografía, el tipo de flores, las animaciones y la composición aún están por definir. El negro aparece en la información sobre vestuario reservado; su uso como color del diseño no está confirmado.

## Recursos disponibles y estado actual

Al crear este README, el proyecto contiene la carpeta `src/` con **9 imágenes**: 8 archivos `.jpg` y 1 archivo `.jpeg`.

```text
maria-paula/
├── README.md
└── src/
    ├── WhatsApp Image 2026-09-20 at 9.14.12 AM-02.jpeg
    ├── WhatsApp-Image-2026-09-20-at-9.14-02.jpg
    ├── WhatsApp-Image-2026-09-20-at-9.14-03.jpg
    ├── WhatsApp-Image-2026-09-20-at-9.14-04.jpg
    ├── WhatsApp-Image-2026-09-20-at-9.14-05.jpg
    ├── WhatsApp-Image-2026-09-20-at-9.14-06.jpg
    ├── WhatsApp-Image-2026-09-20-at-9.14-07.jpg
    ├── WhatsApp-Image-2026-09-20-at-9.14-08.jpg
    └── WhatsApp-Image-2026-09-20-at-9.14-09.jpg
```

La primera versión utiliza las nueve fotografías como recuerdos de infancia en un collage interactivo. Los originales se conservan en `src/`; las versiones WebP se encuentran en `public/photos/` y suman aproximadamente 465 KiB. No se han generado ni alterado rostros.

**Estado técnico:** primera versión local implementada con vinext 1.0.0-beta.10, React 19, Vite 8 y TypeScript. Ver versiones exactas en `package-lock.json`. Configuración basada en la [documentación oficial de vinext](https://github.com/cloudflare/vinext).

**Alcance actual:** invitación navegable y adaptable a móvil, tableta y escritorio. No se ha publicado. Los textos emotivos son propuestas editoriales para aprobación; los datos del evento provienen de este documento.

## Primera versión de la tarjeta

Inspirada en `referentes/a6eb80e13dbc864c515554447b67fc58.jpg`: azul noche, flores azules, detalles plateados, luna y combinación de letras caligráficas y serif.

- Cinco escenas amplias con desplazamiento suave y navegación por capítulos: invitación, recuerdos, celebración, detalles y asistencia.
- Collage de nueve fotografías con visor ampliado, controles anterior/siguiente y cierre con Escape, botón o clic fuera de la fotografía. El foco regresa a la imagen seleccionada.
- Tipografías locales: Great Vibes, Cormorant Garamond y Montserrat; no dependen de Google Fonts en tiempo de ejecución.
- Ubicación enlazada al Google Maps suministrado y botón para copiar la dirección, con confirmación y alternativa si falla el portapapeles.
- Descarga de calendario `.ics` para el 17 de octubre de 2026 como evento de día completo, indicando expresamente que falta confirmar la hora.
- Contador de días hasta la fecha, calculado según Bogotá; no presupone hora de inicio.
- Código de vestuario elegante, reserva de azul y negro para la quinceañera y lluvia de sobres.
- Enlace explícito a «Vals de amor» en YouTube. No se descarga audio ni se reproduce automáticamente.
- Confirmación de asistencia deshabilitada con explicación visible hasta recibir número de WhatsApp y fecha límite.
- Respeto por la preferencia de movimiento reducido, navegación por teclado y enlace para saltar a los datos del evento.

### Recursos generados

Los fondos botánicos se generan con **`gpt-image-2`**, calidad alta, usando la clave local solo durante la generación. Las versiones optimizadas de uso web están en `public/images/`; los originales generados quedan en `output/imagegen/`. Las fotografías de María Paula no se enviaron al modelo: los fondos se generaron a partir de instrucciones de texto.

`.env.local` está excluido de Git y no se utiliza en el código de la invitación. No copiar la clave a variables con prefijo `VITE_` ni a archivos públicos.

### Ejecución local

Requiere Node.js compatible con Vite 8; verificado con Node.js 22.19.0.

```bash
npm install
npm run dev
```

Abrir `http://127.0.0.1:3000`.

```bash
npm run typecheck
npm run build
npm run start
```

Para usar `start`, detener primero el servidor de desarrollo si ocupa el mismo puerto.

### Archivos principales

| Archivo o carpeta | Propósito |
| --- | --- |
| `app/page.tsx` | Contenido, navegación, galería, calendario y acciones |
| `app/styles.css` | Diseño, escenas, collage y adaptación a pantallas |
| `app/layout.tsx` | Idioma, metadatos y fuentes locales |
| `public/photos/` | Fotografías optimizadas para la tarjeta |
| `public/images/` | Fondos botánicos generados y optimizados |
| `src/` | Fotografías originales, conservadas |
| `referentes/` | Referencia visual suministrada |
| `scripts/prepare-photos.py` | Regenerar WebP desde los originales; requiere Python y Pillow |
| `scripts/verify.mjs` | Comprobación funcional y capturas con Playwright y Edge local |

### Verificación

Ejecutar con el servidor encendido:

```bash
node scripts/verify.mjs
```

Comprueba anchos de 360, 390, 768 y 1440 px, ausencia de desbordamiento horizontal, carga de imágenes, galería y cierre, archivo de calendario, portapapeles y errores de navegador/HTTP. Capturas en `output/verification/` (no versionadas). Requiere Microsoft Edge instalado; puede apuntarse a otro servidor usando `TEST_URL`.

Estados cubiertos: contenido listo, datos pendientes, confirmación deshabilitada, éxito/error del portapapeles y galería abierta/cerrada. No hay formulario, envíos de asistencia, datos remotos ni procesamiento IA durante la visita; sus estados de carga, validación o streaming no aplican.

## Contenido propuesto para la tarjeta

La siguiente estructura es una propuesta inicial, pendiente de validar:

1. **Portada:** nombre de María Paula, mención de sus quince años y fotografía elegida.
2. **Mensaje de invitación:** texto de la cumpleañera o de su familia.
3. **Fecha, hora y lugar:** información del evento y acceso a la ubicación, una vez confirmada.
4. **Vestuario:** indicación de elegancia y explicación de los colores reservados.
5. **Regalos:** mensaje de lluvia de sobres.
6. **Confirmación de asistencia:** canal, fecha límite y condiciones por definir.
7. **Elementos opcionales:** galería, música, cuenta regresiva o agenda, únicamente si se solicitan.

## Preguntas para la persona responsable del evento

### Información necesaria para completar la invitación

1. ¿A qué hora deben llegar los invitados y a qué hora empieza la celebración? ¿Se debe indicar una hora de finalización?
2. La confirmación será por WhatsApp: ¿cuál es el número completo con indicativo, quién recibirá las respuestas y cuál es la fecha límite? ¿Puede incluirse ese número en el enlace de la tarjeta?
3. ¿La invitación será general o personalizada por invitado o familia? ¿Debe indicar nombres, número de cupos o condiciones para acompañantes y niños?

### Logística y entrega

4. ¿Hay información útil de parqueadero, acceso al lugar, accesibilidad o recomendaciones de llegada que debamos incluir?
5. ¿Aprueban los textos emotivos propuestos y el collage de las nueve fotos de infancia? ¿Desean incluir también una fotografía actual para la portada?
6. ¿Quién aprueba la versión final, para qué fecha debe estar lista y dónde se publicará?

## Criterios para continuar

- Usar la información confirmada como base y mantener los datos faltantes identificados como pendientes.
- No asumir ciudad, horarios, canción, contactos ni condiciones de asistencia.
- Mantener el vestuario elegante y la reserva de azul y negro para la quinceañera, según lo confirmado.
- Priorizar una lectura clara y cómoda en dispositivos móviles.
- Definir las funcionalidades y el destino de publicación con la persona responsable.
- Actualizar este README con las respuestas, decisiones aprobadas y comandos reales del proyecto a medida que avance la implementación.
