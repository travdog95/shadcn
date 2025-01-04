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

// Get memberCallings from MongoDB
export const mdGetMemberCallings = () =>
  queryOptions({
    queryKey: ["md-membercallings"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/membercallings`);
      return response.data;
    },
  });

//Get assignments from MongoDB
export const mdGetAssignments = () =>
  queryOptions({
    queryKey: ["md-assignments"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/assignments`);
      return response.data;
    },
  });

// Get calling workshop items from MongoDB
export const mdGetCallingWorkshopItems = () =>
  queryOptions({
    queryKey: ["md-callingworkshopitems"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/callingworkshopitems`);
      return response.data;
    },
  });

// Get prayers from MongoDB
export const mdGetPrayers = () =>
  queryOptions({
    queryKey: ["md-prayers"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/prayers`);
      return response.data;
    },
  });

// Get talks from MongoDB
export const mdGetTalks = () =>
  queryOptions({
    queryKey: ["md-talks"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/talks`);
      return response.data;
    },
  });
