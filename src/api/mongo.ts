import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

const BASE_URL = "http://localhost:5000/api";

// Get callings from MongoDB
export const mdGetCallings = () =>
  queryOptions({
    queryKey: ["md-callings"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/callings`);
      return response.data;
    },
  });

// Get members from MongoDB
export const mdGetMembers = () =>
  queryOptions({
    queryKey: ["md-members"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/members`);
      return response.data.data;
    },
  });

// Get sacrament meetings from MongoDB
export const mdGetSacramentMeetings = () =>
  queryOptions({
    queryKey: ["md-sacrament-meetings"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/sacramentmeetings`);
      return response.data.data;
    },
  });

// Get users from MongoDB
export const mdGetUsers = () =>
  queryOptions({
    queryKey: ["md-users"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data.data;
    },
  });

// Get files from MongoDB
export const mdGetFiles = () =>
  queryOptions({
    queryKey: ["md-files"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/fileinfo`);
      return response.data.data;
    },
  });
