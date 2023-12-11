import React, { useState } from "react";
import { Modal, Stack, Button, Form, Dropdown, Row } from "react-bootstrap";
import addData from "./addData";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { v4 as uuid } from "uuid";

export const ModalAdd = ({ open, setOpen }) => {
  const center = { lat: -11.1043861, lng: -77.6069797 };
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [image] = useState(""); //  const [image, setImage] = useState("");
  const [video] = useState(""); //  const [video, setVideo] = useState("");
  const [audioMp3] = useState(""); //  const [audioMp3, setAudioMp3] = useState("");
  const [telefono] = useState(""); //  const [telefono, setTelefono] = useState("");

  const searchOptions = {
    bounds: defaultBounds,
    componentRestrictions: { country: "PE" },
  };

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      state: ["administrative_area_level_1"],
      province: ["administrative_area_level_2"],
      city: ["locality"],
      country: ["country"],
    };

    let address = {
      province: "",
      city: "",
      country: "",
      state: "",
    };

    address_components.forEach((result) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(result.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = result.short_name;
          } else {
            address[shouldBe] = result.long_name;
          }
        }
      }
    });

    let addressCity = address.city;
    let prevProvince = address.province;
    let addressProvince = prevProvince.split(" ").splice(-1)[0];
    let prevState = address.state;
    let addressState = prevState.split(" ").splice(-1)[0];

    const object = addressCity + ", " + addressProvince + ", " + addressState;
    return object;
  };

  const handleSelect = async (value) => {
    const res = await geocodeByAddress(value);

    const result = res[0].address_components;

    const geo = getAddressObject(result);

    let coor = await getLatLng(res[0]);

    const location = {
      latitude: coor.lat,
      longitude: coor.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    const dir = value + "; " + geo;
    const geoCity = geo.split(",")[0];
    const geoProvince = geo.split(",")[1];
    const geoState = geo.split(",")[2];

    setAddress(dir);
    setCoordinates(location);

    setCiudad(geoCity);
    setProvincia(geoProvince);
    setDepartamento(geoState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];

      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const id = uuid();
      const dateCreate = document.getElementById("dateCreate").value;
      const delito = document.getElementById("delito").value;
      const descripcion = document.getElementById("descripcion").value;
      const response = document.getElementById("response").value;
      const type = "CentralAlert";
      const images = image;
      const videos = video;
      const audio = audioMp3;
      const phone = telefono;
      const fecha = document.getElementById("fecha").value;
      const date = new Date(fecha);
      const daynumber = date.getDate();
      const day = dias[date.getDay()];
      const monthname = meses[date.getMonth()];
      const month = date.getMonth() + 1;
      const year = date.getUTCFullYear();
      const hour = date.toLocaleTimeString();
      const direccion = address;
      const location = coordinates;
      const city = ciudad;
      const province = provincia.slice(1);
      const state = departamento.slice(1);
      const hourexacly = date.toLocaleTimeString().slice(0, 2);

      if (city === "") {
      } else {
        setAddress("");

        const infoData = {
          id,
          audio,
          phone,
          location,
          province,
          state,
          direccion,
          city,
          response,
          descripcion,
          type,
          images,
          videos,
          dateCreate,
          fecha,
          delito,
          daynumber,
          date,
          day,
          month,
          monthname,
          hour,
          year,
          hourexacly,
        };

        setOpen(false);
        addData(infoData);
      }
    } catch (error) {}
  };

  const handleHour = () => {
    const date = Date.now();
    const newdate = new Date(date);
    return newdate;
  };

  return (
    <div>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Agregar Emergencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Row />
                <Form.Control
                  required
                  id="fecha"
                  type="datetime-local"
                  className="mb-2"
                />
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Select
                  id="delito"
                  aria-label="select"
                  required="aria-required"
                  className="mb-2"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Vandalismo">Vandalismo</option>
                  <option value="Violencia Familiar">Violencia Familiar</option>
                  <option value="Asesinato">Asesinato</option>
                  <option value="Robo">Robo</option>
                  <option value="Agresión Sexual">Agresión Sexual</option>
                  <option value="Persona Desaparecida">
                    Persona Desaparecida
                  </option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Control
                  id="descripcion"
                  placeholder="Descripción"
                  type="text"
                  className="mb-2"
                  as="textarea"
                  rows={3}
                  autocomplete="off"
                  required
                  minLength={10}
                />
              </Form.Group>

              <Form.Group>
                <Row />
                <Form.Control
                  id="response"
                  placeholder="Respuesta"
                  type="text"
                  className="mb-2"
                />
              </Form.Group>

              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
                searchOptions={searchOptions}
                shouldFetchSuggestions={address.length > 8}
                debounce={2500}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <Row />
                    <Form.Control
                      {...getInputProps({
                        placeholder:
                          "Ingresa una dirección válida y espera 2 seg",
                        className: "mb-2",
                        required: "aria-required",
                      })}
                    ></Form.Control>

                    <>
                      {loading && (
                        <div className="relative inline-block">Cargando...</div>
                      )}
                      <Dropdown>
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? { backgroundColor: "#CFE2FF", cursor: "pointer" }
                            : { backgroundColor: "white", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </Dropdown>
                    </>
                  </div>
                )}
              </PlacesAutocomplete>

              <br />

              <Modal.Footer>
                <Button
                  className="md-3"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="text-center mt-4 mb-4"
                  variant="primary"
                  id="dateCreate"
                  value={handleHour()}
                  type="submit"
                >
                  Guardar
                </Button>
              </Modal.Footer>
            </Form>
          </Stack>
        </Modal.Body>
      </Modal>
    </div>
  );
};
