import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function FollowButton({ userId }: { userId: number }) {
  const [following, setFollowing] = useState<boolean>();
  const [currentUserId, setCurrentUserId] = useState<number>();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const currentUserId = await axios
          .get(`http://localhost:1337/api/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => response.data)
          .then((user) => user.id);

        setCurrentUserId(currentUserId);

        await axios
          .get(`http://localhost:1337/api/users/${userId}?populate=*`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => response.data)
          .then((user) => {
            if (
              user.followers.find(
                (follower: { id: any }) => follower.id === currentUserId
              )
            ) {
              setFollowing(true);
            } else {
              setFollowing(false);
            }
          });
      }
    })();
  }, []);

  const follow = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .put(
          `http://localhost:1337/api/users/${userId}`,
          {
            followers: {
              connect: [currentUserId],
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => setFollowing(true));
    }
  }, [currentUserId]);

  const unfollow = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .put(
          `http://localhost:1337/api/users/${userId}`,
          {
            followers: {
              disconnect: [currentUserId],
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => setFollowing(false));
    }
  }, [currentUserId]);

  if (currentUserId && following !== undefined) {
    if (!following) {
      return <button onClick={follow}>follow</button>;
    }

    return <button onClick={unfollow}>unfollow</button>;
  }
}
