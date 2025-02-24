import { useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
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
  roles: MultiValue<SelectBoxType> | string[];
  skills: MultiValue<SelectBoxType> | string[];
  interests: MultiValue<SelectBoxType> | string[];
  events?: MultiValue<SelectBoxType> | Event[] | string[];
  actions?: React.ReactNode;
}

interface VolunteerData {
  name: string;
  contact: string;
  availability: string;
  roles: string[];
  skills: string[];
  interests: string[];
  events?: Event[] | string[];
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

  const eventOptions = useMemo(() => {
    return events?.map((event: Event) => ({
      label: event.name,
      value: event?._id,
    }));
  }, [events]);

  // for react hook form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Volunteer>({
    defaultValues: {
      // roles: [{ role: "", volunteersRequired: "" }],
    },
  });

  const onSubmit = (data: Volunteer) => {
    const joinData = (dataset: unknown[]): string[] => {
      if (!Array.isArray(dataset)) return []; // Ensure it's an array

      return dataset
        .filter(
          (data): data is SelectBoxType =>
            typeof data === "object" && data !== null && "value" in data
        )
        .map((data) => (data as SelectBoxType).value);
    };

    const newVolunteerDetails = {
      ...data,
      events: joinData(Array.isArray(data.events) ? data.events : []),
      interests: joinData(Array.isArray(data.interests) ? data.interests : []),
      roles: joinData(Array.isArray(data.roles) ? data.roles : []),
      skills: joinData(Array.isArray(data.skills) ? data.skills : []),
    };

    dispatch(addVolunteer(newVolunteerDetails as VolunteerData));
    onHide();
    reset();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex w-100 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <div className="d-flex flex-column w-100">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-danger text-[14px] m-0">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="contact">Contact: </label>
            <input
              id="contact"
              type="text"
              maxLength={10}
              {...register("contact", {
                required: "Contact is required",

                validate: {
                  startsWithValidNumber: (value) =>
                    /^[6789]/.test(value) ||
                    "Contact must start with 6, 7, 8, or 9",
                  isTenDigits: (value) =>
                    value.length === 10 || "Contact must be exactly 10 digits",
                },
              })}
            />
            {errors.contact && (
              <p className="text-danger text-[14px] m-0">
                {errors.contact.message}
              </p>
            )}
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="availability">Availability: </label>
            <select
              id="availability"
              {...register("availability", {
                required: "Availability is required",
              })}
            >
              <option value="">Select availability</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.availability && (
              <p className="text-danger text-[14px] m-0">
                {errors.availability.message}
              </p>
            )}
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="roles">Volunteer Roles:</label>
            <Controller
              name="roles"
              control={control}
              rules={{
                validate: (value) =>
                  value && value.length > 0
                    ? true
                    : "At least one role is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <CreatableSelect
                    {...field}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={volunteerRoleOptions}
                    isClearable
                    placeholder="Type Roles and press enter..."
                  />
                  {error && (
                    <p className="text-danger text-[14px] m-0">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="skills">Skills:</label>
            <Controller
              name="skills"
              control={control}
              rules={{
                validate: (value) =>
                  value && value.length > 0
                    ? true
                    : "At least one skill is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <CreatableSelect
                    {...field}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={[]}
                    isClearable
                    placeholder="Type Skills and press enter..."
                  />
                  {error && (
                    <p className="text-danger text-[14px] m-0">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="interests">Interests:</label>
            <Controller
              name="interests"
              control={control}
              rules={{
                validate: (value) =>
                  value && value.length > 0
                    ? true
                    : "At least one interest is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <CreatableSelect
                    {...field}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={[]}
                    isClearable
                    placeholder="Type Interests and press enter..."
                  />
                  {error && (
                    <p className="text-danger text-[14px] m-0">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="events">Events</label>
            <Controller
              name="events"
              control={control}
              rules={{
                validate: (value) =>
                  value && value.length > 0
                    ? true
                    : "At least one event is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    {...field}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={eventOptions}
                    isClearable
                    placeholder="Select Events..."
                  />
                  {error && (
                    <p className="text-danger text-[14px] m-0">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <button type="submit" className="btn btn-dark mt-2">
            Add New volunteer
          </button>
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
