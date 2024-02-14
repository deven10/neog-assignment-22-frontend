import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { formatDate } from "../../../utils/utilityFunctions";

function MyVerticallyCenteredModal({ show, onHide, event }) {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body className="text-center px-4">
        <div className="d-flex justify-content-start gap-2">
          <h3 className="m-0" style={{ fontWeight: "600" }}>
            {event.name}
          </h3>
        </div>
        <div className="d-flex justify-content-start gap-2 mt-3">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Date:
          </p>
          <p className="m-0">{formatDate(event.date)}</p>
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Location:
          </p>
          <p className="m-0">{event.location}</p>
        </div>
        <div className="text-start d-flex flex-column justify-content-start align-items-start mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Description:
          </p>
          <p className="m-0">{event.description}</p>
        </div>
        <div className="d-flex justify-content-start gap-2 mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Volunteers Required:
          </p>
          <p className="m-0">{event.volunteersNumber} people</p>
        </div>
        <div className="text-start d-flex flex-column justify-content-start mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Volunteer Roles:
          </p>
          <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
            {event?.volunteerRoles?.map((role) => (
              <p className="m-0 role badge" key={role}>
                {role}
              </p>
            ))}
          </div>
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
