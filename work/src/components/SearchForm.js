// SearchForm.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./SearchForm.css";

const SearchForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [eventType, setEventType] = useState("");
  const [eventClick, setEventClick] = useState(false);
  const [locationType, setLocationType] = useState("");
  const [locationClick, setLocationClick] = useState(false);

  return (
    <div className="search-form">
      <label htmlFor="activity">Event</label>
      <input
        type="text"
        id="activity"
        placeholder="Enter your event"
        value={eventType}
        onClick={() => {
          setEventClick((prev) => !prev);
          setLocationClick(false);
        }}
        onChange={(e) => setEventType(e.target.value)}
        autoComplete="off"
      />
      {eventClick && (
        <div className="event-form">
          {[
            "Wedding",
            "Parties",
            "Open Mic",
            "Conference",
            "Club House",
            "Reception",
            "Community Hall",
          ].map((item, index) => (
            <p
              key={index}
              className="event-item"
              onClick={() => {
                setEventType(item);
                setEventClick((prev) => !prev);
              }}
            >
              {item}
            </p>
          ))}
        </div>
      )}

      <label htmlFor="where">Where</label>
      <input
        type="email"
        id="where"
        placeholder="Enter your location"
        value={locationType}
        onClick={() => {
          setLocationClick((prev) => !prev);
          setEventClick(false);
        }}
        onChange={(e) => setLocationType(e.target.value)}
        autoComplete="off"
      />
      {locationClick && (
        <div className="location-form">
          {["Bangalore", "Delhi", "Jalandhar", "Mumbai", "Pune"].map(
            (item, index) => (
              <p
                key={index}
                className="event-item"
                onClick={() => {
                  setLocationType(item);
                  setLocationClick((prev) => !prev);
                }}
              >
                {item}
              </p>
            )
          )}
        </div>
      )}

      <label htmlFor="when">When?</label>
      <DatePicker
        showIcon
        id="when"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Select a date"
        dateFormat="dd/MM/yyyy"
        calendarClassName="calendar-side"
      />

      <button id="submit-button" type="button">
        Search
      </button>
    </div>
  );
};

export default SearchForm;
