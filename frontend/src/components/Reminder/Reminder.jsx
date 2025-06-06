import React, { useState } from "react";

// Components
import TopSection from "./Top Section/index";
import MiddleSection from "./Middle Section/Index";
import BottomSection from "./Bottom Section/index";
import ReminderContainer from "./ReminderContainer.jsx";
import ReminderOption from "./ReminderOption/Index.jsx";

// Context
import ReminderContext from "./ReminderContext.jsx";
import useReminder from "../../store/useReminder.js";
function Reminder({ ...props }) {
  const reminder = { ...props };
  const [showOptions, setShowOptions] = useState(false);
  const { isLoggedIn } = useReminder();

  // Toggles the option display, whether on or off.
  const toggleShowOption = () => {
    setShowOptions((prev) => !prev);
  };

  let contextValue = {
    ...reminder,
    toggleShowOption,
  };

  if (isLoggedIn) {
    contextValue = {
      ...reminder,
      id: reminder._id,
      toggleShowOption,
    };
  }

  return (
    <ReminderContext.Provider value={contextValue}>
      <ReminderContainer reminder={reminder}>
        <ReminderOption
          showOptions={showOptions}
          toggleShowOption={toggleShowOption}
        />
        <TopSection />
        <MiddleSection />
        <BottomSection />
      </ReminderContainer>
    </ReminderContext.Provider>
  );
}

export default Reminder;
