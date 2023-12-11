import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Term() {
  return (
    <>
      <Header />

      <Box>
        <Box py={20} px={20} paddingTop={"150px"} textAlign={"center"}>
          <Text fontSize={20} fontWeight={600}>
            TÉRMINOS Y CONDICIONES DE USO
          </Text>
        </Box>
      </Box>

      <Box py={5} px={20}>
        <Text fontWeight={"bold"} fontSize={"26px"}>
          <b>Última Actualización: 8 de Diciembre del 2023</b>
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          Bienvenido a EasySOS. Estos términos y condiciones de uso rigen tu
          acceso y uso de la aplicación. Al utilizar nuestra aplicación, aceptas
          los siguientes términos:
        </Text>
      </Box>

      <Box py={3} px={20} fontSize={"20px"}>
        <Text style={{ textDecoration: "underline" }}>
          <b> Recopilación y Uso de Datos Personales:</b>
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          Utilizamos tus datos personales para proporcionar y mejorar nuestro
          servicio. Al utilizar la aplicación EasySOS, aceptas la recopilación y
          el uso de información de acuerdo con nuestra Política de Privacidad.
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text style={{ textDecoration: "underline" }}>
          <b>Descripción de EasySOS:</b>
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          EasySOS es una aplicación que permite a los usuarios enviar informes
          de incidentes en la vía pública a través de fotos o videos grabados
          por sus propios dispositivos. Esta información es de interés público y
          social.
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text style={{ textDecoration: "underline" }}>
          <b>Datos Recopilados: </b>
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          La aplicación EasySOS recopila tu número telefónico únicamente para
          fines de autenticación. Para funcionamientos de alertas y reportes se
          recopila en segundo plano geolocalización precisa, nunca cuando la App
          está cerrada. Además, recopilamos datos de ubicación precisa
          (geolocalización) al utilizar funciones específicas para proporcionar
          referencias de incidentes en los informes enviados a las autoridades
          correspondientes. No recopilamos ni enviamos información de ubicación
          cuando la aplicación está cerrada o no está en uso.
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text style={{ textDecoration: "underline" }}>
          <b>Permisos de Ubicación:</b>
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          Si deniegas el permiso de ubicación, se limitará la experiencia de la
          aplicación y la capacidad de enviar informes a las autoridades
          correspondientes.
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text style={{ textDecoration: "underline" }}>
          <b>Contenido Multimedia:</b>
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          Fotos y videos enviados a través de EasySOS se mantendrán hasta que
          excedan la infraestructura tecnológica de la aplicación o hasta que
          las autoridades determinen lo contrario. Este contenido no se
          utilizará con fines comerciales ni se compartirá con terceros.
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text style={{ textDecoration: "underline" }}>
          <b>Privacidad de los Niños:</b>
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          EasySOS no está dirigido a menores de 13 años. No recopilamos
          intencionalmente información de identificación personal de menores de
          13 años. Si eres padre o tutor y crees que tu hijo nos ha
          proporcionado información personal, por favor contáctanos.
        </Text>
      </Box>

      <Box py={3} px={20}>
        <Text>
          <b>Contáctenos</b>
        </Text>
        <Text>
          Si tiene alguna pregunta sobre esta Política de privacidad, puede
          contactarnos: Por correo electrónico:{" "}
          <b>easysosseguridad@gmail.com</b>.
        </Text>
      </Box>

      <Footer />
    </>
  );
}
