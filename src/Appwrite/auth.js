/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client(); // Appwrite client
  account;

  constructor() {
    // Initialize the Appwrite client and account services
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // Automatically log in after account creation
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      // Re-throw the error for higher-level handling
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const userSession = await this.account.createEmailPasswordSession(email, password);
      return userSession;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      return currentUser;
    } catch (error) {
      // Handle "no user logged in" scenarios gracefully
      if (error.code === 401) {
        return null; // Return null instead of throwing for easier handling
      }
      throw error;
    }
  }

  async logout() {
    try {
      const currentUser = await this.getCurrentUser();
      if (currentUser) {
        await this.account.deleteSessions();
      } else {
        throw new Error("User is not authenticated.");
      }
    } catch (error) {
      if (error.code === 401) {
        // Redirect to login or show an appropriate error message
        console.error("Unauthorized action: User needs to be authenticated.");
        return null; // or return a message to user
      }
      throw error;
    }
  }
}

const service = new AuthService();
export default service;
