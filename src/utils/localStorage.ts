function validateParsedFollowedPublisher(input: any[]): input is number[] {
  return input.every(
    (followedPublisher) => typeof followedPublisher === "number"
  );
}

export function getFollowedPublishers() {
  const serializedFollowedPublishers =
    localStorage.getItem("followedPublishers");
  if (serializedFollowedPublishers) {
    try {
      const parsedFollowedPublishers = JSON.parse(serializedFollowedPublishers);
      if (
        Array.isArray(parsedFollowedPublishers) &&
        validateParsedFollowedPublisher(parsedFollowedPublishers)
      ) {
        return parsedFollowedPublishers;
      } else {
        throw new Error("Invalid format of serialized followed publishers");
      }
    } catch (e) {
      console.error("Unable to retrieve followed publishers.", e);
      return [];
    }
  } else {
    return [];
  }
}

export function addFollowedPublisher(publisherId: number) {
  const followedPublishers = getFollowedPublishers();
  if (!followedPublishers.includes(publisherId)) {
    const updatedSerializedFollowedPublishers = JSON.stringify([
      ...followedPublishers,
      publisherId,
    ]);
    localStorage.setItem(
      "followedPublishers",
      updatedSerializedFollowedPublishers
    );
  }
}

export function removeFollowedPublisher(publisherId: number) {
  const followedPublishers = getFollowedPublishers();
  const updatedFollowedPublishers = followedPublishers.filter(
    (id) => id !== publisherId
  );
  const updatedSerializedFollowedPublishers = JSON.stringify(
    updatedFollowedPublishers
  );
  localStorage.setItem(
    "followedPublishers",
    updatedSerializedFollowedPublishers
  );
}
