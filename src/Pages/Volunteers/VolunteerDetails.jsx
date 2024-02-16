import { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/utilityFunctions";

function MyVerticallyCenteredModal({ show, onHide, volunteer }) {
  const { events } = useSelector((state) => state?.events);

  const volunteerEvents = useMemo(() => {
    const data = events?.filter((event) =>
      volunteer?.events?.includes(event._id)
    );
    return data;
  }, [events, volunteer]);

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body className="text-center px-4">
        <div className="d-flex justify-content-start gap-2 mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Name:
          </p>
          <p className="m-0">{volunteer?.name}</p>
        </div>
        <div className="d-flex justify-content-start gap-2 mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Contact:
          </p>
          <p className="m-0">{volunteer?.contact}</p>
        </div>
        <div className="d-flex justify-content-start gap-2 mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Availability:
          </p>
          <p className="m-0">{volunteer?.availability}</p>
        </div>
        <div className="text-start d-flex flex-column justify-content-start mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Skills:
          </p>
          <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
            {volunteer.skills?.map((skill) => (
              <p className="m-0 role badge" key={skill}>
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="text-start d-flex flex-column justify-content-start mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Roles:
          </p>
          <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
            {volunteer.roles?.map((role) => (
              <p className="m-0 role badge" key={role}>
                {role}
              </p>
            ))}
          </div>
        </div>
        <div className="text-start d-flex flex-column justify-content-start mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Interests:
          </p>
          <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
            {volunteer.interests?.map((interest) => (
              <p className="m-0 role badge" key={interest}>
                {interest}
              </p>
            ))}
          </div>
        </div>
        <div className="text-start d-flex flex-column justify-content-start mt-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Events:
          </p>
          <ul className="mt-1">
            {volunteerEvents?.map((event) => (
              <li key={event}>
                <h5 className="m-0" style={{ fontWeight: "600" }}>
                  {event.name}
                </h5>
                <p className="m-0">Date: {formatDate(event?.date)}</p>
                <p className="m-0">Location: {event?.location}</p>
              </li>
            ))}
          </ul>
        </div>

        <button className="custom-btn mt-3" onClick={onHide}>
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
}

const VolunteerDetails = ({ volunteer }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setModalShow(true);
        }}
        className="custom-btn"
      >
        Details
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        volunteer={volunteer}
      />
    </>
  );
};

export default VolunteerDetails;
