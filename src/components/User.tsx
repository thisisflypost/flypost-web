import { useEffect, useState } from "react";

import { getFollowedPublishers } from "../utils/localStorage";

export function User() {
  const [followedPublishers, setFollowedPublishers] = useState<number[]>([]);

  useEffect(() => {
    const storedFollowedPublishers = getFollowedPublishers();
    setFollowedPublishers(storedFollowedPublishers);
  }, []);

  return (
    <div>
      {followedPublishers.length > 0 ? (
        <span>
          <a href="/events/following">
            Following ({followedPublishers.length})
          </a>
        </span>
      ) : null}
    </div>
  );
}
