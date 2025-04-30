import React, { useState } from "react";

// Components
import TopSection from "./Top Section";
import MiddleSection from "./Middle Section/";
import BottomSection from "./Bottom Section";
import ReminderContainer from "./ReminderContainer";
import ReminderOption from "./ReminderOption";

// Context
import ReminderContext from "./ReminderContext";

function Reminder({ ...props }) {
  const reminder = { ...props };
  const [showOptions, setShowOptions] = useState(false);

  // Toggles the option display, whether on or off.
  const toggleShowOption = () => {
    setShowOptions((prev) => !prev);
  };

  const contextValue = {
    ...reminder,
    toggleShowOption,
  };

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
