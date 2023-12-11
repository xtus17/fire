import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Modal, Stack, Button, Form, Row } from "react-bootstrap";
//import "../../Module.css";
import toast, { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Mark } from "./Mark";
import L from "leaflet";

export const Map = () => {
  const [dataInfo, setDataInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [colorMode, setColorMode] = useState("light");

  const ref = useRef(null);
  const light =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  const dark =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  const changeMode = () => {
    setColorMode((colorMode) => (colorMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(colorMode === "light" ? light : dark);
    }
  }, [colorMode]);

  let readData = "";
  const noSelect = "";
  var typeDelito = 0;
  var typeDia = 0;
  var typeMes = 0;
  var typeAno = 0;
  var typeTotal = 0;
  var t = 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDelito = document.getElementById("delito").value;
    const currentDia = document.getElementById("dia").value;
    const currentMes = document.getElementById("mes").value;
    var currentAno = document.getElementById("ano").value;

    const notify = () => toast("Los filtros son inválidos");

    if (currentDelito) {
      typeDelito = 1;
    }
    if (currentDia) {
      typeDia = 2;
    }
    if (currentMes) {
      typeMes = 4;
    }
    if (currentAno) {
      typeAno = 8;
    }

    typeTotal =
      parseInt(typeDelito) +
      parseInt(typeDia) +
      parseInt(typeMes) +
      parseInt(typeAno);

    t = parseInt(typeTotal);

    if (t === 1) {
      readData = query(
        collection(db, "tangamandapio"),
        where("delito", "==", currentDelito)
      );
    } else if (t === 2) {
      readData = query(
        collection(db, "tangamandapio"),
        where("day", "==", currentDia)
      );
    } else if (t === 3) {
      readData = query(
        collection(db, "tangamandapio"),
        where("delito", "==", currentDelito),
        where("day", "==", currentDia)
      );
    } else if (t === 4) {
      readData = query(
        collection(db, "tangamandapio"),
        where("monthname", "==", currentMes)
      );
    } else if (t === 5) {
      readData = query(
        collection(db, "tangamandapio"),
        where("delito", "==", currentDelito),
        where("monthname", "==", currentMes)
      );
    } else if (t === 6) {
      readData = query(
        collection(db, "tangamandapio"),
        where("day", "==", currentDia),
        where("monthname", "==", currentMes)
      );
    } else if (t === 8) {
      currentAno = parseInt(currentAno);
      readData = query(
        collection(db, "tangamandapio"),
        where("year", "==", currentAno)
      );
    } else if (t === 9) {
      currentAno = parseInt(currentAno);
      readData = query(
        collection(db, "tangamandapio"),
        where("delito", "==", currentDelito),
        where("year", "==", currentAno)
      );
    } else if (t === 10) {
      currentAno = parseInt(currentAno);
      readData = query(
        collection(db, "tangamandapio"),
        where("day", "==", currentDia),
        where("year", "==", currentAno)
      );
    } else if (t === 12) {
      currentAno = parseInt(currentAno);
      readData = query(
        collection(db, "tangamandapio"),
        where("monthname", "==", currentMes),
        where("year", "==", currentAno)
      );
    } else if (t === 13) {
      currentAno = parseInt(currentAno);
      readData = query(
        collection(db, "tangamandapio"),
        where("delito", "==", currentDelito),
        where("year", "==", currentAno),
        where("monthname", "==", currentMes)
      );
    } else {
      notify();
    }

    onSnapshot(readData, (snapshot) => {
      setDataInfo(snapshot.docs.map((d) => ({ ...d.data() })));
    });
    setOpen(false);
  };

  useEffect(() => {
    if (noSelect === "") {
      readData = query(collection(db, "tangamandapio"));
    }
    onSnapshot(readData, (snapshot) => {
      setDataInfo(snapshot.docs.map((d) => ({ ...d.data() })));
    });
  }, [noSelect]);

  const add = () => {
    setOpen(true);
  };

  const containerStyle = {
    width: "100%",
    height: "91.8vh",
    position: "fixed",
  };

  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    let size = "LargeXL";

    if (count < 10) {
      size = "Small";
    } else if (count >= 10 && count < 100) {
      size = "Medium";
    } else if (count >= 100 && count < 500) {
      size = "Large";
    }
    const options = {
      cluster: `markerCluster${size}`,
    };

    return L.divIcon({
      html: `<div>
          <span class="markerClusterLabel">${count}</span>
        </div>`,
      className: `${options.cluster}`,
      iconSize: L.point(35, 35, true),
    });
  };

  const center = {
    lat: -11.1050503,
    lng: -77.606014,
  };

  return (
    <>
      <div
        style={{
          marginLeft: "10px",
        }}
      >
        <Button
          style={{
            position: "absolute",
            zIndex: "1",
            marginTop: "100px",
          }}
          onClick={add}
        >
          Filtrar
        </Button>

        <Button
          style={{
            position: "absolute",
            zIndex: "1",
            marginTop: "350px",
          }}
          onClick={changeMode}
        >
          Modo Oscuro
        </Button>

        <Toaster />
      </div>

      <div
        style={{
          marginLeft: "10px",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            marginTop: "150px",
          }}
        >
          <Row />
          Asesinato{" "}
          <img
            src="https://img.icons8.com/ios-filled/25/000000/crime.png"
            alt="Central Asesinato"
            style={{
              width: "15px",
            }}
          />
          <Row />
          Agresión Sexual{" "}
          <img
            src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/25/000000/external-settings-coding-kiranshastry-lineal-color-kiranshastry.png"
            alt="Central Agresion"
            style={{
              width: "15px",
            }}
          />
          <Row />
          Persona Desaparecida{" "}
          <img
            src="https://img.icons8.com/external-glyph-on-circles-amoghdesign/25/000000/external-communication-law-crime-and-justice-glyph-on-circles-amoghdesign.png"
            alt="Central Desaparecida"
            style={{
              width: "15px",
            }}
          />
          <Row />
          Robo{" "}
          <img
            src="https://img.icons8.com/color/25/000000/fat-cop.png"
            alt="Central Robo"
            style={{
              width: "15px",
            }}
          />
          <Row />
          Vandalismo{" "}
          <img
            src="https://img.icons8.com/emoji/25/000000/police-car-light.png"
            alt="Central Vandalismo"
            style={{
              width: "15px",
            }}
          />
          <Row />
          Violencia Familiar{" "}
          <img
            src="https://img.icons8.com/color/25/000000/slr-camera.png"
            alt="Central Violencia"
            style={{
              width: "15px",
            }}
          />
          <Row />
          Otro{" "}
          <img
            src="https://img.icons8.com/external-others-iconmarket/25/000000/external-marker-user-interface-others-iconmarket.png"
            alt="Central Otro"
            style={{
              width: "15px",
            }}
          />
        </div>
      </div>
















      
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Filtrar Delito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Row />
                <Form.Select id="delito" aria-label="select" className="mb-2">
                  <option value="">Selecciona un delito</option>
                  <option value="Asesinato">Asesinato</option>
                  <option value="Agresión Sexual">Agresión Sexual</option>
                  <option value="Persona Desaparecida">
                    Persona Desaparecida
                  </option>
                  <option value="Robo">Robo</option>
                  <option value="Vandalismo">Vandalismo</option>
                  <option value="Violencia Familiar">Violencia Familiar</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>

              <Row />

              <Form.Group>
                <Row />
                <Form.Select id="dia" aria-label="select" className="mb-2">
                  <option value="">Selecciona un día</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sábado">Sábado</option>
                  <option value="Domingo">Domingo</option>
                </Form.Select>
              </Form.Group>

              <Row />

              <Form.Group>
                <Row />
                <Form.Select id="mes" aria-label="select" className="mb-2">
                  <option value="">Selecciona un mes</option>
                  <option value="Enero">Enero</option>
                  <option value="Febrero">Febrero</option>
                  <option value="Marzo">Marzo</option>
                  <option value="Abril">Abril</option>
                  <option value="Mayo">Mayo</option>
                  <option value="Junio">Junio</option>
                  <option value="Julio">Julio</option>
                  <option value="Agosto">Agosto</option>
                  <option value="Setiembre">Setiembre</option>
                  <option value="Octubre">Octubre</option>
                  <option value="Noviembre">Noviembre</option>
                  <option value="Diciembre">Diciembre</option>
                </Form.Select>
              </Form.Group>

              <Row />

              <Form.Group>
                <Row />
                <input
                  id="ano"
                  className="mb-2"
                  class="form-control"
                  placeholder="Selecciona un año"
                  type="number"
                  min="2022"
                  max="2300"
                />
              </Form.Group>

              <Modal.Footer>
                <Button
                  className="md-2"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="text-center mt-2 mb-2"
                  variant="primary"
                  type="submit"
                >
                  Filtrar
                </Button>
              </Modal.Footer>
            </Form>
          </Stack>
        </Modal.Body>
      </Modal>



























      <MapContainer style={containerStyle} center={center} zoom={13}>
        <TileLayer
          ref={ref}
          url={colorMode === "light" ? light : dark}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

     


<MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          polygonOptions={{
            fillColor: "black",
            color: "#f00800",
            weight: 5,
            opacity: 1,
            fillOpacity: 0.8,
          }}
        >
         
        </MarkerClusterGroup>



      </MapContainer>

    </>
  );
};
