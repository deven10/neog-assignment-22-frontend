import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../Features/eventSlice";

function MyVerticallyCenteredModal({ show, onHide, event }) {
  const dispatch = useDispatch();
  const [newevent, setNewevent] = useState({
    name: event?.name,
    age: event?.age,
    gender: event?.gender,
    medicalHistory: event?.medicalHistory,
    contact: event?.contact,
    assignedWard: event?.assignedWard,
    stayDuration: event?.stayDuration,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewevent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      age,
      gender,
      medicalHistory,
      contact,
      assignedWard,
      stayDuration,
    } = newevent;

    const bool =
      name &&
      age &&
      gender &&
      medicalHistory &&
      contact &&
      assignedWard &&
      stayDuration;

    if (bool) {
      dispatch(updateEvent({ id: event._id, newevent }));
      onHide();
    } else {
      toast.error("Fill all the fields!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-75 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <div className="d-flex flex-column w-100">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={newevent.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={newevent.age}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="gender">Gender: </label>
            <select value={newevent.gender} onChange={(e) => handleChange(e)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="medicalHistory">Medical History: </label>
            <input
              type="text"
              id="medicalHistory"
              name="medicalHistory"
              placeholder="Medical History"
              value={newevent.medicalHistory}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="stayDuration">Stay Duration: </label>
            <input
              type="number"
              id="stayDuration"
              name="stayDuration"
              placeholder="Stay Duration"
              value={newevent.stayDuration}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="contact">Contact: </label>
            <input
              type="number"
              id="contact"
              name="contact"
              placeholder="Marks"
              value={newevent.contact}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button className="btn btn-dark mt-2">Edit event</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditEvent = ({ event }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
      />
    </>
  );
};

export default EditEvent;
