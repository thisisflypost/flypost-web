import { useCallback, useEffect, useState } from "react";
import {
  addFollowedPublisher,
  getFollowedPublishers,
  removeFollowedPublisher,
} from "../utils/localStorage";

export function FollowButton({ publisherId }: { publisherId: number }) {
  const [following, setFollowing] = useState<boolean>();

  useEffect(() => {
    const followedPublishers = getFollowedPublishers();
    if (followedPublishers.includes(publisherId)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, []);

  const follow = useCallback(() => {
    addFollowedPublisher(publisherId);
    setFollowing(true);
  }, []);

  const unfollow = useCallback(() => {
    removeFollowedPublisher(publisherId);
    setFollowing(false);
  }, []);

  if (following !== undefined) {
    if (!following) {
      return <button onClick={follow}>follow</button>;
    }

    return <button onClick={unfollow}>unfollow</button>;
  }
}
