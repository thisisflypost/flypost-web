import { useCallback, useEffect, useState } from "react";
import {
  addFollowedOrganizer,
  getFollowedOrganizers,
  removeFollowedOrganizer,
} from "../utils/localStorage";
import { Button } from "./Button";

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
    window.location.reload();
  }, []);

  const unfollow = useCallback(() => {
    removeFollowedOrganizer(organizerId);
    window.location.reload();
  }, []);

  if (following !== undefined) {
    if (!following) {
      return <Button onClick={follow}>follow</Button>;
    }

    return <Button onClick={unfollow}>unfollow</Button>;
  }
}
