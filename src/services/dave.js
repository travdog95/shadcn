function badgeStripe(attendee) {
  var badgeType = attendee.badgeType;
  if (
    hasAttributeValueCode(attendee, "1500413554105008LC95") &&
    [
      "GEM_EXP",
      "GEM",
      "DAYONE",
      "DAYTWO",
      "GCONFASSOC_EXP",
      "GCONFASSOC_PT",
      "GCONFASSOC",
      "GSPK_EXP",
      "GSPK_PT",
      "GSPK",
      "GASSOC_RB_PT",
      "GASSOC_RB",
      "GASSOC_EXP",
      "GASSOC_PT",
      "GASSOC",
    ].includes(badgeType)
  ) {
    return "badgestripe.gartner";
  }
}

function attendeeIndustry(attendee) {
  if (hasAttributeValueCode(attendee, "1500413554105008LC95")) {
    return "";
  }
  if (hasAttributeValueCode(attendee, ["Tag_7446_24", "Tag_6661_24"]))
    return "industry.Aerospace_and_Defense";
  else if (hasAttributeValueCode(attendee, ["Tag_6658_24"]))
    return "industry.Automotive";
}
