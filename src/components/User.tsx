import { useEffect, useState } from "react";

import { getFollowedOrganizers } from "../utils/localStorage";

export function User() {
  const [followedOrganizers, setFollowedOrganizers] = useState<number[]>([]);

  useEffect(() => {
    const storedFollowedOrganizers = getFollowedOrganizers();
    setFollowedOrganizers(storedFollowedOrganizers);
  }, []);

  return (
    <div>
      {followedOrganizers.length > 0 ? (
        <span>
          <a href="/events/following">
            Following ({followedOrganizers.length})
          </a>
        </span>
      ) : null}
    </div>
  );
}
