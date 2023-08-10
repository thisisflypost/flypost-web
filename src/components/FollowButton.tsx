import { useCallback, useEffect, useState } from "react";

export function FollowButton({ userId }: { userId: number }) {
  const [following, setFollowing] = useState<boolean>();
  const [currentUserId, setCurrentUserId] = useState<number>();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const currentUserId = await fetch(
          `http://localhost:1337/api/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
          .then((response) => response.json())
          .then((user) => user.id);

        setCurrentUserId(currentUserId);

        await fetch(`http://localhost:1337/api/users/${userId}?populate=*`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
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
      fetch(`http://localhost:1337/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          followers: {
            connect: [currentUserId],
          },
        }),
      }).then(() => setFollowing(true));
    }
  }, [currentUserId]);

  const unfollow = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetch(`http://localhost:1337/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          followers: {
            disconnect: [currentUserId],
          },
        }),
      }).then(() => setFollowing(false));
    }
  }, [currentUserId]);

  if (currentUserId && following !== undefined) {
    if (!following) {
      return <button onClick={follow}>follow</button>;
    }

    return <button onClick={unfollow}>unfollow</button>;
  }
}
