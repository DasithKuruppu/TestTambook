export default {
  SchoolSchema: {
    title: "School",
    type: "object",
    required: ["name", "schoolType"],
    properties: {
      id: {
        type: "string"
      },
      name: {
        type: "string"
      },
      schoolType: {
        type: "string"
      }
    }
  }
};
