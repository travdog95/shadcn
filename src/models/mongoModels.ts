import { Schema, model } from "mongoose";

const memberSchema = new Schema(
  {
    schemaVersion: { type: Number },
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    suffix: { type: String, default: "" },
    birthDate: { type: Date, default: null },
    gender: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    callings: { type: Array, default: [] },
    moveInDate: { type: Date, default: null },
    preferredName: { type: String, required: true },
    prefferedNameURL: { type: String, default: "" },
    memberId: { type: Number, default: 0 },
    priesthoodOffice: { type: String, default: "" },
    templeRecommendExpirationDate: { type: Date, default: null },
    templeRecommendStatus: { type: String, default: "" },
    templeRecommendType: { type: String, default: "" },
    isWillingToSpeak: { type: Boolean, default: true },
    isWillingToPray: { type: Boolean, default: true },
    isWillingToAcceptCalling: { type: Boolean, default: true },
    contactForTithing: { type: Boolean, default: true },
    marriageDate: { type: Date, default: null },
    address1: { type: String, default: "" },
    address2: { type: String, default: "" },
    isServingMission: { type: Boolean, default: false },
    hasMovedOut: { type: Boolean, default: false },
    isBishopricMember: { type: Boolean, default: false },
    note: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Member = model("Member", memberSchema);
