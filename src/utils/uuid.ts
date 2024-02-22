const uuid = (): string => {
  return `${new Date().getTime()}`;
};

export default uuid;
