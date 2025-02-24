import { useState, useMemo, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import CreatableSelect from "react-select/creatable";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import { useForm, Controller } from "react-hook-form";

import { updateVolunteer } from "../../Features/volunteerSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppDispatch } from "../../Store/store";
import { Event } from "../../types/eventTypes";

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

interface Volunteer {
  _id?: string;
  name: string;
  contact: string;
  availability: string;
  roles: MultiValue<SelectBoxType>;
  skills: MultiValue<SelectBoxType>;
  interests: MultiValue<SelectBoxType>;
  events?: MultiValue<SelectBoxType>;
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
  oldVolunteer,
}: {
  show: boolean;
  onHide: () => void;
  oldVolunteer: Volunteer;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useAppSelector((state) => state?.events);

  const createOptions = (data: SelectBoxType[]): SelectBoxType[] =>
    data.map((item) => ({
      label: item.label, // Ensure label is a string
      value: item.value, // Ensure value is a string
    }));

  // setting default events
  useEffect(() => {
    const defaultEvents: SelectBoxType[] =
      oldVolunteer?.events && oldVolunteer?.events.length > 0
        ? oldVolunteer.events.map((oldEvent) => {
            const eventAssigned = events?.find(
              (event: Event) => event._id === oldEvent.value
            );
            return {
              label: eventAssigned?.name ?? "", // Ensure label is always a string
              value: eventAssigned?._id ?? "", // Ensure value is always a string
            };
          })
        : [{ label: "", value: "" }];

    setValue("events", defaultEvents.length > 0 ? defaultEvents : []);
  }, [events, oldVolunteer?.events]);

  // creating events options using all events data
  const eventOptions = useMemo(() => {
    return events?.map((event) => ({
      label: event?.name,
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
      name: oldVolunteer?.name,
      contact: (oldVolunteer?.contact).toString(),
      availability: oldVolunteer?.availability,
      roles: createOptions([...(oldVolunteer?.roles ?? [])]),
      skills: createOptions([...(oldVolunteer?.skills ?? [])]),
      interests: createOptions([...(oldVolunteer?.interests ?? [])]),
      events: [],
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

    dispatch(
      updateVolunteer({
        id: oldVolunteer._id ? oldVolunteer._id : "",
        newVolunteer: newVolunteerDetails as VolunteerData,
      })
    );
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
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
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
            Edit Volunteer
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditVolunteer = ({ volunteer }: { volunteer: Volunteer }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setModalShow(true);
          console.log("volunteer: ", volunteer);
        }}
        className="custom-btn"
      >
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        oldVolunteer={volunteer}
      />
    </>
  );
};

export default EditVolunteer;
