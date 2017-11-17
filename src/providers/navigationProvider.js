export default function NavigationProvider(context) {
  const path = context.router.route.location.pathname;
  let data;
  context.router.route.location.state
    ? (data = context.router.route.location.state.data)
    : '';
  switch (true) {
  case /(^\/$)|(^\/filter\/)/.test(path):
    return {
      title: 'PrettyPrism',
      extended: true
    };
  case /(^\/polish\/)/.test(path):
    return {
      title: data.name,
      extended: false
    };
  case /(^\/profile\/)/.test(path):
    return {
      title: data.username,
      extended: false
    };
  case /(^\/messages\/)/.test(path):
    return {
      title: 'Messages',
      extended: false
    };
  case /(^\/login\/)/.test(path):
    return {
      title: 'Join the Squad!',
      extended: false
    };
  default:
    return {
      title: 'PrettyPrism',
      extended: true
    };
  }
}
