interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
}

export const getName = (fullName: string): Name => {
  const names = fullName.split(" ");
  if (names.length === 1) {
    return { firstName: names[0], middleName: "", lastName: "" };
  } else if (names.length === 2) {
    return { firstName: names[0], middleName: "", lastName: names[1] };
  } else if (names.length > 2) {
    return {
      firstName: names[0],
      middleName: names.slice(1, -1).join(" "),
      lastName: names[names.length - 1],
    };
  }

  return { firstName: "", middleName: "", lastName: "" };
};
