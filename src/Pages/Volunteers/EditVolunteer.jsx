import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateVolunteer } from "../../Features/volunteerSlice";

function MyVerticallyCenteredModal({ show, onHide, volunteer }) {
  const dispatch = useDispatch();
  const [newvolunteer, setNewvolunteer] = useState({
    name: volunteer?.name,
    age: volunteer?.age,
    gender: volunteer?.gender,
    medicalHistory: volunteer?.medicalHistory,
    contact: volunteer?.contact,
    assignedWard: volunteer?.assignedWard,
    stayDuration: volunteer?.stayDuration,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewvolunteer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.prvolunteerDefault();

    const {
      name,
      age,
      gender,
      medicalHistory,
      contact,
      assignedWard,
      stayDuration,
    } = newvolunteer;

    const bool =
      name &&
      age &&
      gender &&
      medicalHistory &&
      contact &&
      assignedWard &&
      stayDuration;

    if (bool) {
      dispatch(updateVolunteer({ id: volunteer._id, newvolunteer }));
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
              value={newvolunteer.name}
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
              value={newvolunteer.age}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="gender">Gender: </label>
            <select
              value={newvolunteer.gender}
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
              value={newvolunteer.medicalHistory}
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
              value={newvolunteer.stayDuration}
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
              value={newvolunteer.contact}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button className="btn btn-dark mt-2">Edit volunteer</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditVolunteer = ({ volunteer }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        volunteer={volunteer}
      />
    </>
  );
};

export default EditVolunteer;
