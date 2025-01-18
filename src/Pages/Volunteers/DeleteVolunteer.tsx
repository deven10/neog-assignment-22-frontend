import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteVolunteer } from "../../Features/volunteerSlice";

function MyVerticallyCenteredModal({ show, onHide, volunteer }) {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-75 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <h5>Delete volunteer named "{volunteer.name}"?</h5>
          <button
            className="btn btn-dark mt-2"
            onClick={() => dispatch(deleteVolunteer(volunteer._id))}
          >
            Confirm Delete
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const DeleteVolunteer = ({ volunteer }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Delete
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        volunteer={volunteer}
      />
    </>
  );
};

export default DeleteVolunteer;
