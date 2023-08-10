import { useEffect, useState } from "react";

export function FollowButton({ userId }: { userId: number }) {
  const [following, setFollowing] = useState<boolean>();

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

  if (following !== undefined) {
    if (!following) {
      return <button>follow</button>;
    }

    return <button>unfollow</button>;
  }
}
