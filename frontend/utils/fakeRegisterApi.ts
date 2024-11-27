export const fakeRegisterApi = async ({
  phoneNumber,
  username,
  userLastName,
}: {
  phoneNumber: string;
  username: string;
  userLastName: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Usuario registrado:", {
        phoneNumber,
        username,
        userLastName,
      });
      resolve(true);
    }, 1000);
  });
};
