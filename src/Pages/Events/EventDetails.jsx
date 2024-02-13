import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({ show, onHide, event }) {
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Body className="text-center px-4">
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Name:
          </p>
          <p className="m-0">{event.name}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Date:
          </p>
          <p className="m-0">{event.date}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Location:
          </p>
          <p className="m-0">{event.location}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Description:
          </p>
          <p className="m-0">{event.description}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Volunteers Required:
          </p>
          <p className="m-0">{event.volunteersNumber} people</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Volunteer Roles:
          </p>
          <p className="m-0">{event.volunteerRoles}</p>
        </div>

        <button className="custom-btn mt-3" onClick={onHide}>
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
}

const EventDetails = ({ event }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Details
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
      />
    </>
  );
};

export default EventDetails;
