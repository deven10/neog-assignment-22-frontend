import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../Features/eventSlice";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const volunteerRoleOptions = [
  { label: "Photographer", value: "Photographer" },
  { label: "Security", value: "Security" },
  { label: "Crowd Handling", value: "Crowd Handling" },
  { label: "Child Taker", value: "Child Taker" },
];

function MyVerticallyCenteredModal({ show, onHide, oldEvent }) {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    name: oldEvent?.name,
    date: oldEvent?.date?.slice(0, 10),
    location: oldEvent?.location,
    description: oldEvent?.description,
    volunteersNumber: oldEvent?.volunteersNumber,
    volunteerRoles: oldEvent?.volunteerRoles?.map((role) => ({
      label: role,
      value: role,
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      date,
      location,
      description,
      volunteersNumber,
      volunteerRoles,
    } = event;

    const bool =
      [name, date, location, description].every((a) => {
        return Boolean(a?.trim());
      }) && volunteerRoles.length > 0;

    if (bool && volunteersNumber >= 0) {
      const newEventDetails = { ...event };
      delete newEventDetails.volunteerRoles;
      newEventDetails.volunteerRoles = event.volunteerRoles.map(
        (role) => role.value
      );

      dispatch(updateEvent({ id: oldEvent?._id, newEvent: newEventDetails }));
      onHide();
      setEvent({
        name: "",
        date: "",
        location: "",
        description: "",
        volunteersNumber: "",
        volunteerRoles: [],
      });
    } else {
      const conditions = {
        [!volunteerRoles?.length > 0]: "Please add atleast 1 volunteer role",
        [!Boolean(volunteersNumber?.trim())]:
          "Please enter required volunteer count",
        [!Boolean(description?.trim())]: "Please enter event description",
        [!Boolean(location?.trim())]: "Please enter event location",
        [!Boolean(date?.trim())]: "Please enter event date",
        [!Boolean(name?.trim())]: "Please enter event name",
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
            <label htmlFor="volunteersNumber">Volunteers Required:</label>
            <input
              type="number"
              id="volunteersNumber"
              name="volunteersNumber"
              placeholder="Volunteers Required"
              value={event.volunteersNumber}
              onChange={(e) => handleChange(e)}
              min={1}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="volunteerRoles">Volunteer Roles:</label>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={volunteerRoleOptions}
              isClearable
              onChange={(option) => {
                setEvent((prev) => ({
                  ...prev,
                  volunteerRoles: option,
                }));
              }}
              name="volunteerRoles"
              value={event.volunteerRoles}
              placeholder="Type something and press enter..."
            />
          </div>

          <button className="btn btn-dark mt-2">Edit Event</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditEvent = ({ event }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          console.log("event: ", event);
          setModalShow(true);
        }}
        className="custom-btn"
      >
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        oldEvent={event}
      />
    </>
  );
};

export default EditEvent;
