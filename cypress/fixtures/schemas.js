export default {
  SchoolSchema: {
    title: "fruit",
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
