import { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

import { addVolunteer } from "../../Features/volunteerSlice";
import { Event } from "../../types/eventTypes";
import { AppDispatch } from "../../Store/store";

const volunteerRoleOptions = [
  { label: "Photographer", value: "Photographer" },
  { label: "Security", value: "Security" },
  { label: "Crowd Handling", value: "Crowd Handling" },
  { label: "Child Taker", value: "Child Taker" },
];

type SelectBoxType = {
  label: string;
  value: string;
};

import { MultiValue } from "react-select";

interface Volunteer {
  name: string;
  contact: string;
  availability: string;
  roles: MultiValue<SelectBoxType>;
  skills: MultiValue<SelectBoxType>;
  interests: MultiValue<SelectBoxType>;
  events?: MultiValue<SelectBoxType>;
  actions?: React.ReactNode;
}

function MyVerticallyCenteredModal({
  show,
  onHide,
  events,
}: {
  show: boolean;
  onHide: () => void;
  events: Event[];
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [volunteer, setVolunteer] = useState<Volunteer>({
    name: "",
    contact: "",
    availability: "",
    roles: [],
    skills: [],
    interests: [],
    events: [],
  });

  const eventOptions = useMemo(() => {
    return events?.map((event: Event) => ({
      label: event.name,
      value: event?._id,
    }));
  }, [events]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVolunteer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, contact, availability, roles, skills, interests, events } =
      volunteer;

    console.log("volunteer: ", volunteer);

    const bool =
      [name, contact, availability].every((a) => Boolean(a.trim())) &&
      [roles, skills, interests, events].every((a) => a && a.length > 0);

    if (bool) {
      const joinData = (dataset: SelectBoxType[]) =>
        dataset.map((data: SelectBoxType) => data.value);

      const newVolunteerDetails = {
        ...volunteer,
        events: joinData([...(volunteer.events ?? [])]),
        interests: joinData([...(volunteer.interests ?? [])]),
        roles: joinData([...(volunteer.roles ?? [])]),
        skills: joinData([...(volunteer.skills ?? [])]),
      };

      console.log("newVolunteerDetails: ", newVolunteerDetails);

      dispatch(addVolunteer(newVolunteerDetails));
      onHide();
      setVolunteer({
        name: "",
        contact: "",
        availability: "",
        roles: [],
        skills: [],
        interests: [],
        events: [],
      });
    } else {
      const validateVolunteer = () => {
        if (!name.trim()) {
          return "Please enter volunteer name";
        }
        if (!contact.trim()) {
          return "Please enter volunteer contact";
        }
        if (!availability) {
          return "Please enter volunteer availability";
        }
        if (roles.length <= 0) {
          return "Please add atleast 1 volunteer role";
        }
        if (!events || events.length <= 0) {
          return "Please add atleast 1 event";
        }
        if (skills.length <= 0) {
          return "Please add atleast 1 skill";
        }
        if (interests.length <= 0) {
          return "Please add atleast 1 interest";
        }
        return null;
      };

      const validationError = validateVolunteer();
      if (validationError) {
        toast.error(validationError);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
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

const AddVolunteer = ({ events }: { events: Event[] }) => {
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
