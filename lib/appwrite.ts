import {
  Account,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

import { CreateUserParams, SignInParams } from "@/type";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: process.env.APPWRITE_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASES_ID!,
  userCollectionsId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTIONS_ID!,
  categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
  customizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID!,
  menuCustomizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_ASSETS_STORAGE_BUCKET_ID!,
};

console.log("Appwrite Config:", appwriteConfig);

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

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
      appwriteConfig.userCollectionsId,
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
    throw Error(error ? error.message : "Could not create user");
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    if (!email || !password) throw Error("Email and password are required");

    const existingUser = await account.getSession("current");
    if (existingUser) {
      return existingUser;
    }
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error ? (error as string) : "Unknown error");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionsId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) {
      throw new Error("User not found in database");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
