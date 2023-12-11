import React, { useEffect, useState } from "react";
import { HeaderEasySOS } from "./HeaderEasySOS";
import { db } from "../firebase";
import {
  FaPen,
  FaImage,
  FaBan,
  FaGlobe,
  FaTrash,
  FaPaperclip,
} from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { BiVideo } from "react-icons/bi";
import {
  useColorModeValue,
  Tooltip,
  SimpleGrid,
  Button,
  Input,
  HStack,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
} from "@chakra-ui/react";
import { ModalAdd } from "./Modal/Add/ModalAdd";
import { ModalDelete } from "./Modal/Delete/ModalDelete";
import { ModalEdit } from "./Modal/Edit/ModalEdit";
import { ModalEditLocation } from "./Modal/Edit/EditLocation/ModalEditLocation";
import { ModalDeleteFiles } from "./Modal/Delete/deleteFiles/ModalDeleteFiles";
import { ModalDeleteVideo } from "./Modal/Delete/deleteVideo/ModalDeleteVideo";
import { ModalDeleteAudio } from "./Modal/Delete/deleteAudio/ModalDeleteAudio";

function searchingTerm(term) {
  return function (x) {
    return (
      x.delito.toLowerCase().includes(term) ||
      x.direccion.toLowerCase().includes(term) ||
      x.descripcion.toLowerCase().includes(term) ||
      !term
    );
  };
}

