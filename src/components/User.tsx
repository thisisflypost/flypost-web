import { useEffect, useState } from "react";

import { getFollowedOrganizers } from "../utils/localStorage";

export function User() {
  const [followedOrganizers, setFollowedOrganizers] = useState<number[]>([]);

  useEffect(() => {
    const storedFollowedOrganizers = getFollowedOrganizers();
    setFollowedOrganizers(storedFollowedOrganizers);
  }, []);

  return (
    <div className="text-right">
      {followedOrganizers.length > 0 ? (
        <span className="text-white">
          <a className="underline font-bold" href="/events/following">
            Following ({followedOrganizers.length})
          </a>
        </span>
      ) : null}
    </div>
  );
}
