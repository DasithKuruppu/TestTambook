export default {
    SchoolSchema:  {
        type: 'object',
        required: ['name', 'schoolType'],
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          schoolType: {
            type: 'string',
          },
        },
    }
}