import { secureFetch } from "./auth.api";
const REMINDER_API_ENDPOINT = "http://localhost:5000/api/reminders";

/**
 * Fetches reminders for a specific user by their user ID.
 *
 * @async
 * @function getUserReminders
 * @param {string} userId - The ID of the user whose reminders are to be fetched.
 * @returns {Promise<Object>} A promise that resolves to an object containing the reminders or an error message.
 * @property {boolean} success - Indicates whether the operation was successful.
 * @property {string} message - A message providing additional information about the result.
 * @property {Array} data- An array of reminders if the operation was successful.
 * @throws {Error} If an unexpected error occurs during the fetch operation.
 */
const getUserReminders = async (userId) => {
  if (!userId) {
    return { message: "User ID is required", success: false };
  }
  try {
    const response = await secureFetch(REMINDER_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        message: `Failed to retrieve reminders: ${response.status} - ${errorText}`,
        success: false,
      };
    }

    return await response.json();
  } catch (err) {
    const message = `Encountered an error while fetching reminders: ${err}`;
    console.error(message);
    return { message: message, success: false };
  }
};

/**
 * Adds a new reminder for a specific user.
 *
 * @async
 * @function addReminder
 * @param {string} userId - The ID of the user for whom the reminder is being added.
 * @param {Object} newReminder - The reminder object containing the details of the reminder.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the operation.
 * @property {string} message - A message indicating the result of the operation.
 * @property {boolean} success - A boolean indicating whether the operation was successful.
 * @throws {Error} If an error occurs during the fetch operation.
 */
const addReminder = async (userId, newReminder) => {
  if (!userId || !newReminder) {
    return { message: "User ID and new reminder is required!", success: false };
  }

  try {
    const response = await secureFetch(REMINDER_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, reminder: newReminder }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        message: `Failed to add a reminder: ${response.status} - ${errorText}`,
        success: false,
      };
    }

    return await response.json();
  } catch (err) {
    const message = `Encountered an error while adding a reminder: ${err}`;
    console.error(message);
    return { message: message, success: false };
  }
};

/**
 * Updates a reminder for a specific user.
 *
 * @async
 * @function updateReminder
 * @param {string} userId - The ID of the user whose reminder is being updated.
 * @param {Object} updatedReminder - The updated reminder object.
 * @returns {Promise<Object>} A promise that resolves to an object containing the success status and a message or the updated reminder data.
 * @throws {Error} If an error occurs during the fetch operation.
 */
const updateReminder = async (userId, updatedReminder) => {
  if (!userId || !updatedReminder) {
    return {
      message: "User ID and updated reminder is required!",
      success: false,
    };
  }

  try {
    const response = await secureFetch(REMINDER_API_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, reminder: updatedReminder }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        message: `Failed to update a reminder: ${response.status} - ${errorText}`,
        success: false,
      };
    }

    return await response.json();
  } catch (err) {
    const message = `Encountered an error while updating a reminder: ${err}`;
    console.error(message);
    return { message: message, success: false };
  }
};

/**
 * Deletes a reminder for a specific user.
 *
 * @async
 * @function deleteReminder
 * @param {string} userId - The ID of the user.
 * @param {string} reminderId - The ID of the reminder to be deleted.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 * - `message` {string}: A message indicating the result of the operation.
 * - `success` {boolean}: A boolean indicating whether the operation was successful.
 * @throws {Error} If an error occurs during the fetch operation.
 */
const deleteReminder = async (userId, reminderId) => {
  if (!userId || !reminderId) {
    return { message: "User ID and reminder ID is required", success: false };
  }

  try {
    const response = await secureFetch(REMINDER_API_ENDPOINT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, reminderId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        message: `Failed to delete a reminder: ${response.status} - ${errorText}`,
        success: false,
      };
    }

    return await response.json();
  } catch (err) {
    const message = `Encountered an error while deleting a reminder: ${err}`;
    console.error(message);
    return { message: message, success: false };
  }
};

export { getUserReminders, addReminder, updateReminder, deleteReminder };
