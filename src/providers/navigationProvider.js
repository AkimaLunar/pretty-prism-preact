class NavigationProvider {
  static getPath(location, polish) {
    const path = location.pathname;
    switch (true) {
    case /(^\/$)|(^\/filter\/)/.test(path):
      return {
        title: 'PrettyPrism',
        extended: true
      };
    case /(^\/polish\/)/.test(path):
      //console.log(JSON.stringify(polish));
      return {
        title: 'Polish',
        extended: false
      };
    case /(^\/new-polish)(\/)?$/.test(path):
      return {
        title: 'New polish',
        extended: false
      };
    case /(^\/profile\/)/.test(path):
      return {
        title: path.replace(/(^\/profile\/)/, ''),
        extended: false
      };
    case /(^\/messages)(\/)?$/.test(path):
      return {
        title: 'Messages',
        extended: false
      };
    case /(^\/login)(\/)?$/.test(path):
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
}

export default NavigationProvider;
