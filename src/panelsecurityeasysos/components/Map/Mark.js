import React from "react";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AiOutlineCalendar } from "react-icons/ai";
//import "../../Module.css";

export function Mark(props) {
  const { lat, lng, delito, key, daynumber, monthname, year, day } = props;

  function typeIcon(delito) {
    let size = "";
    if (delito === "Asesinato") {
      size = "Asesinato";
    } else if (delito === "Agresión Sexual") {
      size = "Agresion";
    } else if (delito === "Persona Desaparecida") {
      size = "Persona";
    } else if (delito === "Robo") {
      size = "Robo";
    } else if (delito === "Vandalismo") {
      size = "Vandalismo";
    } else if (delito === "Violencia Familiar") {
      size = "Violencia";
    } else if (delito === "Otro") {
      size = "Otro";
    }

    const options = {
      cluster: `clusterIcon${size}`,
    };

    return L.divIcon({
      className: `${options.cluster}`,
      iconSize: 25,
    });
  }

  return (
    <>
      <Marker
        position={{
          lat: lat,
          lng: lng,
        }}
        icon={typeIcon(delito)}
        key={key}
      >
        <Popup>
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            <AiOutlineCalendar /> {day}, {daynumber} de {monthname} del {year},{" "}
            {delito}
          </div>
        </Popup>
      </Marker>
    </>
  );
}
