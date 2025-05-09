import { secureFetch } from "./auth.api";

const USER_API_ENDPOINT = "http://localhost:5000/api/users";

/**
 * Retrieves user data from the server based on the provided user ID.
 *
 * @async
 * @function getUserData
 * @param {string} userId - The ID of the user to retrieve data for.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user data or an error message.
 * @property {string} message - A message indicating the result of the operation.
 * @property {boolean} success - A boolean indicating whether the operation was successful.
 * @throws {Error} If there is a network or server error during the fetch operation.
 */

const getUserData = async (userId) => {
  if (!userId) {
    return { message: "User ID is required!", success: false };
  }
  try {
    const response = await secureFetch(USER_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        message: `Failed to retrieve user: ${response.status} - ${errorText}`,
        success: false,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error retrieving user:", error.message);
    return {
      message: "Server error while retrieving user",
      success: false,
    };
  }
};

/**
 * Updates a user's information by sending a PUT request to the user API endpoint.
 *
 * @async
 * @function updateUser
 * @param {string} userId - The ID of the user to be updated.
 * @param {Object} newUserData - An object containing the new data for the user.
 * @returns {Promise<Object>} A promise that resolves to an object containing the response data.
 *                            If the update is successful, the object will contain the updated user data.
 *                            If the update fails, the object will contain an error message and a success flag.
 * @throws {Error} Throws an error if the fetch request fails unexpectedly.
 */
const updateUser = async (userId, newUserData) => {
  if (!userId || !newUserData) {
    return {
      message: "User ID and new user data is required!",
      success: false,
    };
  }

  try {
    const response = await secureFetch(USER_API_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, newUserData: newUserData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        message: `Failed to update user: ${response.status} - ${errorText}`,
        success: false,
      };
    }

    return await response.json();
  } catch (err) {
    console.error("Encountered an error while updating user:", err.message);
  }
};

/**
 * Deletes a user by their ID.
 *
 * @async
 * @function deleteUser
 * @param {string} userId - The ID of the user to be deleted.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   - `message` {string}: A message indicating the result of the operation.
 *   - `success` {boolean}: A boolean indicating whether the operation was successful.
 * @throws {Error} If an unexpected error occurs during the fetch operation.
 */

const deleteUser = async (userId) => {
  if (!userId) {
    return { message: "User ID is required!", success: false };
  }
  try {
    const response = await secureFetch(USER_API_ENDPOINT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        message: `Failed to delete user: ${response.status} - ${errorText}`,
        success: false,
      };
    }

    return await response.json();
  } catch (err) {
    const message = `Encountered an error while deleting user: ${err.message}`;
    console.error(message);
    return { message: message, success: false };
  }
};

export { getUserData, updateUser, deleteUser };
