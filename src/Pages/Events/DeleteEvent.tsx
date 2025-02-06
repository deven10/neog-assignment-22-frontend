import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../Features/eventSlice";
import { AppDispatch } from "../../Store/store";
import { Event } from "../../types/eventTypes";

function MyVerticallyCenteredModal({
  show,
  onHide,
  event,
}: {
  show: boolean;
  onHide: () => void;
  event: Event;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-75 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <h5>Delete event named "{event.name}"?</h5>
          <button
            className="btn btn-dark mt-2"
            onClick={() => event._id && dispatch(deleteEvent(event._id))}
          >
            Confirm Delete
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const DeleteEvent = ({ event }: { event: Event }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Delete
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
      />
    </>
  );
};

export default DeleteEvent;
