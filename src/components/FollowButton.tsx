import { useCallback, useEffect, useState } from "react";
import {
  addFollowedOrganizer,
  getFollowedOrganizers,
  removeFollowedOrganizer,
} from "../utils/localStorage";

export function FollowButton({ organizerId }: { organizerId: number }) {
  const [following, setFollowing] = useState<boolean>();

  useEffect(() => {
    const followedOrganizers = getFollowedOrganizers();
    if (followedOrganizers.includes(organizerId)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, []);

  const follow = useCallback(() => {
    addFollowedOrganizer(organizerId);
    setFollowing(true);
  }, []);

  const unfollow = useCallback(() => {
    removeFollowedOrganizer(organizerId);
    setFollowing(false);
  }, []);

  if (following !== undefined) {
    if (!following) {
      return <button onClick={follow}>follow</button>;
    }

    return <button onClick={unfollow}>unfollow</button>;
  }
}
