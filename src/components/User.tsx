import {
  FormEvent,
  SyntheticEvent,
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
      fetch(`http://localhost:1337/api/users/me?populate=*`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          setEmail(user.email);
          setFollowingCount(user.following.length);
        });
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await fetch(`http://localhost:1337/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.get("email"),
          password: formData.get("password"),
        }),
      }).then((response) => response.json());

      if (response.jwt && response.user) {
        localStorage.setItem("accessToken", response.jwt);
      }
    },
    []
  );

  return (
    <div>
      {email ? (
        <>
          <span>{email}</span>{" "}
          {followingCount && followingCount > 0 ? (
            <span>Following ({followingCount})</span>
          ) : null}
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
