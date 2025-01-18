import { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

import { addVolunteer } from "../../Features/volunteerSlice";

const volunteerRoleOptions = [
  { label: "Photographer", value: "Photographer" },
  { label: "Security", value: "Security" },
  { label: "Crowd Handling", value: "Crowd Handling" },
  { label: "Child Taker", value: "Child Taker" },
];

function MyVerticallyCenteredModal({ show, onHide, events }) {
  const dispatch = useDispatch();
  const [volunteer, setVolunteer] = useState({
    name: "",
    contact: "",
    availability: "",
    roles: "",
    skills: "",
    interests: "",
    events: "",
  });

  const eventOptions = useMemo(() => {
    return events?.map((event) => ({
      label: event?.name,
      value: event?._id,
    }));
  }, [events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, contact, availability, roles, skills, interests, events } =
      volunteer;

    const bool =
      [name, contact, availability].every((a) => Boolean(a.trim())) &&
      [roles, skills, interests, events].every((a) => a.length > 0);

    if (bool) {
      const newVolunteerDetails = { ...volunteer };
      delete newVolunteerDetails.events;
      delete newVolunteerDetails.interests;
      delete newVolunteerDetails.roles;
      delete newVolunteerDetails.skills;

      const joinData = (dataset) => dataset.map((data) => data.value);
      newVolunteerDetails.events = joinData(volunteer?.events);
      newVolunteerDetails.interests = joinData(volunteer?.interests);
      newVolunteerDetails.roles = joinData(volunteer?.roles);
      newVolunteerDetails.skills = joinData(volunteer?.skills);

      dispatch(addVolunteer(newVolunteerDetails));
      onHide();
      setVolunteer({
        name: "",
        contact: "",
        availability: "",
        roles: "",
        skills: "",
        interests: "",
        events: "",
      });
    } else {
      const conditions = {
        [!interests.length > 0]: "Please add atleast 1 interest",
        [!skills.length > 0]: "Please add atleast 1 skill",
        [!events.length > 0]: "Please add atleast 1 event",
        [!roles.length > 0]: "Please add atleast 1 volunteer role",
        [!Boolean(availability.trim())]: "Please enter volunteer availability",
        [!Boolean(contact.trim())]: "Please enter volunteer contact",
        [!Boolean(name.trim())]: "Please enter volunteer name",
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
              value={volunteer.name}
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
              value={volunteer.contact}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="availability">Availability: </label>
            <select
              name="availability"
              value={volunteer.availability}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select availability</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="roles">Volunteer Roles:</label>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={volunteerRoleOptions}
              isClearable
              onChange={(option) => {
                setVolunteer((prev) => ({
                  ...prev,
                  roles: option,
                }));
              }}
              name="roles"
              value={volunteer.roles}
              placeholder="Type Roles and press enter..."
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="skills">Skills:</label>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={[]}
              isClearable
              onChange={(option) => {
                setVolunteer((prev) => ({
                  ...prev,
                  skills: option,
                }));
              }}
              name="skills"
              value={volunteer.skills}
              placeholder="Type Skills and press enter..."
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="interests">Interests:</label>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={[]}
              isClearable
              onChange={(option) => {
                setVolunteer((prev) => ({
                  ...prev,
                  interests: option,
                }));
              }}
              name="interests"
              value={volunteer.interests}
              placeholder="Type Interests and press enter..."
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="events">Events</label>
            <Select
              isMulti
              name="events"
              closeMenuOnSelect={false}
              options={eventOptions}
              isClearable
              className="basic-multi-select"
              classNamePrefix="select"
              value={volunteer.events}
              placeholder="Select Events..."
              onChange={(option) => {
                setVolunteer((prev) => ({
                  ...prev,
                  events: option,
                }));
              }}
            />
          </div>

          <button className="btn btn-dark mt-2">Add New volunteer</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const AddVolunteer = ({ events }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setModalShow(true);
        }}
        className="custom-btn"
      >
        Add New Volunteer
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        events={events}
      />
    </>
  );
};

export default AddVolunteer;
