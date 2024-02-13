import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { addEvent } from "../../Features/eventSlice";
import { useState } from "react";

function MyVerticallyCenteredModal({ show, onHide }) {
  const dispatch = useDispatch();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
    contact: "",
    assignedWard: "",
    stayDuration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
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
    } = patient;

    const bool =
      name &&
      age &&
      gender &&
      medicalHistory &&
      contact &&
      assignedWard &&
      stayDuration;

    if (bool) {
      dispatch(addEvent(patient));
      onHide();
      setPatient({
        name: "",
        age: "",
        gender: "",
        medicalHistory: "",
        contact: "",
        assignedWard: "",
        stayDuration: "",
      });
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
              value={patient.name}
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
              value={patient.age}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="gender">Gender: </label>
            <select
              name="gender"
              value={patient.gender}
              onChange={(e) => handleChange(e)}
            >
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
              value={patient.medicalHistory}
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
              value={patient.stayDuration}
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
              placeholder="Contact"
              value={patient.contact}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button className="btn btn-dark mt-2">Add New Patient</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const AddEvent = ({}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Add New Event
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddEvent;
