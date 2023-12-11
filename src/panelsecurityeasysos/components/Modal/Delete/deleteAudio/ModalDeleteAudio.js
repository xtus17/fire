import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteAudio } from "../deleteAudio/deleteAudio";

export const ModalDeleteAudio = ({
  isModalDeleteAudio,
  setIsModalDeleteAudio,
  dataAudioDelete,
}) => {
  const [audioMp3] = useState(""); // const [audioMp3, setaudioMp3] = useState("");

  function deleteDataModal() {
    const audio = audioMp3;

    const infoData = {
      audio,
    };

    setIsModalDeleteAudio(false);
    const id = dataAudioDelete.id;
    deleteAudio({ id, infoData });
  }

  return (
    <div>
      <Modal
        show={isModalDeleteAudio}
        onHide={() => setIsModalDeleteAudio(false)}
      >
        <Modal.Header>
          <Modal.Title>Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estás seguro de eliminar el audio de emergencia?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsModalDeleteAudio(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteDataModal}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
