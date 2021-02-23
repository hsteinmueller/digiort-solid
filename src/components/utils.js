export const getLocation = (href, redirect) => {
  let loc = href.split("#");
  if (loc.length > 1) {
    loc = loc[0] + redirect;
    return loc;
  } else {
    throw new Error();
  }
};

export const getProviders = () => {
  return [
    {
      id: "inrupt",
      label: "Inrupt",
      image: "/img/inrupt.svg",
      value: "https://inrupt.net/auth",
      registerLink: "https://inrupt.net/register",
      description: "Lorem ipsum dolor sit amet non ipsom dolor",
    },
    {
      id: "solid-community",
      label: "Solid Community",
      image: "/img/Solid.png",
      value: "https://solidcommunity.net",
      registerLink: "https://solidcommunity.net/register",
      description: "Lorem ipsum dolor sit non consectetur",
    },
  ];
};
