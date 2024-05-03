function validateParsedFollowedOrganizer(input: any[]): input is number[] {
  return input.every(
    (followedOrganizer) => typeof followedOrganizer === "number"
  );
}

export function getFollowedOrganizers() {
  const serializedFollowedOrganizers =
    localStorage.getItem("followedOrganizers");
  if (serializedFollowedOrganizers) {
    try {
      const parsedFollowedOrganizers = JSON.parse(serializedFollowedOrganizers);
      if (
        Array.isArray(parsedFollowedOrganizers) &&
        validateParsedFollowedOrganizer(parsedFollowedOrganizers)
      ) {
        return parsedFollowedOrganizers;
      } else {
        throw new Error("Invalid format of serialized followed organizers");
      }
    } catch (e) {
      console.error("Unable to retrieve followed organizers.", e);
      return [];
    }
  } else {
    return [];
  }
}

export function addFollowedOrganizer(organizerId: number) {
  const followedOrganizers = getFollowedOrganizers();
  if (!followedOrganizers.includes(organizerId)) {
    const updatedSerializedFollowedOrganizers = JSON.stringify([
      ...followedOrganizers,
      organizerId,
    ]);
    localStorage.setItem(
      "followedOrganizers",
      updatedSerializedFollowedOrganizers
    );
  }
}

export function removeFollowedOrganizer(organizerId: number) {
  const followedOrganizers = getFollowedOrganizers();
  const updatedFollowedOrganizers = followedOrganizers.filter(
    (id) => id !== organizerId
  );
  const updatedSerializedFollowedOrganizers = JSON.stringify(
    updatedFollowedOrganizers
  );
  localStorage.setItem(
    "followedOrganizers",
    updatedSerializedFollowedOrganizers
  );
}
