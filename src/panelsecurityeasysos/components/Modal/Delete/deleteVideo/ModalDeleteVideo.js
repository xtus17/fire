import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteVideo } from "./deleteVideo";
import "../../../../../../src/index.css";

export const ModalDeleteVideo = ({
  isModalDeleteVideo,
  setIsModalDeleteVideo,
  dataVideoDelete,
}) => {
  const [videosRec] = useState(""); //  const [videosRec, setvideosRec] = useState("");
  function deleteDataModal() {
    const videos = videosRec;

    const infoData = {
      videos,
    };

    setIsModalDeleteVideo(false);
    const id = dataVideoDelete.id;

    deleteVideo({ id, infoData });
  }

  return (
    <Modal
      className="modal"
      animation={true}
      show={isModalDeleteVideo}
      onHide={() => setIsModalDeleteVideo(false)}
    >
      <Modal.Header>
        <Modal.Title>Eliminar</Modal.Title>
      </Modal.Header>
      <Modal.Body>Estás seguro de eliminar los vídeos?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsModalDeleteVideo(false)}
        >
          Cancelar
        </Button>
        <Button variant="danger" onClick={deleteDataModal}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
