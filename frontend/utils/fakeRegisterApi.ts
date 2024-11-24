export const fakeRegisterApi = async ({
  phoneNumber,
  username,
}: {
  phoneNumber: string;
  username: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Usuario registrado:", { phoneNumber, username });
      resolve(true);
    }, 1000);
  });
};
