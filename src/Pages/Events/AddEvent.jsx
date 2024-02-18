import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

import { addEvent } from "../../Features/eventSlice";
import { useState } from "react";

const animatedComponents = makeAnimated();

const volunteerRoleOptions = [
  { label: "Photographer", value: "Photographer" },
  { label: "Security", value: "Security" },
  { label: "Crowd Handling", value: "Crowd Handling" },
  { label: "Child Taker", value: "Child Taker" },
];

function MyVerticallyCenteredModal({ show, onHide }) {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    roles: [
      {
        role: "",
        volunteersRequired: "",
      },
    ],
  });

  const handleRole = (value, index) => {
    const updatedRoles = event.roles.map((role, i) =>
      i === index
        ? { role: value, volunteersRequired: role.volunteersRequired }
        : role
    );
    setEvent((prev) => ({
      ...prev,
      roles: updatedRoles,
    }));
  };
  const handleVolunteersRequired = (value, index) => {
    const updatedVolunteersRequired = event.roles.map((singleRole, i) =>
      i === index
        ? { role: singleRole.role, volunteersRequired: value }
        : singleRole
    );
    setEvent((prev) => ({
      ...prev,
      roles: updatedVolunteersRequired,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, date, location, description, roles } = event;

    const bool =
      [name, date, location, description].every((a) => Boolean(a.trim())) &&
      roles.every(
        ({ role, volunteersRequired }) =>
          Boolean(role.trim()) && Boolean(volunteersRequired.toString())
      );

    if (bool) {
      dispatch(addEvent(event));
      onHide();
      setEvent({
        name: "",
        date: "",
        location: "",
        description: "",
        roles: [
          {
            role: "",
            volunteersRequired: "",
          },
        ],
      });
    } else {
      const conditions = {
        [!roles.every(
          ({ role, volunteersRequired }) =>
            Boolean(role.trim()) && Boolean(volunteersRequired.toString())
        )]: "Please enter role & required volunteers, else remove the role",
        [!Boolean(description.trim())]: "Please enter event description",
        [!Boolean(location.trim())]: "Please enter event location",
        [!Boolean(date.trim())]: "Please enter event date",
        [!Boolean(name.trim())]: "Please enter event name",
      };
      const error = conditions[true];
      if (error) {
        toast.error(error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-100 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <div className="d-flex flex-column w-100">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={event.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              value={event.date}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="location">Location: </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              value={event.location}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              value={event.description}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="volunteerRoles">Volunteer Roles:</label>
            {event.roles.map((role, index) => (
              <div className="d-flex gap-2 mb-2" key={index}>
                <input
                  className="w-100"
                  type="text"
                  placeholder="Role"
                  value={role.role}
                  onChange={(e) => handleRole(e.target.value, index)}
                  required
                />
                <input
                  className="w-100"
                  type="number"
                  min={1}
                  placeholder="volunteers required"
                  value={role.volunteersRequired}
                  onChange={(e) =>
                    handleVolunteersRequired(e.target.value, index)
                  }
                  required
                />
                {event.roles.length > 1 && (
                  <button
                    className="btn btn-dark"
                    style={{ width: "max-content" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setEvent((prev) => ({
                        ...prev,
                        roles: prev.roles.filter((r, i) => i !== index),
                      }));
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              className="btn btn-dark mt-1"
              style={{ width: "max-content" }}
              onClick={(e) => {
                e.preventDefault();
                setEvent((prev) => ({
                  ...prev,
                  roles: [...prev.roles, { role: "", volunteersRequired: "" }],
                }));
              }}
            >
              Add Role
            </button>
          </div>

          <button className="btn btn-dark mt-2">Add New Event</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const AddEvent = () => {
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
