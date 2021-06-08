export interface User {
  id: string;
  username: string;
  email: string;
  isadmin: boolean;
}

export let UserModel: User = {
  id: null,
  username: null,
  email: null,
  isadmin: false,
};
