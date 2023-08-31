import axios from "axios";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

export function User() {
  const [email, setEmail] = useState<string>();
  const [followingCount, setFollowingCount] = useState<number>();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`${import.meta.env.PUBLIC_API_PREFIX}users/me?populate=*`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => response.data)
        .then((user) => {
          setEmail(user.email);
          setFollowingCount(user.following.length);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("accessToken");
          } else {
            console.error(error);
          }
        });
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const {
        data: { jwt, user },
      } = await axios.post(`${import.meta.env.PUBLIC_API_PREFIX}auth/local`, {
        identifier: formData.get("email"),
        password: formData.get("password"),
      });

      if (jwt && user) {
        localStorage.setItem("accessToken", jwt);
      }

      window.location.reload()
    },
    []
  );

  const handleSignout = useCallback(() => {
    localStorage.removeItem("accessToken");
    window.location.reload()
  }, [])

  return (
    <div>
      {email ? (
        <>
          <span>{email}</span>{" "}
          {followingCount && followingCount > 0 ? (
            <span>
              <a href="/events/following">Following ({followingCount})</a>
            </span>
          ) : null}{' '}
          <button onClick={handleSignout}>Sign out</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          Email: <input name="email" type="email" />
          Password: <input name="password" type="password" />
          <input type="submit" value="Sign in" />
        </form>
      )}
    </div>
  );
}
