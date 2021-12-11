export default function authHeader(user) {
  if (user && user.token) {
    return { Authorization: `${user.type} ${user.token}` };
  } else {
    return {};
  }
}
