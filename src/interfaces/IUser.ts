export default interface IUser {
  password: string;
  email: string;
  subscription: "starter" | "pro" | "business";
  token: string | null;
  avatarURL?: string;
  verify: boolean;
  verificationToken: string;
}