export const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [searchs, setSearchs] = useState([]); //  const [searchs, setSearchs] = useState([]);
  const [term, setTerm] = useState([]);
  const [editar, setEditar] = useState([]);
  const [eliminar, setEliminar] = useState([]);
  const [editarLocation, setEditarLocation] = useState([]);
  const [isModalEditar, setIsModalEditar] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalDeleteLocation, setIsModalDeleteLocation] = useState(false);
  const [isModalDeleteFiles, setIsModalDeleteFiles] = useState(false);
  const [isModalDeleteVideo, setIsModalDeleteVideo] = useState(false);
  const [dataFilesDelete, setDataFilesDelete] = useState([]);
  const [dataVideoDelete, setDataVideoDelete] = useState([]);
  const [dataAudioDelete, setDataAudioDelete] = useState([]);
  const [isModalDeleteAudio, setIsModalDeleteAudio] = useState(false);

  const add = () => {
    setOpen(true);
  };

  useEffect(() => {
    setSearchs(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // }, [data]);

  const getData = () => {
    db.collection("tangamandapio")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });
        setData(array);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <HeaderEasySOS />

      <ModalAdd setOpen={setOpen} open={open} />
      <ModalDelete
        isModalDelete={isModalDelete}
        setIsModalDelete={setIsModalDelete}
        eliminar={eliminar}
      />

      <ModalEditLocation
        setIsModalDeleteLocation={setIsModalDeleteLocation}
        isModalDeleteLocation={isModalDeleteLocation}
        editarLocation={editarLocation}
      />

      {editar && (
        <ModalEdit
          isModalEditar={isModalEditar}
          setIsModalEditar={setIsModalEditar}
          editar={editar}
        />
      )}

      <ModalDeleteFiles
        isModalDeleteFiles={isModalDeleteFiles}
        setIsModalDeleteFiles={setIsModalDeleteFiles}
        dataFilesDelete={dataFilesDelete}
      />

      <ModalDeleteVideo
        isModalDeleteVideo={isModalDeleteVideo}
        setIsModalDeleteVideo={setIsModalDeleteVideo}
        dataVideoDelete={dataVideoDelete}
      />

      <ModalDeleteAudio
        isModalDeleteAudio={isModalDeleteAudio}
        setIsModalDeleteAudio={setIsModalDeleteAudio}
        dataAudioDelete={dataAudioDelete}
      />

      <form>
        <HStack pt={12} px={10}>
          <Flex pt={8} flex={1} justify="center">
            <Input
              type="text"
              name="term"
              autoFocus
              placeholder="Buscar por Delito, Descripción, Dirección"
              onChange={(e) => setTerm(e.target.value)}
            />
          </Flex>
        </HStack>
      </form>

      <HStack pt={7} pb={6} px={10}>
        <Button
          leftIcon={<IoIosAddCircle />}
          onClick={add}
          fontSize={"sm"}
          fontWeight={600}
          colorScheme="teal"
          variant="solid"
          type="submit"
          w={180}
        >
          Nueva Emergencia
        </Button>
      </HStack>

      <HStack pt={5} pb={2} px={2}>
        <Table bg={useColorModeValue("#CED8E2", "#22394A")}>
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Descripción</th>
              <th>Imágenes</th>
              <th>Vídeo</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <Tbody>
            {data.filter(searchingTerm(term)).map((datas, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{datefecha(datas.date).slice(1, -1)}</Td>
                <Td>{datas.delito}</Td>
                <Td>{datas.direccion}</Td>
                <Td>{datas.descripcion}</Td>
                <Td>{links(datas.images)}</Td>
                <Td>{link(datas.videos)}</Td>
                <Td>{datas.type}</Td>

                <Td>
                  <SimpleGrid columns={3} spacingX="25px" spacingY="5px">
                    <Tooltip label="Editar" placement="left">
                      <Box position={"relative"} color={"white"}>
                        <Button
                          size="sm"
                          bg="white"
                          color="black"
                          onClick={() => {
                            setIsModalEditar(true);
                            setEditar({ ...datas });
                          }}
                        >
                          <FaPen />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip label="Eliminar" placement="top">
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          color="white"
                          bg="red"
                          onClick={() => {
                            setIsModalDelete(true);
                            setEliminar(datas);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip
                      label="Eliminar imágenes adjuntos"
                      placement="top-start"
                    >
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          color="white"
                          bg="black"
                          onClick={() => {
                            setIsModalDeleteFiles(true);
                            setDataFilesDelete(datas);
                          }}
                        >
                          <FaPaperclip color="white" />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip label="Eliminar audio" placement="bottom">
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          color="white"
                          bg="black"
                          onClick={() => {
                            setIsModalDeleteAudio(true);
                            setDataAudioDelete(datas);
                          }}
                        >
                          <FaPaperclip color="white" />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip label="Editar dirección" placement="bottom">
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          color="green"
                          bg="yellow"
                          onClick={() => {
                            setIsModalDeleteLocation(true);
                            setEditarLocation(datas);
                          }}
                        >
                          <FaGlobe />
                        </Button>
                      </Box>
                    </Tooltip>

                    <Tooltip label="Eliminar video" placement="bottom">
                      <Box position={"relative"}>
                        <Button
                          size="sm"
                          bg="blue"
                          onClick={() => {
                            setIsModalDeleteVideo(true);
                            setDataVideoDelete(datas);
                          }}
                        >
                          <FaBan color="white" />
                        </Button>
                      </Box>
                    </Tooltip>
                  </SimpleGrid>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </HStack>
    </Box>
  );
};

function datefecha(seconds) {
  let fechador;
  var months = [
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

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  var date = new Date(seconds.seconds * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var nameday = days[date.getDay()];
  var day = date.getDate();
  var formattedTime =
    nameday +
    " " +
    day +
    " " +
    month +
    " " +
    year +
    " " +
    hours +
    ":" +
    minutes.slice(-2) +
    ":" +
    second.slice(-2);

  let formatdate = JSON.stringify(formattedTime);
  fechador = formatdate;
  return fechador;
}

function links(images) {
  if (images.length !== 0) {
    var imgFirst = images[0];
    var imgSecond = images[1];

    if (images.length !== 1) {
      return (
        <>
          <a target="_blank" rel="noreferrer" href={imgFirst}>
            <FaImage />
          </a>
          &nbsp;&nbsp;
          <a target="_blank" rel="noreferrer" href={imgSecond}>
            <FaImage />
          </a>
        </>
      );
    } else {
      return (
        <>
          <a target="_blank" rel="noreferrer" href={imgFirst}>
            <FaImage />
          </a>
        </>
      );
    }
  }
}

function link(videos) {
  if (videos.length !== 0) {
    var video = videos[0];
    return (
      <>
        <a target="_blank" rel="noreferrer" href={video}>
          <BiVideo />
        </a>
      </>
    );
  }
}
