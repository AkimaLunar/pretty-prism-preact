export default function navigationProvider(path, data) {
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
  default:
    return {
      title: 'PrettyPrism',
      extended: true
    };
  }
}
