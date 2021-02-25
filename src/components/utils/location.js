export const getLocation = (href, redirect) => {
  let loc = href.split("#");
  if (loc.length > 1) {
    loc = loc[0] + redirect;
    return loc;
  } else {
    throw new Error();
  }
};
