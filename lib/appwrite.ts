import {
  Account,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

import { CreateUserParams, SignInParams } from "@/type";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "",
  platform: process.env.APPWRITE_PLATFORM ?? "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  databaseId: process.env.APPWRITE_DATABASE_ID ?? "",
  userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID ?? "",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = `${appwriteConfig.endpoint}/avatars/initials?name=${encodeURIComponent(name)}`;

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw Error(error ? error.message : 'Could not create user');
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    if (!email || !password) throw Error("Email and password are required");

    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    if (!user) throw Error("Failed to sign in");
    return user;
  } catch (error) {
    throw new Error(error ? error as string : "Unknown error");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw Error;
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
