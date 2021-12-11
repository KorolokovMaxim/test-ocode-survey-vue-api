export default function authHeader(user) {
  if (user && user.token) {
    return { Authorization: `${user.type} ${user.token}` }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
